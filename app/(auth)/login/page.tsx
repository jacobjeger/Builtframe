'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
      <p className="text-sm text-slate-500 mb-6">Sign in to your Builtframe account</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 text-sm"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium text-sm shadow-sm shadow-primary/20"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
