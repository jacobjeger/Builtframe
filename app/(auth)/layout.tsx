import Link from 'next/link';
import { Pin, MessageSquare, CreditCard } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left branded panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
            Builtframe
          </Link>

          <div className="space-y-8">
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
              The client portal where feedback meets delivery.
            </h2>
            <div className="space-y-5">
              {[
                { icon: Pin, text: 'Visual annotations directly on live websites' },
                { icon: MessageSquare, text: 'Real-time messaging with clients' },
                { icon: CreditCard, text: 'Invoicing and payments via Stripe' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-blue-300" />
                  </div>
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Builtframe
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Builtframe
            </Link>
            <p className="text-slate-500 mt-2 text-sm">Client portal for developers</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
