'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Check, Pin, MessageSquare, CreditCard } from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
            Builtframe
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors font-medium"
            >
              Get started
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-400">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-t border-white/5 px-6 py-4 space-y-3">
            <Link href="/login" className="block text-sm text-slate-400 py-2">Sign in</Link>
            <Link href="/signup" className="block text-sm bg-white text-slate-900 text-center px-4 py-2.5 rounded-lg font-medium">
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="bg-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Client feedback,<br />pinned to the pixel
          </h1>
          <p className="text-slate-400 mt-6 text-lg max-w-lg mx-auto leading-relaxed">
            Share a link. Your client clicks on their live site to say what needs changing.
            You get pinned comments, not vague emails.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold mt-8"
          >
            Try it free <ArrowRight size={16} />
          </Link>
        </div>

        {/* Compact mockup */}
        <div className="max-w-2xl mx-auto px-6 mt-16">
          <div className="bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 bg-slate-900 rounded px-3 py-1 text-[11px] text-slate-500 border border-white/5 text-center">
                app.builtframe.com/portal/rivera-law
              </div>
            </div>
            <div className="p-4">
              <div className="bg-white rounded-lg relative p-4">
                {/* Minimal fake site */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] font-bold text-slate-800">Rivera Law Group</div>
                  <div className="flex gap-3 text-[9px] text-slate-400">
                    <span>About</span><span>Services</span><span>Contact</span>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 mb-3">
                  <p className="text-[10px] text-white font-semibold">Experienced Business Attorneys</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">Protecting your interests since 2012.</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-50 rounded p-2 text-[8px] text-slate-500">Corporate</div>
                  <div className="bg-slate-50 rounded p-2 text-[8px] text-slate-500">Litigation</div>
                  <div className="bg-slate-50 rounded p-2 text-[8px] text-slate-500">Real Estate</div>
                </div>

                {/* Pins */}
                <div className="absolute top-[38px] right-8 w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">1</div>
                <div className="absolute top-[72px] left-[40%] w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">2</div>
                <div className="absolute bottom-4 left-6 w-5 h-5 rounded-full bg-green-500 text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — 3 compact cards */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Pin size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Visual annotations</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Clients click on the live site to drop a pin and describe what needs changing. Each pin becomes a thread.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Project messaging</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Real-time chat inside every project. No more hunting through email threads for that one thing the client said.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Built-in invoicing</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Create invoices inside the project. Your client pays right from their portal with Stripe checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20 lg:py-24 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Free to start. $29/mo when you&apos;re ready.
          </h2>
          <p className="text-slate-500 mt-3 text-base">Both plans include annotations, messaging, and portal access.</p>

          <div className="grid sm:grid-cols-2 gap-5 mt-12 text-left">
            {/* Free */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">Free</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">$0</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">One project, all core features.</p>
              <ul className="mt-5 space-y-2.5">
                {['1 project', 'Visual annotations', 'Real-time messaging', 'Client magic link'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={14} className="text-slate-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-6 block text-center py-2.5 rounded-lg font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Pro</h3>
                <span className="text-[10px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">$29</span>
                <span className="text-sm text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">Unlimited projects + invoicing.</p>
              <ul className="mt-5 space-y-2.5">
                {['Unlimited projects', 'Everything in Free', 'Stripe invoicing', 'Email notifications'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check size={14} className="text-primary-light shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-6 block text-center py-2.5 rounded-lg font-semibold text-sm bg-white text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            <span className="font-semibold text-slate-600">Builtframe</span> &middot; &copy; {new Date().getFullYear()}
          </span>
          <Link href="/login" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
