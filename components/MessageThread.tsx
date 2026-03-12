'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Message } from '@/types';

interface MessageThreadProps {
  projectId: string;
  authorType: 'dev' | 'client';
  authorName: string;
  token?: string;
}

export default function MessageThread({
  projectId,
  authorType,
  authorName,
  token,
}: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();

    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    const params = new URLSearchParams({ projectId });
    if (token) params.set('token', token);

    const res = await fetch(`/api/messages?${params}`);
    if (res.ok) {
      setMessages(await res.json());
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        author_type: authorType,
        author_name: authorName,
        body: newMessage.trim(),
        token,
      }),
    });

    if (res.ok) {
      setNewMessage('');
    }
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.author_type === authorType ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[10px] text-slate-400 mb-1">
                {message.author_name} &middot;{' '}
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  message.author_type === authorType
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}
              >
                {message.body}
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 border-t border-slate-200 bg-white"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
