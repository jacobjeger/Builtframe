'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Check, Pin, MessageSquare, CreditCard, Link2, MousePointerClick, Zap } from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
            Builtframe
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors font-medium"
            >
              Get started free
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-400">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-t border-white/5 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm text-slate-400 py-2">Features</a>
            <a href="#how-it-works" className="block text-sm text-slate-400 py-2">How it works</a>
            <a href="#pricing" className="block text-sm text-slate-400 py-2">Pricing</a>
            <Link href="/login" className="block text-sm text-slate-400 py-2">Sign in</Link>
            <Link href="/signup" className="block text-sm bg-white text-slate-900 text-center px-4 py-2.5 rounded-lg font-medium">
              Get started free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="bg-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-slate-400 font-medium">Now with Stripe payments</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight">
                Client feedback,<br />
                pinned to the pixel
              </h1>
              <p className="text-slate-400 mt-6 text-lg leading-relaxed max-w-md">
                Share a link. Your client clicks on their live site to say what needs changing.
                You get pinned comments, not vague emails.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold"
                >
                  Start for free <ArrowRight size={16} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-slate-300 px-6 py-3 rounded-lg hover:bg-white/5 transition-colors font-medium"
                >
                  See how it works
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-4">Free forever for 1 project. No credit card required.</p>
            </div>

            {/* Right product mockup */}
            <div className="relative">
              <div className="bg-slate-900 rounded-xl border border-white/10 shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-slate-800/80 px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 bg-slate-900/80 rounded-md px-3 py-1 text-[11px] text-slate-500 border border-white/5 text-center">
                    app.builtframe.com/portal/rivera-law
                  </div>
                </div>

                <div className="flex min-h-[320px]">
                  {/* Preview panel */}
                  <div className="flex-1 p-3 bg-slate-900">
                    <div className="bg-white rounded-lg h-full relative p-4 overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[11px] font-bold text-slate-800 tracking-tight">Rivera Law Group</div>
                        <div className="flex gap-3 text-[9px] text-slate-400">
                          <span>About</span><span>Services</span><span>Contact</span>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 mb-3">
                        <p className="text-[10px] text-white font-semibold mb-0.5">Experienced Business Attorneys</p>
                        <p className="text-[8px] text-slate-400">Protecting your interests since 2012.</p>
                        <div className="mt-2 bg-amber-500 rounded px-2 py-0.5 text-[7px] text-white font-medium inline-block">Book a consultation</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="bg-slate-50 rounded p-1.5">
                          <div className="text-[8px] font-semibold text-slate-700">Corporate</div>
                          <div className="text-[7px] text-slate-400">Formation &amp; governance</div>
                        </div>
                        <div className="bg-slate-50 rounded p-1.5">
                          <div className="text-[8px] font-semibold text-slate-700">Litigation</div>
                          <div className="text-[7px] text-slate-400">Dispute resolution</div>
                        </div>
                        <div className="bg-slate-50 rounded p-1.5">
                          <div className="text-[8px] font-semibold text-slate-700">Real Estate</div>
                          <div className="text-[7px] text-slate-400">Transactions &amp; leases</div>
                        </div>
                      </div>

                      {/* Pins */}
                      <div className="absolute top-[48px] right-5 w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md animate-bounce-subtle">1</div>
                      <div className="absolute top-[88px] left-[42%] w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">2</div>
                      <div className="absolute bottom-4 left-6 w-5 h-5 rounded-full bg-green-500 text-white text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-md">3</div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="hidden sm:flex w-52 border-l border-white/5 flex-col bg-slate-900">
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-[10px] text-slate-500 font-medium">3 annotations &middot; 1 resolved</p>
                    </div>
                    <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
                      <div className="bg-slate-800 rounded-lg p-2">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-primary text-white text-[7px] flex items-center justify-center font-bold">1</div>
                          <span className="text-[9px] text-slate-400">Maria &middot; 3h ago</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-snug">Button color wrong &mdash; should be #D4A843</p>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-2">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-primary text-white text-[7px] flex items-center justify-center font-bold">2</div>
                          <span className="text-[9px] text-slate-400">Maria &middot; 2h ago</span>
                        </div>
                        <p className="text-[9px] text-slate-300 leading-snug">Heading font doesn&apos;t match brand</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2 border border-green-500/20">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-green-500 text-white text-[7px] flex items-center justify-center font-bold">3</div>
                          <span className="text-[9px] text-green-400">Resolved</span>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-snug">Footer links need fixing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">500+</p>
            <p className="text-xs text-slate-500 mt-0.5">Projects managed</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div>
            <p className="text-2xl font-extrabold text-slate-900">2,000+</p>
            <p className="text-xs text-slate-500 mt-0.5">Annotations resolved</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div>
            <p className="text-2xl font-extrabold text-slate-900">$180k+</p>
            <p className="text-xs text-slate-500 mt-0.5">Invoiced through platform</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase">How it works</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three steps. Zero confusion.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/5">
                <Link2 size={22} className="text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">Step 1</div>
              <h3 className="font-bold text-slate-900 mb-2">Share a link</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Create a project, paste your staging URL, and send your client their magic portal link.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/5">
                <MousePointerClick size={22} className="text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">Step 2</div>
              <h3 className="font-bold text-slate-900 mb-2">Client clicks to comment</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                They see their live site. They click anywhere to drop a pin and describe what needs changing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/5">
                <Zap size={22} className="text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">Step 3</div>
              <h3 className="font-bold text-slate-900 mb-2">You ship faster</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Each pin is a thread. Mark them as open, in progress, or resolved. No more guessing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase">Features</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-lg mx-auto">
              Feedback, messaging, and invoicing in one place &mdash; so you can stop juggling tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Annotations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Pin size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Visual annotations</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Clients click on their live site to drop a pin and say what needs changing. Each pin becomes a threaded discussion.
              </p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                {[
                  { n: 1, text: 'Button color is wrong', status: 'Open', color: 'bg-amber-100 text-amber-700' },
                  { n: 2, text: 'Font doesn\'t match', status: 'In progress', color: 'bg-blue-100 text-blue-700' },
                  { n: 3, text: 'Fix footer links', status: 'Resolved', color: 'bg-green-100 text-green-700' },
                ].map((item) => (
                  <div key={item.n} className="flex items-center gap-2 bg-white rounded-md px-2.5 py-1.5 border border-slate-100">
                    <span className={`w-4 h-4 rounded-full ${item.n === 3 ? 'bg-green-500' : 'bg-primary'} text-white text-[8px] flex items-center justify-center font-bold shrink-0`}>{item.n}</span>
                    <span className="text-[11px] text-slate-700 flex-1 truncate">{item.text}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${item.color} shrink-0`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messaging */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Project messaging</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Real-time chat inside every project. No more hunting through email threads or Slack DMs.
              </p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg rounded-bl-sm text-[11px] max-w-[85%]">
                    Homepage looks great! Two things before launch &mdash;
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-primary text-white px-2.5 py-1.5 rounded-lg rounded-br-sm text-[11px] max-w-[85%]">
                    What&apos;s up?
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg rounded-bl-sm text-[11px] max-w-[85%]">
                    Swap team photo, add phone field to contact form
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-primary text-white px-2.5 py-1.5 rounded-lg rounded-br-sm text-[11px] max-w-[85%]">
                    Done &mdash; pushing both now.
                  </div>
                </div>
              </div>
            </div>

            {/* Invoicing */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Stripe invoicing</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Create invoices inside the project. Clients pay right from their portal via Stripe checkout.
              </p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
                <div className="bg-white rounded-md border border-slate-100 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-900">Homepage redesign</span>
                    <span className="text-[9px] font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Paid</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">$2,500</span>
                </div>
                <div className="bg-white rounded-md border border-slate-100 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-900">Phase 2 &mdash; Blog + CMS</span>
                    <span className="text-[9px] font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Sent</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">$1,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase">Pricing</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Free to start. $29/mo when you&apos;re ready.
            </h2>
            <p className="text-slate-500 mt-3 text-base">Both plans include annotations, messaging, and portal access.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white rounded-xl border border-slate-200 p-7">
              <h3 className="text-lg font-bold text-slate-900">Free</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">One project, all core features.</p>
              <ul className="mt-6 space-y-3">
                {['1 project', 'Visual annotations', 'Real-time messaging', 'Client magic link', 'Mobile app previews'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check size={15} className="text-green-500 shrink-0" />
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
            <div className="bg-slate-900 rounded-xl p-7 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Pro</h3>
                  <span className="text-[10px] font-bold bg-primary/20 text-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$29</span>
                  <span className="text-sm text-slate-400">/mo</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Unlimited projects, invoicing, notifications.</p>
                <ul className="mt-6 space-y-3">
                  {['Unlimited projects', 'Everything in Free', 'Stripe invoicing', 'Email notifications', 'Priority support'].map((f) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Stop chasing feedback over email.
          </h2>
          <p className="text-slate-400 mt-3 text-base max-w-md mx-auto">
            Set up your first project in under a minute. Free forever for one project.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold mt-8"
          >
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-400">Builtframe</span> &middot; &copy; {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Pricing</a>
            <Link href="/login" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
