'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MessageSquare,
  Pin,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import PreviewFrame from '@/components/PreviewFrame';
import CommentPanel from '@/components/CommentPanel';
import type { Project, Annotation } from '@/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [tab, setTab] = useState<'annotations' | 'messages'>('annotations');
  const [loading, setLoading] = useState(true);
  const [devName, setDevName] = useState('Developer');
  const [newAnnotationComment, setNewAnnotationComment] = useState('');
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetchProject();
    fetchAnnotations();
    fetchDevName();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProject = async () => {
    setLoading(true);
    const res = await fetch(`/api/projects`);
    if (res.ok) {
      const projects = await res.json();
      const proj = projects.find((p: Project) => p.id === projectId);
      setProject(proj || null);
    }
    setLoading(false);
  };

  const fetchAnnotations = async () => {
    const res = await fetch(`/api/annotations?projectId=${projectId}`);
    if (res.ok) {
      setAnnotations(await res.json());
    }
  };

  const fetchDevName = async () => {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (data?.full_name) setDevName(data.full_name);
    }
  };

  const handleCreateAnnotation = useCallback((x: number, y: number) => {
    setPendingPosition({ x, y });
  }, []);

  const submitAnnotation = async () => {
    if (!pendingPosition || !newAnnotationComment.trim()) return;

    const res = await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        author_type: 'dev',
        author_name: devName,
        x_percent: pendingPosition.x,
        y_percent: pendingPosition.y,
        initial_comment: newAnnotationComment.trim(),
      }),
    });

    if (res.ok) {
      setPendingPosition(null);
      setNewAnnotationComment('');
      fetchAnnotations();
    }
  };

  const handleStatusChange = async (annotationId: string, status: string) => {
    const res = await fetch('/api/annotations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: annotationId, status }),
    });

    if (res.ok) {
      setAnnotations((prev) =>
        prev.map((a) => (a.id === annotationId ? { ...a, status: status as Annotation['status'] } : a))
      );
      if (activeAnnotation?.id === annotationId) {
        setActiveAnnotation({ ...activeAnnotation, status: status as Annotation['status'] });
      }
    }
  };

  const handleInvite = async () => {
    setInviting(true);
    await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId }),
    });
    setInviting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-slate-500">Project not found</p>
        <Link href="/dashboard" className="text-primary text-sm mt-2 inline-block hover:text-primary-dark transition-colors">
          Back to projects
        </Link>
      </div>
    );
  }

  const statusIcons: Record<string, React.ReactNode> = {
    open: <AlertCircle size={12} className="text-amber-500" />,
    in_progress: <Clock size={12} className="text-blue-500" />,
    resolved: <CheckCircle size={12} className="text-green-500" />,
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Main preview area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-slate-900 truncate">{project.name}</h1>
            {project.client_name && (
              <p className="text-xs text-slate-500">{project.client_name}</p>
            )}
          </div>
          {project.client_email && (
            <button
              onClick={handleInvite}
              disabled={inviting}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              <Send size={12} />
              {inviting ? 'Sending...' : 'Invite Client'}
            </button>
          )}
        </div>

        <div className="flex-1 p-4 min-h-0 bg-slate-50">
          {project.website_url ? (
            <PreviewFrame
              websiteUrl={project.website_url}
              annotations={annotations}
              activeAnnotationId={activeAnnotation?.id || null}
              onAnnotationClick={(a) => setActiveAnnotation(a)}
              onCreateAnnotation={handleCreateAnnotation}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-xl border border-slate-200">
              <p className="text-slate-400 text-sm">No website URL set for this project</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col h-80 lg:h-auto">
        {/* Tab bar */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setTab('annotations'); setActiveAnnotation(null); }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'annotations'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Pin size={16} />
            Annotations ({annotations.length})
          </button>
          <button
            onClick={() => { setTab('messages'); setActiveAnnotation(null); }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'messages'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MessageSquare size={16} />
            Messages
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden">
          {activeAnnotation ? (
            <CommentPanel
              annotation={activeAnnotation}
              annotationIndex={annotations.findIndex((a) => a.id === activeAnnotation.id) + 1}
              authorType="dev"
              authorName={devName}
              onClose={() => setActiveAnnotation(null)}
              onStatusChange={handleStatusChange}
            />
          ) : tab === 'annotations' ? (
            <div className="h-full flex flex-col">
              {pendingPosition && (
                <div className="p-3 border-b border-slate-200 bg-primary/5">
                  <p className="text-xs text-primary font-medium mb-2">
                    New annotation at ({Math.round(pendingPosition.x)}%, {Math.round(pendingPosition.y)}%)
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAnnotationComment}
                      onChange={(e) => setNewAnnotationComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && submitAnnotation()}
                    />
                    <button
                      onClick={submitAnnotation}
                      disabled={!newAnnotationComment.trim()}
                      className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm disabled:opacity-50 hover:bg-primary-dark transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setPendingPosition(null); setNewAnnotationComment(''); }}
                      className="px-3 py-1.5 text-slate-500 text-sm hover:text-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {annotations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Pin size={20} className="text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">No annotations yet</p>
                    <p className="text-xs text-slate-400 mt-1">Switch to annotation mode and click on the preview to add one</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {annotations.map((a, i) => (
                      <button
                        key={a.id}
                        onClick={() => setActiveAnnotation(a)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3"
                      >
                        <span className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0 ${
                          a.status === 'resolved' ? 'bg-green-500' : 'bg-primary'
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 truncate">
                            {a.author_name || a.author_type} &middot;{' '}
                            {new Date(a.created_at).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              {statusIcons[a.status]} {a.status.replace('_', ' ')}
                            </span>
                            {a.comment_count !== undefined && (
                              <span className="text-xs text-slate-400">
                                {a.comment_count} comment{a.comment_count !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-slate-200">
                <button
                  onClick={fetchAnnotations}
                  className="w-full flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-700 py-1 transition-colors"
                >
                  <RefreshCw size={12} />
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            <MessageThreadWrapper projectId={projectId} authorName={devName} />
          )}
        </div>
      </div>
    </div>
  );
}

function MessageThreadWrapper({ projectId, authorName }: { projectId: string; authorName: string }) {
  const MessageThread = require('@/components/MessageThread').default;
  return (
    <MessageThread
      projectId={projectId}
      authorType="dev"
      authorName={authorName}
    />
  );
}
