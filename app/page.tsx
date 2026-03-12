'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Check } from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
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

      {/* Hero — dark, asymmetric */}
      <section className="bg-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left — copy */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight">
                Client feedback<br />
                without the<br />
                email chaos
              </h1>
              <p className="text-slate-400 mt-6 text-lg leading-relaxed max-w-md">
                Your client gets a link. They click on their live site to tell you
                what to change. You get a pinned comment instead of a vague email.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold mt-8"
              >
                Try it free <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right — product mockup */}
            <div className="relative">
              <div className="bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 bg-slate-900 rounded px-3 py-1 text-[11px] text-slate-500 border border-white/5 text-center">
                    app.builtframe.com/projects/rivera-law
                  </div>
                </div>

                <div className="flex min-h-[300px] lg:min-h-[380px]">
                  {/* Preview */}
                  <div className="flex-1 p-3 bg-slate-900">
                    <div className="bg-white rounded-lg h-full relative p-4 overflow-hidden">
                      {/* A realistic-ish website */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[11px] font-bold text-slate-800 tracking-tight">Rivera Law Group</div>
                        <div className="flex gap-3 text-[9px] text-slate-400">
                          <span>About</span><span>Services</span><span>Contact</span>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-4 mb-3">
                        <p className="text-[10px] text-white font-semibold mb-1">Experienced Business Attorneys</p>
                        <p className="text-[8px] text-slate-400 leading-relaxed">Protecting your business interests<br />since 2012.</p>
                        <div className="mt-2 bg-amber-500 rounded px-2 py-0.5 text-[8px] text-white font-medium inline-block">Book a consultation</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2">
                          <div className="text-[9px] font-semibold text-slate-700 mb-0.5">Corporate</div>
                          <div className="text-[7px] text-slate-400">Formation, governance, compliance</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="text-[9px] font-semibold text-slate-700 mb-0.5">Litigation</div>
                          <div className="text-[7px] text-slate-400">Dispute resolution, trial counsel</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="text-[9px] font-semibold text-slate-700 mb-0.5">Real Estate</div>
                          <div className="text-[7px] text-slate-400">Transactions, zoning, leases</div>
                        </div>
                      </div>

                      {/* Pins */}
                      <div className="absolute top-[52px] right-6 w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">1</div>
                      <div className="absolute top-[100px] left-[45%] w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">2</div>
                      <div className="absolute bottom-5 left-8 w-5 h-5 rounded-full bg-green-500 text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">3</div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="hidden sm:flex w-56 lg:w-64 border-l border-white/5 flex-col bg-slate-900">
                    <div className="px-3 py-2.5 border-b border-white/5">
                      <p className="text-[10px] text-slate-500 font-medium">3 annotations · 1 resolved</p>
                    </div>
                    <div className="flex-1 p-2.5 space-y-2 overflow-hidden">
                      <div className="bg-slate-800 rounded-lg p-2.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-4 h-4 rounded-full bg-primary text-white text-[8px] flex items-center justify-center font-bold">1</div>
                          <span className="text-[9px] text-slate-400">Maria · 3h ago</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-snug">This button color is wrong — should be our gold (#D4A843), not orange</p>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-2.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-4 h-4 rounded-full bg-primary text-white text-[8px] flex items-center justify-center font-bold">2</div>
                          <span className="text-[9px] text-slate-400">Maria · 2h ago</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-snug">Heading font looks different from our brand guide</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2.5 border border-green-500/20">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-4 h-4 rounded-full bg-green-500 text-white text-[8px] flex items-center justify-center font-bold">3</div>
                          <span className="text-[9px] text-green-400">Resolved</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug">Footer links need to go to the right pages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — stacked, asymmetric, no card grid */}
      <section id="features" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">

          {/* Feature 1 */}
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center mb-24 lg:mb-32">
            <div>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Annotations</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                They click. You understand.
              </h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                Your client sees their live website inside a portal. They click to drop a pin
                and say what needs changing. Each pin becomes a thread you can mark as open,
                in progress, or resolved. No screenshots. No guessing.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="space-y-2.5">
                {[
                  { n: 1, status: 'open', badge: 'bg-amber-100 text-amber-700', text: 'Button color should be our gold #D4A843', who: 'Maria R.', time: '3h' },
                  { n: 2, status: 'in progress', badge: 'bg-blue-100 text-blue-700', text: 'Heading font doesn\'t match brand guide', who: 'Maria R.', time: '2h' },
                  { n: 3, status: 'resolved', badge: 'bg-green-100 text-green-700', text: 'Footer links going to wrong pages', who: 'Maria R.', time: '45m' },
                ].map((item) => (
                  <div key={item.n} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-100">
                    <span className={`w-5 h-5 rounded-full ${item.n === 3 ? 'bg-green-500' : 'bg-primary'} text-white text-[10px] flex items-center justify-center font-bold shrink-0`}>
                      {item.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800 truncate">{item.text}</p>
                      <p className="text-[11px] text-slate-400">{item.who} · {item.time} ago</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.badge} shrink-0`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 — reversed */}
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center mb-24 lg:mb-32">
            <div className="order-2 lg:order-1 bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="space-y-2">
                <div className="flex flex-col items-start">
                  <p className="text-[10px] text-slate-400 mb-1 ml-1">Maria R.</p>
                  <div className="bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl rounded-bl-sm text-sm max-w-[80%]">
                    Hey, homepage looks great. Two things before we launch —
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] text-slate-400 mb-1 mr-1">You</p>
                  <div className="bg-primary text-white px-3.5 py-2 rounded-xl rounded-br-sm text-sm max-w-[80%]">
                    What&apos;s up?
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl rounded-bl-sm text-sm max-w-[80%]">
                    Swap the team photo and add a phone field to the contact form
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-primary text-white px-3.5 py-2 rounded-xl rounded-br-sm text-sm max-w-[80%]">
                    Done. Pushing both now.
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Messaging</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Chat that stays with the project
              </h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                Real-time messaging in every project. No more hunting through email threads
                or Slack DMs for that one thing the client said three weeks ago.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Invoicing</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Bill them right where they see the work
              </h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                Create an invoice inside the project. Your client sees it in their portal
                alongside the site you built them. Track what&apos;s been sent, paid, and overdue.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="space-y-2.5">
                <div className="bg-white rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-900">Homepage redesign</span>
                    <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Paid</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">$2,500</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Paid Jan 15, 2026</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-900">Phase 2 — Blog + CMS</span>
                    <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Sent</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">$1,800</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Due Feb 1, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — 2 tiers, side by side */}
      <section id="pricing" className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Free to start. $29/mo when you&apos;re ready.
          </h2>
          <p className="text-slate-500 mt-3 text-lg">Both plans include annotations, messaging, and client portal access.</p>

          <div className="grid sm:grid-cols-2 gap-5 mt-12">
            {/* Free */}
            <div className="bg-white rounded-xl border border-slate-200 p-7">
              <h3 className="text-lg font-bold text-slate-900">Free</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">One project, all core features.</p>
              <ul className="mt-6 space-y-3">
                {['1 project', 'Visual annotations', 'Real-time messaging', 'Client magic link'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check size={15} className="text-slate-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-7 block text-center py-2.5 rounded-lg font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 rounded-xl p-7 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Pro</h3>
                <span className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$29</span>
                <span className="text-sm text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">Unlimited projects. Invoicing. Notifications.</p>
              <ul className="mt-6 space-y-3">
                {['Unlimited projects', 'Everything in Free', 'Invoicing', 'Email notifications'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check size={15} className="text-primary-light shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-7 block text-center py-2.5 rounded-lg font-semibold text-sm bg-white text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — one line */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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
