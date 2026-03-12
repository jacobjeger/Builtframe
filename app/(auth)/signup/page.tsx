'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
      <p className="text-sm text-slate-500 mb-6">Start managing client projects in minutes</p>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 text-sm"
            placeholder="Jane Smith"
          />
        </div>
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
            minLength={6}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 text-sm"
            placeholder="Min. 6 characters"
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
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
