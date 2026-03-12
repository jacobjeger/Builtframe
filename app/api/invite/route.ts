import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendMagicLinkEmail } from '@/lib/resend';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { projectId } = await request.json();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('dev_id', user.id)
    .single();

  if (error || !project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  if (!project.client_email) {
    return NextResponse.json({ error: 'No client email set' }, { status: 400 });
  }

  try {
    await sendMagicLinkEmail(
      project.client_email,
      project.client_name || 'there',
      project.name,
      project.magic_token
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send email' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
