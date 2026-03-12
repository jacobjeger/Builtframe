import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Invoice } from '@/types';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  draft: { label: 'Draft', icon: <Clock size={14} />, color: 'text-slate-500', bg: 'bg-slate-100' },
  sent: { label: 'Sent', icon: <DollarSign size={14} />, color: 'text-blue-600', bg: 'bg-blue-50' },
  paid: { label: 'Paid', icon: <CheckCircle size={14} />, color: 'text-green-600', bg: 'bg-green-50' },
  overdue: { label: 'Overdue', icon: <AlertTriangle size={14} />, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const status = statusConfig[invoice.status] || statusConfig.draft;
  const amount = (invoice.amount_cents / 100).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 card-glow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-bold text-slate-900">${amount} <span className="text-sm font-normal text-slate-400">{invoice.currency.toUpperCase()}</span></p>
          {invoice.description && (
            <p className="text-sm text-slate-500 mt-1">{invoice.description}</p>
          )}
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color} ${status.bg}`}>
          {status.icon} {status.label}
        </span>
      </div>
      {invoice.due_date && (
        <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
          Due: {new Date(invoice.due_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
