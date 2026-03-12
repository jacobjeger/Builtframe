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
        {/* Decorative glow blobs */}
        <div className="glow-blob w-[500px] h-[500px] bg-primary/30 -top-32 -right-32" />
        <div className="glow-blob w-[400px] h-[400px] bg-accent/20 bottom-0 -left-20" />
        <div className="glow-blob w-[300px] h-[300px] bg-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

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
                <div key={item.text} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                    <item.icon size={20} className="text-blue-300" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Builtframe
          </p>
        </div>
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
