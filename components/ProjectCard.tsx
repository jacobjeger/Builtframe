import Link from 'next/link';
import { Globe, Clock, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  in_review: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
          {project.client_name && (
            <p className="text-sm text-gray-500 mt-1">{project.client_name}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[project.status] || statusColors.active}`}>
          {project.status.replace('_', ' ')}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
        {project.website_url && (
          <span className="flex items-center gap-1 truncate">
            <Globe size={14} />
            <span className="truncate">{project.website_url.replace(/^https?:\/\//, '')}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {new Date(project.created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-3 flex items-center text-sm text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View project <ArrowRight size={14} className="ml-1" />
      </div>
    </Link>
  );
}
