import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  const serviceClient = await createServiceClient();
  const { data: project, error } = await serviceClient
    .from('projects')
    .select('*')
    .eq('magic_token', token)
    .single();

  if (error || !project) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
  }

  return NextResponse.json(project);
}
