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
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-gray-500">Project not found</p>
        <Link href="/dashboard" className="text-indigo-600 text-sm mt-2 inline-block">
          Back to projects
        </Link>
      </div>
    );
  }

  const statusIcons: Record<string, React.ReactNode> = {
    open: <AlertCircle size={12} className="text-yellow-500" />,
    in_progress: <Clock size={12} className="text-blue-500" />,
    resolved: <CheckCircle size={12} className="text-green-500" />,
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Main preview area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900 truncate">{project.name}</h1>
            {project.client_name && (
              <p className="text-xs text-gray-500">{project.client_name}</p>
            )}
          </div>
          {project.client_email && (
            <button
              onClick={handleInvite}
              disabled={inviting}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              <Send size={12} />
              {inviting ? 'Sending...' : 'Invite Client'}
            </button>
          )}
        </div>

        <div className="flex-1 p-4 min-h-0">
          {project.website_url ? (
            <PreviewFrame
              websiteUrl={project.website_url}
              annotations={annotations}
              activeAnnotationId={activeAnnotation?.id || null}
              onAnnotationClick={(a) => setActiveAnnotation(a)}
              onCreateAnnotation={handleCreateAnnotation}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-400">No website URL set for this project</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white flex flex-col h-80 lg:h-auto">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setTab('annotations');
              setActiveAnnotation(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'annotations'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Pin size={16} />
            Annotations ({annotations.length})
          </button>
          <button
            onClick={() => {
              setTab('messages');
              setActiveAnnotation(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'messages'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
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
              {/* New annotation prompt */}
              {pendingPosition && (
                <div className="p-3 border-b border-gray-200 bg-indigo-50">
                  <p className="text-xs text-indigo-600 font-medium mb-2">
                    New annotation at ({Math.round(pendingPosition.x)}%, {Math.round(pendingPosition.y)}%)
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAnnotationComment}
                      onChange={(e) => setNewAnnotationComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && submitAnnotation()}
                    />
                    <button
                      onClick={submitAnnotation}
                      disabled={!newAnnotationComment.trim()}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm disabled:opacity-50 hover:bg-indigo-700"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setPendingPosition(null);
                        setNewAnnotationComment('');
                      }}
                      className="px-3 py-1.5 text-gray-500 text-sm hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {annotations.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">
                    No annotations yet. Switch to annotation mode and click on the preview to add one.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {annotations.map((a, i) => (
                      <button
                        key={a.id}
                        onClick={() => setActiveAnnotation(a)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {a.author_name || a.author_type} &middot;{' '}
                            {new Date(a.created_at).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              {statusIcons[a.status]} {a.status.replace('_', ' ')}
                            </span>
                            {a.comment_count !== undefined && (
                              <span className="text-xs text-gray-400">
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

              <div className="p-3 border-t border-gray-200">
                <button
                  onClick={fetchAnnotations}
                  className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-700 py-1"
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
