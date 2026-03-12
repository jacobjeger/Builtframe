import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Invoice } from '@/types';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  draft: { label: 'Draft', icon: <Clock size={14} />, color: 'text-gray-500 bg-gray-100' },
  sent: { label: 'Sent', icon: <DollarSign size={14} />, color: 'text-blue-600 bg-blue-50' },
  paid: { label: 'Paid', icon: <CheckCircle size={14} />, color: 'text-green-600 bg-green-50' },
  overdue: { label: 'Overdue', icon: <AlertTriangle size={14} />, color: 'text-red-600 bg-red-50' },
};

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const status = statusConfig[invoice.status] || statusConfig.draft;
  const amount = (invoice.amount_cents / 100).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900">${amount} {invoice.currency.toUpperCase()}</p>
          {invoice.description && (
            <p className="text-sm text-gray-500 mt-1">{invoice.description}</p>
          )}
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
          {status.icon} {status.label}
        </span>
      </div>
      {invoice.due_date && (
        <p className="text-xs text-gray-400 mt-3">
          Due: {new Date(invoice.due_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
