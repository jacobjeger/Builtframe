'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { MessageSquare, Pin } from 'lucide-react';
import PreviewFrame from '@/components/PreviewFrame';
import CommentPanel from '@/components/CommentPanel';
import MessageThread from '@/components/MessageThread';
import type { Project, Annotation } from '@/types';

export default function ClientPortalPage() {
  const params = useParams();
  const token = params.token as string;

  const [project, setProject] = useState<Project | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [tab, setTab] = useState<'feedback' | 'messages'>('feedback');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clientName, setClientName] = useState('');
  const [newAnnotationComment, setNewAnnotationComment] = useState('');
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    fetchProject();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (project) {
      fetchAnnotations();
      setClientName(project.client_name || 'Client');
    }
  }, [project?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProject = async () => {
    setLoading(true);
    const res = await fetch(`/api/portal?token=${token}`);
    if (res.ok) {
      setProject(await res.json());
    } else {
      setError('This link is invalid or has expired.');
    }
    setLoading(false);
  };

  const fetchAnnotations = async () => {
    if (!project) return;
    const res = await fetch(`/api/annotations?projectId=${project.id}&token=${token}`);
    if (res.ok) {
      setAnnotations(await res.json());
    }
  };

  const handleCreateAnnotation = useCallback((x: number, y: number) => {
    setPendingPosition({ x, y });
  }, []);

  const submitAnnotation = async () => {
    if (!pendingPosition || !newAnnotationComment.trim() || !project) return;

    const res = await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: project.id,
        author_type: 'client',
        author_name: clientName,
        x_percent: pendingPosition.x,
        y_percent: pendingPosition.y,
        initial_comment: newAnnotationComment.trim(),
        token,
      }),
    });

    if (res.ok) {
      setPendingPosition(null);
      setNewAnnotationComment('');
      fetchAnnotations();
    }
  };

  const handleStatusChange = async (annotationId: string, status: string) => {
    await fetch('/api/annotations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: annotationId, status, token }),
    });
    setAnnotations((prev) =>
      prev.map((a) => (a.id === annotationId ? { ...a, status: status as Annotation['status'] } : a))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-indigo-600 mb-2">Builtframe</h1>
          <p className="text-gray-400">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">Builtframe</h1>
          <p className="text-gray-600">{error || 'Project not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-indigo-600">Builtframe</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-900">{project.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTab('feedback');
              setActiveAnnotation(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === 'feedback'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Pin size={16} />
            Feedback
          </button>
          <button
            onClick={() => {
              setTab('messages');
              setActiveAnnotation(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === 'messages'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={16} />
            Messages
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Preview */}
        <div className="flex-1 p-4 min-h-0">
          {project.website_url ? (
            <PreviewFrame
              websiteUrl={project.website_url}
              annotations={annotations}
              activeAnnotationId={activeAnnotation?.id || null}
              onAnnotationClick={(a) => {
                setActiveAnnotation(a);
                setTab('feedback');
              }}
              onCreateAnnotation={handleCreateAnnotation}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400">Preview not available</p>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white flex flex-col h-80 lg:h-auto">
          {tab === 'messages' ? (
            <MessageThread
              projectId={project.id}
              authorType="client"
              authorName={clientName}
              token={token}
            />
          ) : activeAnnotation ? (
            <CommentPanel
              annotation={activeAnnotation}
              annotationIndex={annotations.findIndex((a) => a.id === activeAnnotation.id) + 1}
              authorType="client"
              authorName={clientName}
              token={token}
              onClose={() => setActiveAnnotation(null)}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className="flex flex-col h-full">
              {/* New annotation prompt */}
              {pendingPosition && (
                <div className="p-3 border-b border-gray-200 bg-indigo-50">
                  <p className="text-xs text-indigo-600 font-medium mb-2">
                    Leave your feedback
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAnnotationComment}
                      onChange={(e) => setNewAnnotationComment(e.target.value)}
                      placeholder="What would you like to change?"
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
                  <div className="text-center py-8 px-4">
                    <p className="text-sm text-gray-500 mb-2">No feedback yet</p>
                    <p className="text-xs text-gray-400">
                      Click the &quot;Annotating&quot; button above the preview, then click anywhere on the website to leave feedback.
                    </p>
                  </div>
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
                            {a.author_name} &middot; {new Date(a.created_at).toLocaleDateString()}
                          </p>
                          <span className="text-xs text-gray-400">
                            {a.status === 'resolved' ? 'Resolved' : a.status === 'in_progress' ? 'In progress' : 'Open'}
                            {a.comment_count !== undefined && ` · ${a.comment_count} comment${a.comment_count !== 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
