export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import { Plus, FolderKanban, Pin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from('profiles').select('full_name').eq('id', user.id).single()
    : { data: null };

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false }) as { data: Project[] | null };

  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter((p) => p.status === 'active').length || 0;

  const greeting = profile?.full_name ? `Welcome back, ${profile.full_name.split(' ')[0]}` : 'Welcome back';

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your client projects</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm shadow-sm shadow-primary/20"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <FolderKanban size={20} className="text-slate-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
              <p className="text-xs text-slate-500">Total projects</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeProjects}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Pin size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">&mdash;</p>
              <p className="text-xs text-slate-500">Open annotations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects && projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FolderKanban size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No projects yet</h3>
          <p className="text-slate-500 mt-1 mb-6 text-sm">Create your first project to get started</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm shadow-sm shadow-primary/20"
          >
            <Plus size={18} />
            New Project
          </Link>
        </div>
      )}
    </div>
  );
}
