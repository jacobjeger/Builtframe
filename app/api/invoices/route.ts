import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const token = searchParams.get('token');

  if (!projectId) {
    return NextResponse.json({ error: 'projectId required' }, { status: 400 });
  }

  // Client request via magic token
  if (token) {
    const serviceClient = await createServiceClient();
    const { data: project } = await serviceClient
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('magic_token', token)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    // Clients only see sent/paid/overdue invoices (not drafts)
    const { data, error } = await serviceClient
      .from('invoices')
      .select('*')
      .eq('project_id', projectId)
      .in('status', ['sent', 'paid', 'overdue'])
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  }

  // Dev request
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify the dev owns this project
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('dev_id', user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { project_id, amount_cents, currency, description, due_date } = body;

  if (!project_id || !amount_cents) {
    return NextResponse.json({ error: 'project_id and amount_cents required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      project_id,
      dev_id: user.id,
      amount_cents,
      currency: currency || 'usd',
      description: description || null,
      status: 'draft',
      due_date: due_date || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, status, token } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status required' }, { status: 400 });
  }

  if (token) {
    const serviceClient = await createServiceClient();
    const { data, error } = await serviceClient
      .from('invoices')
      .update({ status, ...(status === 'paid' ? { paid_at: new Date().toISOString() } : {}) })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify invoice belongs to a project the dev owns
  const { data: invoice } = await supabase
    .from('invoices')
    .select('id, project_id')
    .eq('id', id)
    .single();

  if (!invoice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', invoice.project_id)
    .eq('dev_id', user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('invoices')
    .update({ status, ...(status === 'paid' ? { paid_at: new Date().toISOString() } : {}) })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
