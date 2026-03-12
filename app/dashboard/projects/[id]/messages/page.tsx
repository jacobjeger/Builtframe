'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MessageThread from '@/components/MessageThread';
import { createClient } from '@/lib/supabase/client';

export default function MessagesPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [devName, setDevName] = useState('Developer');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profile?.full_name) setDevName(profile.full_name);
      }

      const res = await fetch('/api/projects');
      if (res.ok) {
        const projects = await res.json();
        const project = projects.find((p: { id: string; name: string }) => p.id === projectId);
        if (project) setProjectName(project.name);
      }
    }
    load();
  }, [projectId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
        <Link href={`/dashboard/projects/${projectId}`} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-semibold text-gray-900">Messages</h1>
          {projectName && <p className="text-xs text-gray-500">{projectName}</p>}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <MessageThread
          projectId={projectId}
          authorType="dev"
          authorName={devName}
        />
      </div>
    </div>
  );
}
