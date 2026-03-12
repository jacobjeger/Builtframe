'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Menu,
  X,
  Check,
  Pin,
  MessageSquare,
  CreditCard,
} from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Try it on your next project.',
    features: [
      '1 project',
      'Visual annotations',
      'Real-time messaging',
      'Client magic link',
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
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
];

const features = [
  {
    icon: Pin,
    title: 'Visual annotations',
    description: 'Clients click anywhere on their live site to leave feedback. Each pin becomes a threaded conversation with status tracking.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconBg: 'bg-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'Project messaging',
    description: 'Real-time chat built into every project. Messages show up instantly — no refresh, no switching apps.',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconBg: 'bg-emerald-500',
  },
  {
    icon: CreditCard,
    title: 'Invoicing',
    description: 'Create invoices inside the project. Clients see them in their portal and pay with Stripe. Track sent, paid, and overdue.',
    color: 'from-violet-500/10 to-purple-500/10',
    iconBg: 'bg-violet-500',
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

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all font-medium shadow-sm shadow-primary/25"
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
            <a href="#features" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Link href="/login" className="block text-sm text-slate-600 py-2">Sign in</Link>
            <Link href="/signup" className="block text-sm bg-primary text-white text-center px-4 py-2.5 rounded-lg font-medium">
              Try it free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-8 lg:pt-44 lg:pb-12 overflow-hidden">
        {/* Background glow */}
        <div className="glow-blob w-[600px] h-[600px] bg-primary/20 -top-40 left-1/2 -translate-x-1/2" />
        <div className="glow-blob w-[400px] h-[400px] bg-accent/15 top-20 -right-20" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Client portals for developers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Your clients click on their site.{' '}
            <span className="gradient-text">You see exactly what they mean.</span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-500 mt-6 leading-relaxed max-w-2xl mx-auto">
            Give each client a link to their project. They leave feedback directly
            on their live site, message you, and pay invoices — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl hover:bg-primary-dark transition-all font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Start for free <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-slate-600 px-7 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-medium"
            >
              See how it works
            </a>
          </div>

          <p className="text-sm text-slate-400 mt-5">Free plan available · No credit card required</p>
        </div>
      </section>

      {/* Product mockup */}
      <section className="pb-20 lg:pb-32">
        <div className="relative max-w-5xl mx-auto px-6">
          {/* Glow behind mockup */}
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent rounded-3xl blur-2xl -z-10" />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden">
            {/* Browser bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-slate-400 border border-slate-200 max-w-md mx-auto text-center">
                app.builtframe.com/projects/acme-redesign
              </div>
            </div>

            {/* Mockup content */}
            <div className="flex min-h-[340px] lg:min-h-[420px]">
              {/* Main preview area */}
              <div className="flex-1 p-4 bg-slate-50/50">
                <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
                  <div className="bg-slate-50 rounded-t-lg px-3 py-2 flex items-center gap-2 border-b border-slate-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                    <div className="text-[10px] text-slate-400 bg-white rounded px-2 py-0.5 border border-slate-100 flex-1 text-center">acme-corp.com</div>
                    <div className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-medium">Annotating</div>
                  </div>
                  {/* Fake website with pins */}
                  <div className="flex-1 p-5 relative">
                    <div className="h-3 bg-slate-900 rounded w-24 mb-4" />
                    <div className="h-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg w-3/4 mb-3" />
                    <div className="h-3 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-5/6 mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-2/3 mb-5" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50" />
                      <div className="h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100/50" />
                      <div className="h-20 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-100/50" />
                    </div>
                    {/* Annotation pins */}
                    <div className="absolute top-7 right-10 w-7 h-7 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-bold shadow-lg shadow-primary/30 border-2 border-white ring-2 ring-primary/20">1</div>
                    <div className="absolute top-[70px] left-1/3 w-7 h-7 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-bold shadow-lg shadow-primary/30 border-2 border-white ring-2 ring-primary/20">2</div>
                    <div className="absolute bottom-10 right-1/4 w-7 h-7 rounded-full bg-green-500 text-white text-[11px] flex items-center justify-center font-bold shadow-lg shadow-green-500/30 border-2 border-white ring-2 ring-green-500/20">3</div>
                  </div>
                </div>
              </div>

              {/* Sidebar — comments */}
              <div className="hidden md:flex w-72 lg:w-80 border-l border-slate-200 flex-col bg-white">
                <div className="flex border-b border-slate-200 text-xs font-medium">
                  <div className="flex-1 py-3 text-center text-primary border-b-2 border-primary bg-primary/5">Annotations (3)</div>
                  <div className="flex-1 py-3 text-center text-slate-400 hover:text-slate-500">Messages</div>
                  <div className="flex-1 py-3 text-center text-slate-400 hover:text-slate-500">Invoices</div>
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-hidden">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">1</div>
                    <div>
                      <p className="text-[11px] text-slate-500 mb-1">Sarah · 2m ago</p>
                      <div className="bg-slate-50 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-slate-700 border border-slate-100">
                        This heading is too small on mobile. Can we bump it up?
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">Y</div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-500 mb-1">You · 1m ago</p>
                      <div className="bg-primary text-white rounded-xl rounded-tr-sm px-3 py-2 text-xs text-left">
                        Good catch — fixed and deployed. Take a look!
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">2</div>
                    <div>
                      <p className="text-[11px] text-slate-500 mb-1">Sarah · just now</p>
                      <div className="bg-slate-50 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-slate-700 border border-slate-100">
                        Love it. Can we also change the CTA color to match the brand?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-200">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400">Reply...</div>
                    <div className="bg-primary text-white rounded-xl px-3 py-2 text-xs font-medium shadow-sm shadow-primary/20">Send</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — Bento grid */}
      <section id="features" className="py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything in one portal
            </h2>
            <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto">
              Your client gets a single link. Behind it: feedback tools, messaging, and invoicing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group relative bg-gradient-to-br ${feature.color} rounded-2xl border border-slate-200/60 p-7 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1`}
                >
                  <div className={`w-11 h-11 ${feature.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/80 to-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Simple pricing</h2>
            <p className="text-lg text-slate-500 mt-4">Start free, upgrade when you need more projects.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white shadow-xl shadow-primary/10 ring-2 ring-primary'
                    : 'bg-white border border-slate-200 hover:shadow-lg hover:shadow-slate-100'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-0.5">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-500 mt-2">{plan.description}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-7 block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/30'
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

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 hero-gradient relative overflow-hidden">
        <div className="glow-blob w-[500px] h-[500px] bg-primary/20 -top-40 -left-40" />
        <div className="glow-blob w-[400px] h-[400px] bg-accent/20 -bottom-20 -right-20" />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built by a developer,<br />for developers.
          </h2>
          <p className="text-slate-400 mt-5 text-lg leading-relaxed">
            Stop juggling email, Slack, and Google Docs for every project.
            Give your client one link. Keep everything in one place.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-7 py-3.5 rounded-xl font-semibold mt-9 hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Try Builtframe free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Builtframe</span>
            <span className="text-sm text-slate-300">·</span>
            <span className="text-sm text-slate-400">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Pricing</a>
            <Link href="/login" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
