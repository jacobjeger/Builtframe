import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendAnnotationNotification } from '@/lib/resend';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const token = searchParams.get('token');

  if (!projectId) {
    return NextResponse.json({ error: 'projectId required' }, { status: 400 });
  }

  // If token is provided, this is a client request — use service role
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
      .from('annotations')
      .select('*, comments:comments(count)')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const annotationsWithCount = (data || []).map((a: Record<string, unknown>) => ({
      ...a,
      comment_count: Array.isArray(a.comments) && a.comments.length > 0
        ? (a.comments[0] as { count: number }).count
        : 0,
    }));

    return NextResponse.json(annotationsWithCount);
  }

  // Dev request — use auth client
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('annotations')
    .select('*, comments:comments(count)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const annotationsWithCount = (data || []).map((a: Record<string, unknown>) => ({
    ...a,
    comment_count: Array.isArray(a.comments) && a.comments.length > 0
      ? (a.comments[0] as { count: number }).count
      : 0,
  }));

  return NextResponse.json(annotationsWithCount);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { project_id, author_type, author_name, x_percent, y_percent, page_url, token, initial_comment } = body;

  if (token) {
    // Client annotation
    const serviceClient = await createServiceClient();
    const { data: project } = await serviceClient
      .from('projects')
      .select('*, profiles:dev_id(email, full_name)')
      .eq('magic_token', token)
      .single();

    if (!project || project.id !== project_id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const { data: annotation, error } = await serviceClient
      .from('annotations')
      .insert({
        project_id,
        author_type: 'client',
        author_name: author_name || project.client_name || 'Client',
        x_percent,
        y_percent,
        page_url,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Create initial comment if provided
    if (initial_comment) {
      await serviceClient.from('comments').insert({
        annotation_id: annotation.id,
        author_type: 'client',
        author_name: author_name || project.client_name || 'Client',
        body: initial_comment,
      });
    }

    // Notify dev
    const profile = project.profiles as { email: string; full_name: string } | null;
    if (profile?.email) {
      try {
        await sendAnnotationNotification(
          profile.email,
          project.client_name || 'Your client',
          project.name,
          project.id
        );
      } catch {
        // Email sending failure shouldn't block the response
      }
    }

    return NextResponse.json(annotation);
  }

  // Dev annotation
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: annotation, error } = await supabase
    .from('annotations')
    .insert({
      project_id,
      author_type: 'dev',
      author_name: author_name || 'Developer',
      x_percent,
      y_percent,
      page_url,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (initial_comment) {
    await supabase.from('comments').insert({
      annotation_id: annotation.id,
      author_type: 'dev',
      author_name: author_name || 'Developer',
      body: initial_comment,
    });
  }

  return NextResponse.json(annotation);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, status, token } = body;

  if (token) {
    const serviceClient = await createServiceClient();
    const { data, error } = await serviceClient
      .from('annotations')
      .update({ status })
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

  const { data, error } = await supabase
    .from('annotations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
