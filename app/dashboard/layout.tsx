'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { FolderKanban, Settings, LogOut, Menu, X, User } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
        const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data?.full_name) setUserName(data.full_name);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3">
        <Link href="/dashboard" className="text-lg font-extrabold text-slate-900 tracking-tight">
          Builtframe
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="hidden lg:flex items-center px-6 py-5 border-b border-slate-800">
              <Link href="/dashboard" className="text-lg font-extrabold text-white tracking-tight">
                Builtframe
              </Link>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/20 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-slate-800">
              {userName && (
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <User size={16} className="text-primary-light" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{userName}</p>
                    <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 w-full transition-colors"
              >
                <LogOut size={20} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
