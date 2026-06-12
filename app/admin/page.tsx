import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/card";
import { adminCounts, getAll } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/leads/utils";

export default async function AdminDashboard() {
  const [counts, leads, payments] = await Promise.all([adminCounts(), getAll("leads"), getAll("payments")]);
  return <><PageHeader title="Admin dashboard" description="Marketplace health, lead inventory, payments, and operational activity." /><div className="grid gap-4 md:grid-cols-4"><StatCard label="Total leads" value={counts.leads} /><StatCard label="Active businesses" value={counts.businesses} /><StatCard label="Revenue" value={formatPrice(counts.revenue)} /><StatCard label="Payments" value={payments.length} /></div><div className="mt-8 grid gap-6 lg:grid-cols-2"><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold">Recent leads</h2><div className="mt-4 space-y-3">{leads.slice(0, 6).map((lead: any) => <a key={lead.id} href={`/admin/leads/${lead.id}`} className="block rounded-lg border border-slate-100 p-3 hover:bg-slate-50">{lead.name} · {lead.services?.name}<span className="block text-sm text-slate-500">{lead.city}, {lead.zip_code} · {lead.status}</span></a>)}</div></section><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold">Recent payments</h2><div className="mt-4 space-y-3">{payments.slice(0, 6).map((payment: any) => <div key={payment.id} className="rounded-lg border border-slate-100 p-3">{formatPrice(payment.amount_cents)} · {payment.status}<span className="block text-sm text-slate-500">{payment.stripe_checkout_session_id ?? "No session yet"}</span></div>)}</div></section></div></>;
}
