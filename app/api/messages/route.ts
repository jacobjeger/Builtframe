import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendMessageNotification } from '@/lib/resend';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const token = searchParams.get('token');

  if (!projectId) {
    return NextResponse.json({ error: 'projectId required' }, { status: 400 });
  }

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

    const { data, error } = await serviceClient
      .from('messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

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

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { project_id, author_type, author_name, body: messageBody, token } = body;

  if (token) {
    const serviceClient = await createServiceClient();
    const { data: project } = await serviceClient
      .from('projects')
      .select('*, profiles:dev_id(email, full_name)')
      .eq('magic_token', token)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const { data, error } = await serviceClient
      .from('messages')
      .insert({
        project_id: project.id,
        author_type: 'client',
        author_name: author_name || project.client_name || 'Client',
        body: messageBody,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Notify dev
    const profile = project.profiles as { email: string; full_name: string } | null;
    if (profile?.email) {
      try {
        await sendMessageNotification(
          profile.email,
          project.client_name || 'Your client',
          project.name,
          `${APP_URL}/dashboard/projects/${project.id}/messages`
        );
      } catch {
        // Email failure shouldn't block
      }
    }

    return NextResponse.json(data);
  }

  // Dev message
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('messages')
    .insert({
      project_id,
      author_type: 'dev',
      author_name: author_name || 'Developer',
      body: messageBody,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify client
  try {
    const { data: project } = await supabase
      .from('projects')
      .select('client_email, name, magic_token')
      .eq('id', project_id)
      .single();

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (project?.client_email) {
      await sendMessageNotification(
        project.client_email,
        profile?.full_name || 'Your developer',
        project.name,
        `${APP_URL}/portal/${project.magic_token}`
      );
    }
  } catch {
    // Email failure shouldn't block
  }

  return NextResponse.json(data);
}
