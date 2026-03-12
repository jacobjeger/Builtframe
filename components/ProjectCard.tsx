import Link from 'next/link';
import { Globe, Clock, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: 'Active', color: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  in_review: { label: 'In review', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  completed: { label: 'Completed', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  archived: { label: 'Archived', color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
};

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig.active;

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 card-glow group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{project.name}</h3>
          {project.client_name && (
            <p className="text-sm text-slate-500 mt-0.5">{project.client_name}</p>
          )}
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        {project.website_url && (
          <span className="flex items-center gap-1 truncate">
            <Globe size={12} />
            <span className="truncate">{project.website_url.replace(/^https?:\/\//, '')}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {new Date(project.created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View project <ArrowRight size={14} className="ml-1" />
      </div>
    </Link>
  );
}
