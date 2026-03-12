import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendReplyNotification } from '@/lib/resend';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const annotationId = searchParams.get('annotationId');
  const token = searchParams.get('token');

  if (!annotationId) {
    return NextResponse.json({ error: 'annotationId required' }, { status: 400 });
  }

  if (token) {
    const serviceClient = await createServiceClient();
    const { data, error } = await serviceClient
      .from('comments')
      .select('*')
      .eq('annotation_id', annotationId)
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
    .from('comments')
    .select('*')
    .eq('annotation_id', annotationId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { annotation_id, author_type, author_name, body: commentBody, token } = body;

  if (token) {
    const serviceClient = await createServiceClient();

    const { data, error } = await serviceClient
      .from('comments')
      .insert({
        annotation_id,
        author_type: author_type || 'client',
        author_name: author_name || 'Client',
        body: commentBody,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }

  // Dev comment
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      annotation_id,
      author_type: 'dev',
      author_name: author_name || 'Developer',
      body: commentBody,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify client if dev is replying
  try {
    const { data: annotation } = await supabase
      .from('annotations')
      .select('project_id')
      .eq('id', annotation_id)
      .single();

    if (annotation) {
      const { data: project } = await supabase
        .from('projects')
        .select('client_email, name, magic_token')
        .eq('id', annotation.project_id)
        .single();

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (project?.client_email) {
        await sendReplyNotification(
          project.client_email,
          profile?.full_name || 'Your developer',
          project.name,
          project.magic_token
        );
      }
    }
  } catch {
    // Email failure shouldn't block
  }

  return NextResponse.json(data);
}
