'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FolderPlus, User, Globe } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    client_name: '',
    client_email: '',
    website_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create project');
      }

      const project = await res.json();

      if (form.client_email) {
        await fetch('/api/invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId: project.id }),
        });
      }

      router.push(`/dashboard/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">Create a new project</h1>
      <p className="text-sm text-slate-500 mb-8">Set up a client project with a feedback portal</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <FolderPlus size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Project details</h2>
              <p className="text-xs text-slate-500">Name your project and add the website URL</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Project name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                placeholder="e.g. Acme Corp Website Redesign"
              />
            </div>
            <div>
              <label htmlFor="website_url" className="block text-sm font-medium text-slate-700 mb-1.5">
                Website URL
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="website_url"
                  type="url"
                  value={form.website_url}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Client details</h2>
              <p className="text-xs text-slate-500">We&apos;ll send them a magic link to access their portal</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="client_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Client name
              </label>
              <input
                id="client_name"
                type="text"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                placeholder="e.g. John Smith"
              />
            </div>
            <div>
              <label htmlFor="client_email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Client email
              </label>
              <input
                id="client_email"
                type="email"
                value={form.client_email}
                onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                placeholder="client@example.com"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium shadow-sm shadow-primary/20"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
