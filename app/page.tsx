import Link from 'next/link';
import { ArrowRight, MessageSquare, Pin, CreditCard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold text-indigo-600">Builtframe</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          The client portal where your{' '}
          <span className="text-indigo-600">product lives inside</span>
        </h1>
        <p className="text-xl text-gray-500 mt-6 max-w-2xl mx-auto">
          One link for your client. They see their live website, leave feedback directly on it,
          message you, and pay invoices — all in one place.
        </p>
        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            Start for free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Pin className="text-indigo-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Visual Feedback</h3>
            <p className="text-sm text-gray-500">
              Clients click anywhere on their live site to leave pinned feedback — like Google Docs comments, but for websites.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="text-indigo-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Built-in Messaging</h3>
            <p className="text-sm text-gray-500">
              Real-time chat right inside the portal. No more email threads or Slack channels per client.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-indigo-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Invoicing</h3>
            <p className="text-sm text-gray-500">
              Send invoices and get paid without leaving the portal. Clients pay via Stripe with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-sm text-gray-400">Builtframe — Built for developers who build for clients.</p>
      </footer>
    </div>
  );
}
