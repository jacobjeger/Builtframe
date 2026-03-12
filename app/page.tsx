'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Menu,
  X,
  Check,
} from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'One project, all core features.',
    features: [
      '1 project',
      'Visual annotations',
      'Real-time messaging',
      'Magic link for your client',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For freelancers with multiple clients.',
    features: [
      '20 projects',
      'Everything in Free',
      'Invoicing & payments',
      'Email notifications',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: '$79',
    period: '/mo',
    description: 'For teams and studios.',
    features: [
      'Unlimited projects',
      'Everything in Pro',
      'Priority support',
      'Custom branding (coming soon)',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">
            Builtframe
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Try it free
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
            <Link href="/login" className="block text-sm text-slate-600 py-2">Sign in</Link>
            <Link href="/signup" className="block text-sm bg-slate-900 text-white text-center px-4 py-2 rounded-lg font-medium">
              Try it free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-8 lg:pt-36 lg:pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-4">Client feedback for web projects</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Your clients click on their site.<br />
              You see exactly what they mean.
            </h1>
            <p className="text-lg text-slate-500 mt-5 leading-relaxed max-w-xl">
              Builtframe gives each client a link to their project. They leave feedback directly
              on their live website, message you, and pay invoices. One place instead of
              email threads and screenshot chaos.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium"
              >
                Try it free <ArrowRight size={16} />
              </Link>
              <span className="text-sm text-slate-400">Free plan, no card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product mockup — realistic dashboard */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2 shadow-sm">
            {/* Browser bar */}
            <div className="bg-white rounded-t-xl border border-slate-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-amber-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div className="flex-1 bg-slate-50 rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-100">
                app.builtframe.com/projects/acme-redesign
              </div>
            </div>
            {/* Mockup content — project detail view */}
            <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 overflow-hidden">
              <div className="flex min-h-[340px] lg:min-h-[420px]">
                {/* Main preview area */}
                <div className="flex-1 p-4 bg-slate-50">
                  {/* Mini browser frame */}
                  <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
                    <div className="bg-slate-100 rounded-t-lg px-3 py-1.5 flex items-center gap-2 border-b border-slate-200">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                      <div className="text-[10px] text-slate-400 bg-white rounded px-2 py-0.5 border border-slate-100 flex-1 text-center">acme-corp.com</div>
                      <div className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-medium">Annotating</div>
                    </div>
                    {/* Fake website content with pins */}
                    <div className="flex-1 p-4 relative">
                      <div className="h-4 bg-slate-100 rounded w-32 mb-3" />
                      <div className="h-8 bg-slate-50 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-50 rounded w-full mb-1.5" />
                      <div className="h-3 bg-slate-50 rounded w-5/6 mb-1.5" />
                      <div className="h-3 bg-slate-50 rounded w-2/3 mb-4" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 bg-slate-50 rounded" />
                        <div className="h-16 bg-slate-50 rounded" />
                        <div className="h-16 bg-slate-50 rounded" />
                      </div>
                      {/* Annotation pins */}
                      <div className="absolute top-6 right-8 w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shadow-md shadow-primary/25 border-2 border-white">1</div>
                      <div className="absolute top-16 left-1/3 w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shadow-md shadow-primary/25 border-2 border-white">2</div>
                      <div className="absolute bottom-8 right-1/4 w-6 h-6 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md shadow-green-500/25 border-2 border-white">3</div>
                    </div>
                  </div>
                </div>

                {/* Sidebar — comments */}
                <div className="hidden md:flex w-72 lg:w-80 border-l border-slate-200 flex-col bg-white">
                  {/* Tabs */}
                  <div className="flex border-b border-slate-200 text-xs font-medium">
                    <div className="flex-1 py-2.5 text-center text-primary border-b-2 border-primary">Annotations (3)</div>
                    <div className="flex-1 py-2.5 text-center text-slate-400">Messages</div>
                    <div className="flex-1 py-2.5 text-center text-slate-400">Invoices</div>
                  </div>
                  {/* Comment thread */}
                  <div className="flex-1 p-3 space-y-3 overflow-hidden">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="text-[11px] text-slate-500 mb-1">Sarah &middot; 2m ago</p>
                        <div className="bg-slate-100 rounded-lg rounded-tl-sm px-3 py-2 text-xs text-slate-700">
                          This heading is too small on mobile. Can we bump it up?
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 flex-row-reverse">
                      <div className="w-5 h-5 rounded-full bg-slate-300 text-white text-[9px] flex items-center justify-center font-bold shrink-0 mt-0.5">Y</div>
                      <div className="text-right">
                        <p className="text-[11px] text-slate-500 mb-1">You &middot; 1m ago</p>
                        <div className="bg-primary text-white rounded-lg rounded-tr-sm px-3 py-2 text-xs text-left">
                          Good catch — fixed and deployed. Take a look!
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="text-[11px] text-slate-500 mb-1">Sarah &middot; just now</p>
                        <div className="bg-slate-100 rounded-lg rounded-tl-sm px-3 py-2 text-xs text-slate-700">
                          Love it. Can we also change the CTA color?
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input */}
                  <div className="p-3 border-t border-slate-200">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-400">Reply...</div>
                      <div className="bg-primary text-white rounded-lg px-2.5 py-1.5 text-xs font-medium">Send</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get — 3 sections, not a feature grid */}
      <section className="py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">

          {/* 1. Visual feedback */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Feedback pinned to the pixel
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                Your client sees their live website inside Builtframe. They click anywhere to drop
                a pin and type what they want changed. Each pin becomes a conversation thread
                with status tracking — open, in progress, resolved.
              </p>
              <p className="text-slate-500 mt-3 leading-relaxed">
                No more &quot;the thing on the left side, kinda near the top&quot; emails.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <div className="space-y-3">
                {[
                  { n: 1, status: 'open', color: 'bg-amber-100 text-amber-700', author: 'Client', text: 'Logo needs to be bigger here', time: '2h ago' },
                  { n: 2, status: 'in progress', color: 'bg-blue-100 text-blue-700', author: 'Client', text: 'Wrong phone number in footer', time: '1h ago' },
                  { n: 3, status: 'resolved', color: 'bg-green-100 text-green-700', author: 'Client', text: 'Love the new hero section!', time: '30m ago' },
                ].map((item) => (
                  <div key={item.n} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-100">
                    <span className={`w-6 h-6 rounded-full ${item.n === 3 ? 'bg-green-500' : 'bg-primary'} text-white text-xs flex items-center justify-center font-bold`}>
                      {item.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 truncate">{item.text}</p>
                      <p className="text-xs text-slate-400">{item.author} &middot; {item.time}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Messaging */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="order-2 lg:order-1 bg-slate-50 rounded-xl border border-slate-200 p-5">
              <div className="space-y-2.5">
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-slate-100 text-slate-700 px-3.5 py-2 rounded-xl rounded-bl-sm text-sm max-w-[75%]">
                    Hey, the homepage looks great. Two quick things before launch —
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-primary text-white px-3.5 py-2 rounded-xl rounded-br-sm text-sm max-w-[75%]">
                    Sure, what&apos;s up?
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-slate-100 text-slate-700 px-3.5 py-2 rounded-xl rounded-bl-sm text-sm max-w-[75%]">
                    Can we swap the testimonial photo? And the contact form needs a phone field.
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-primary text-white px-3.5 py-2 rounded-xl rounded-br-sm text-sm max-w-[75%]">
                    Done and done. I&apos;ll push both today.
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Messaging that stays with the project
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                Real-time chat built into every project. Messages show up instantly — no
                refresh needed. When your client is offline, they get an email notification.
              </p>
              <p className="text-slate-500 mt-3 leading-relaxed">
                Everything stays in one thread, tied to the project. Not buried in your inbox.
              </p>
            </div>
          </div>

          {/* 3. Invoicing */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Send invoices, get paid
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                Create invoices right inside the project. Your client sees them in their portal
                and pays with Stripe. Track what&apos;s been sent, what&apos;s paid, and what&apos;s overdue.
              </p>
              <p className="text-slate-500 mt-3 leading-relaxed">
                No separate billing tool. No &quot;check your email for the invoice&quot; messages.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <div className="space-y-3">
                <div className="bg-white rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Homepage redesign</span>
                    <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Paid</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">$2,500</span>
                  <p className="text-xs text-slate-400 mt-1">Paid Jan 15</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Phase 2 — Blog + CMS</span>
                    <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Sent</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">$1,800</span>
                  <p className="text-xs text-slate-400 mt-1">Due Feb 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Pricing</h2>
            <p className="text-slate-500 mt-3">Start free, upgrade when you need to.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 flex flex-col ${
                  plan.highlighted
                    ? 'bg-slate-900 text-white ring-2 ring-primary'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <h3 className={`text-base font-semibold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-0.5">
                  <span className={`text-3xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mt-1.5 ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={15} className={`shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary-light' : 'text-slate-400'}`} />
                      <span className={plan.highlighted ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-5 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Built by a developer, for developers.
          </h2>
          <p className="text-slate-500 mt-4">
            Stop juggling email, Slack, Google Docs, and Stripe for every project.
            Give your client one link and keep everything in one place.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium mt-8"
          >
            Try Builtframe free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Builtframe</span>
          <div className="flex items-center gap-6">
            <a href="#pricing" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Pricing</a>
            <Link href="/login" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
