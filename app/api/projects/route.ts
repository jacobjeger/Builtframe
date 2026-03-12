import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('dev_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check plan limits
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single();

  const plan = profile?.plan || 'free';

  if (plan === 'free') {
    const { count } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('dev_id', user.id);

    if ((count ?? 0) >= 1) {
      return NextResponse.json(
        { error: 'Free plan limited to 1 project. Upgrade to Pro for unlimited projects.' },
        { status: 403 }
      );
    }
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      dev_id: user.id,
      name: body.name,
      client_name: body.client_name || null,
      client_email: body.client_email || null,
      website_url: body.website_url || null,
      preview_type: body.preview_type || 'website',
      apk_url: body.apk_url || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  const allowed: Record<string, unknown> = {};
  for (const key of ['name', 'client_name', 'client_email', 'website_url', 'status', 'preview_type', 'apk_url']) {
    if (key in updates) {
      allowed[key] = updates[key];
    }
  }

  const { data, error } = await supabase
    .from('projects')
    .update(allowed)
    .eq('id', id)
    .eq('dev_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('dev_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
