import { createClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to your environment.' },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { invoice_id } = await request.json();

  if (!invoice_id) {
    return NextResponse.json({ error: 'invoice_id required' }, { status: 400 });
  }

  // Fetch invoice and verify ownership
  const { data: invoice } = await supabase
    .from('invoices')
    .select('id, project_id, amount_cents, currency, description, status')
    .eq('id', invoice_id)
    .single();

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  if (invoice.status !== 'draft') {
    return NextResponse.json({ error: 'Only draft invoices can be sent' }, { status: 400 });
  }

  // Verify dev owns the project
  const { data: project } = await supabase
    .from('projects')
    .select('id, name, magic_token')
    .eq('id', invoice.project_id)
    .eq('dev_id', user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Create Stripe Checkout Session
  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: invoice.currency || 'usd',
          unit_amount: invoice.amount_cents,
          product_data: {
            name: invoice.description || `Invoice for ${project.name}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      invoice_id: invoice.id,
    },
    success_url: `${appUrl}/portal/${project.magic_token}?payment=success`,
    cancel_url: `${appUrl}/portal/${project.magic_token}?payment=cancelled`,
  });

  // Update invoice with payment link and mark as sent
  const { data: updated, error } = await supabase
    .from('invoices')
    .update({
      stripe_payment_link: session.url,
      status: 'sent',
    })
    .eq('id', invoice_id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}
