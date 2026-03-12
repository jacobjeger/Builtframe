'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('free');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || '');
        setEmail(profile.email || user.email || '');
        setPlan(profile.plan || 'free');
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const planLabels: Record<string, string> = {
    free: 'Free',
    pro: 'Pro — $29/mo',
    agency: 'Agency — $79/mo',
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Settings</h1>
      <p className="text-sm text-slate-500 mb-8">Manage your profile and account</p>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Profile</h2>
            <p className="text-xs text-slate-500">Your personal information</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1.5">Email cannot be changed</p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white py-2.5 px-5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium text-sm shadow-sm shadow-primary/20"
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Plan Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <CreditCard size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Plan & Billing</h2>
            <p className="text-xs text-slate-500">Your current subscription</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="font-medium text-slate-900">{planLabels[plan] || 'Free'}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {plan === 'free' ? 'Limited to 1 project' : 'Your current plan'}
            </p>
          </div>
          <Link href="/#pricing" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            {plan === 'free' ? 'Upgrade' : 'Manage'}
          </Link>
        </div>
      </div>
    </div>
  );
}
