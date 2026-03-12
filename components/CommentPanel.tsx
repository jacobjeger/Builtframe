'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Annotation, Comment } from '@/types';

interface CommentPanelProps {
  annotation: Annotation;
  annotationIndex: number;
  authorType: 'dev' | 'client';
  authorName: string;
  token?: string;
  onClose: () => void;
  onStatusChange: (annotationId: string, status: string) => void;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  open: { label: 'Open', icon: <AlertCircle size={14} />, color: 'text-yellow-600' },
  in_progress: { label: 'In Progress', icon: <Clock size={14} />, color: 'text-blue-600' },
  resolved: { label: 'Resolved', icon: <CheckCircle size={14} />, color: 'text-green-600' },
};

export default function CommentPanel({
  annotation,
  annotationIndex,
  authorType,
  authorName,
  token,
  onClose,
  onStatusChange,
}: CommentPanelProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchComments();
  }, [annotation.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [comments]);

  const fetchComments = async () => {
    setLoading(true);
    const params = new URLSearchParams({ annotationId: annotation.id });
    if (token) params.set('token', token);

    const res = await fetch(`/api/comments?${params}`);
    if (res.ok) {
      setComments(await res.json());
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || sending) return;

    setSending(true);
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        annotation_id: annotation.id,
        author_type: authorType,
        author_name: authorName,
        body: newComment.trim(),
        token,
      }),
    });

    if (res.ok) {
      const comment = await res.json();
      setComments([...comments, comment]);
      setNewComment('');
    }
    setSending(false);
  };

  const status = statusConfig[annotation.status] || statusConfig.open;

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
            {annotationIndex}
          </span>
          <span className="text-sm font-medium text-gray-900">Annotation #{annotationIndex}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
        <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
          {status.icon} {status.label}
        </span>
        {authorType === 'dev' && (
          <div className="ml-auto flex gap-1">
            {(['open', 'in_progress', 'resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(annotation.id, s)}
                className={`text-xs px-2 py-0.5 rounded ${
                  annotation.status === s
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {loading ? (
          <p className="text-sm text-gray-400 text-center py-4">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={`flex flex-col ${comment.author_type === 'dev' ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-gray-400 mb-1">
                {comment.author_name} &middot; {new Date(comment.created_at).toLocaleString()}
              </span>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  comment.author_type === 'dev'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {comment.body}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-gray-200">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!newComment.trim() || sending}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
