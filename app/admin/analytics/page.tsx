import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/card";
import { adminCounts, getAll } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/leads/utils";

export default async function AdminAnalyticsPage() {
  const [counts, leads, payments] = await Promise.all([adminCounts(), getAll("leads"), getAll("payments")]);
  const purchased = leads.filter((lead: any) => lead.status === "purchased").length;
  const avg = leads.length ? Math.round(leads.reduce((sum: number, lead: any) => sum + lead.price_cents, 0) / leads.length) : 0;
  return <><PageHeader title="Analytics" description="Simple marketplace analytics for launch operations." /><div className="grid gap-4 md:grid-cols-4"><StatCard label="Lead conversion" value={`${leads.length ? Math.round((purchased / leads.length) * 100) : 0}%`} /><StatCard label="Average price" value={formatPrice(avg)} /><StatCard label="Expired leads" value={leads.filter((lead: any) => lead.status === "expired").length} /><StatCard label="Succeeded revenue" value={formatPrice(counts.revenue)} /></div><div className="mt-8 rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold">Revenue events</h2><div className="mt-4 grid gap-3">{payments.map((payment: any) => <div key={payment.id} className="flex justify-between rounded-lg bg-slate-50 p-3"><span>{new Date(payment.created_at).toLocaleDateString()}</span><span className="font-bold">{formatPrice(payment.amount_cents)}</span></div>)}</div></div></>;
}
