import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { getAll } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/leads/utils";

export default async function AdminPaymentsPage() {
  const payments = await getAll("payments");
  return <><PageHeader title="Payments" description="Stripe Checkout session and lead purchase payment records." /><div className="overflow-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Amount</th><th className="p-3">Business</th><th className="p-3">Lead</th><th className="p-3">Stripe</th><th className="p-3">Status</th></tr></thead><tbody>{payments.map((payment: any) => <tr key={payment.id} className="border-t"><td className="p-3 font-bold">{formatPrice(payment.amount_cents, payment.currency)}</td><td className="p-3">{payment.businesses?.business_name}</td><td className="p-3">{payment.leads?.city}</td><td className="p-3 font-mono text-xs">{payment.stripe_checkout_session_id}<br />{payment.stripe_payment_intent_id}</td><td className="p-3"><StatusBadge status={payment.status} /></td></tr>)}</tbody></table></div></>;
}
