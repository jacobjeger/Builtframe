'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Reset your password</h2>
      <p className="text-sm text-slate-500 mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {sent ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3">
            <p className="text-sm text-green-700">
              Check your email for a password reset link. It may take a minute to arrive.
            </p>
          </div>
          <Link
            href="/login"
            className="block text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
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
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-slate-500 mt-6">
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
