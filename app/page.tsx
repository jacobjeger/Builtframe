'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  Pin,
  CreditCard,
  Link2,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  Send,
  MousePointerClick,
  Shield,
  Check,
  Star,
  Menu,
  X,
  Zap,
} from 'lucide-react';

const faqs = [
  {
    q: 'What is Builtframe?',
    a: 'Builtframe is an all-in-one client portal for freelance developers and small agencies. It lets your clients preview their website, leave visual feedback, message you, and pay invoices — all from a single link.',
  },
  {
    q: 'How do clients access their portal?',
    a: 'Clients receive a magic link via email. They click it and instantly access their project portal — no signup or password required.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes! The free plan includes 1 project with basic annotations and messaging. Perfect for trying Builtframe on a single project.',
  },
  {
    q: 'Can clients leave feedback on mobile?',
    a: 'Yes. The client portal is fully responsive. Clients can browse their site preview, leave annotations, and message you from any device.',
  },
  {
    q: 'How does invoicing work?',
    a: 'Create invoices directly inside a project and send them to your client. They can pay via Stripe with one click, right inside their portal.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. We use Supabase (built on PostgreSQL) with row-level security, and magic links expire after use.',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Try Builtframe on a single project',
    features: ['1 project', 'Visual annotations', 'Real-time messaging', 'Client magic link'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Solo',
    price: '$19',
    period: '/mo',
    description: 'For freelancers managing a few clients',
    features: [
      '5 projects',
      'Everything in Free',
      'Email notifications',
      'Annotation history',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    description: 'For growing studios and agencies',
    features: [
      '20 projects',
      'Everything in Solo',
      'Invoicing & Stripe payments',
      'Custom branding',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/mo',
    description: 'For teams that need full control',
    features: [
      'Unlimited projects',
      'Everything in Pro',
      'Team members & roles',
      'White-label portal',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
            Builtframe
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm shadow-primary/20"
            >
              Get Started
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 py-2">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 py-2">How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 py-2">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 py-2">FAQ</a>
            <hr className="border-slate-100" />
            <Link href="/login" className="block text-sm text-slate-600 py-2">Sign in</Link>
            <Link href="/signup" className="block text-sm bg-primary text-white text-center px-5 py-2.5 rounded-lg font-medium">Get Started</Link>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6 border border-white/10">
              <Zap size={14} />
              The client portal built for developers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              One link. Full{' '}
              <span className="gradient-text">client visibility.</span>
            </h1>

            <p className="text-lg text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
              Your clients see their live website, leave visual feedback directly on it,
              message you in real-time, and pay invoices — all from a single link. No more juggling tools.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-base shadow-lg shadow-primary/25"
              >
                Start for free <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-7 py-3.5 rounded-lg hover:bg-white/20 transition-colors font-medium text-base border border-white/10"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Product mockup */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-1 shadow-2xl">
              <div className="bg-slate-700/80 rounded-t-lg px-4 py-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-500/60" />
                </div>
                <div className="flex-1 bg-slate-600/50 rounded px-3 py-1 text-xs text-slate-400 text-center">
                  app.builtframe.com/dashboard
                </div>
              </div>
              <div className="bg-slate-900/80 rounded-b-lg p-6 min-h-[280px] flex gap-4">
                <div className="hidden sm:block w-40 space-y-3">
                  <div className="h-6 bg-primary/20 rounded w-24" />
                  <div className="space-y-2 mt-4">
                    <div className="h-4 bg-slate-700 rounded w-full" />
                    <div className="h-4 bg-primary/30 rounded w-full" />
                    <div className="h-4 bg-slate-700 rounded w-28" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 bg-slate-700 rounded flex-1" />
                    <div className="h-8 bg-primary/40 rounded w-24" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-slate-800 rounded-lg p-3 border border-slate-700/50">
                        <div className="h-3 bg-slate-600 rounded w-3/4 mb-2" />
                        <div className="h-2 bg-slate-700 rounded w-1/2 mb-3" />
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-400/60" />
                          <div className="h-2 bg-slate-700 rounded w-10" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative bg-slate-800 rounded-lg p-4 border border-slate-700/50 h-28">
                    <div className="h-2 bg-slate-700 rounded w-full mb-2" />
                    <div className="h-2 bg-slate-700 rounded w-4/5 mb-2" />
                    <div className="h-2 bg-slate-700 rounded w-3/5" />
                    <div className="absolute top-3 right-8 w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">1</div>
                    <div className="absolute bottom-6 left-1/3 w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">1,200+</p>
            <p className="text-sm text-slate-500 mt-1">Projects managed</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">50,000+</p>
            <p className="text-sm text-slate-500 mt-1">Annotations resolved</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <p className="text-3xl font-bold text-slate-900">4.9</p>
              <Star size={20} className="text-amber-400 fill-amber-400" />
            </div>
            <p className="text-sm text-slate-500 mt-1">Average rating</p>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How it Works</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Up and running in minutes</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Three simple steps to give your clients a professional feedback experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: '01', icon: FolderPlus, title: 'Create a project', desc: 'Add your client\'s name, email, and website URL. Builtframe generates a unique portal instantly.' },
              { step: '02', icon: Send, title: 'Share the magic link', desc: 'Your client receives an email with a one-click link. No signup, no password — they\'re in.' },
              { step: '03', icon: MousePointerClick, title: 'Collect feedback', desc: 'Clients click anywhere on their live site to leave feedback. You see it instantly with full context.' },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="text-5xl font-extrabold text-slate-100 mb-4">{item.step}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Everything you need, nothing you don&apos;t</h2>
          </div>

          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Pin className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Visual annotations</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Your clients click anywhere on their live website to leave pinned feedback. Each annotation starts a comment thread — like Google Docs comments, but for websites.
              </p>
              <ul className="space-y-2">
                {['Pin feedback to exact locations', 'Threaded comment discussions', 'Status tracking: open, in progress, resolved'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="relative bg-slate-50 rounded-lg h-52 flex items-center justify-center">
                <div className="text-center text-slate-300 text-sm">Website preview</div>
                <div className="absolute top-6 right-12 w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-primary/30">1</div>
                <div className="absolute bottom-10 left-16 w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-primary/30">2</div>
                <div className="absolute top-1/2 left-1/2 w-7 h-7 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-green-500/30">3</div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="order-2 lg:order-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 mb-1">Sarah (Client)</span>
                  <div className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-[70%]">Can we make the hero section bigger?</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 mb-1">You</span>
                  <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm max-w-[70%]">Absolutely! I&apos;ll increase the padding and font size. Should be live by tomorrow.</div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 mb-1">Sarah (Client)</span>
                  <div className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-[70%]">Perfect, thanks!</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-time messaging</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                No more email threads or scattered Slack channels. Chat with your client right inside their project portal with instant message delivery.
              </p>
              <ul className="space-y-2">
                {['Instant real-time delivery', 'Messages tied to the project', 'Email notifications for offline clients'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Link2 className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Magic link client portal</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Your client gets one link. They click it and land on their personalized portal — no signup, no password, no friction.
              </p>
              <ul className="space-y-2">
                {['Zero-friction client access', 'Secure magic link authentication', 'Branded portal per project'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="text-primary" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Client Portal</p>
                  <p className="text-xs text-slate-400">Acme Corp Website Redesign</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Pin size={14} className="text-primary" />
                  <span className="text-xs text-slate-600">3 annotations</span>
                  <span className="text-xs text-green-500 ml-auto">2 resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-primary" />
                  <span className="text-xs text-slate-600">12 messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-primary" />
                  <span className="text-xs text-slate-600">1 invoice pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Website Redesign — Phase 1</p>
                    <p className="text-xs text-slate-400">Due: Mar 15, 2026</p>
                  </div>
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">Sent</span>
                </div>
                <div className="flex items-center justify-between px-3">
                  <span className="text-2xl font-bold text-slate-900">$2,500.00</span>
                  <span className="text-xs bg-primary text-white px-4 py-2 rounded-lg font-medium">Pay Now</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Invoicing & payments</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Create and send invoices without leaving the portal. Your clients pay via Stripe with one click. No separate billing tool needed.
              </p>
              <ul className="space-y-2">
                {['One-click Stripe payments', 'Track paid, sent, and overdue invoices', 'Invoice history per project'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Start free. Upgrade when you need more projects or features.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.popular
                    ? 'bg-slate-900 text-white ring-2 ring-primary shadow-xl'
                    : 'bg-white border border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-lg font-semibold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={`shrink-0 ${plan.popular ? 'text-primary-light' : 'text-primary'}`} />
                      <span className={plan.popular ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-6 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="hero-gradient py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to streamline your client workflow?</h2>
          <p className="text-slate-300 mt-4 max-w-lg mx-auto">
            Join developers who&apos;ve replaced email threads, Slack channels, and scattered tools with one simple portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg hover:bg-primary-dark transition-colors font-semibold shadow-lg shadow-primary/25"
            >
              Get started for free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">Builtframe</span>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                The client portal built for developers who build for clients.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li><a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-12 pt-8 text-center">
            <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Builtframe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
