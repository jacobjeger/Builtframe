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
  open: { label: 'Open', icon: <AlertCircle size={14} />, color: 'text-amber-600' },
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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
            {annotationIndex}
          </span>
          <span className="text-sm font-semibold text-slate-900">Annotation #{annotationIndex}</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
        <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
          {status.icon} {status.label}
        </span>
        {authorType === 'dev' && (
          <div className="ml-auto flex gap-1">
            {(['open', 'in_progress', 'resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(annotation.id, s)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  annotation.status === s
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={`flex flex-col ${comment.author_type === 'dev' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-slate-400 mb-1">
                {comment.author_name} &middot; {new Date(comment.created_at).toLocaleString()}
              </span>
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                  comment.author_type === 'dev'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}
              >
                {comment.body}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-slate-200">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!newComment.trim() || sending}
          className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
