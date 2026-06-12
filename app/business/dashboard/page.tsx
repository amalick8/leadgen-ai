import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getAvailableLeads, getMyPurchasedLeads } from "@/lib/actions/business";

export default async function BusinessDashboard() {
  const [available, purchased] = await Promise.all([getAvailableLeads(), getMyPurchasedLeads()]);
  const statuses = purchased.map((item: any) => item.business_lead_statuses?.[0]?.status ?? "new");
  return <><PageHeader title="Business dashboard" description="Track matching inventory, purchases, and pipeline health." /><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6"><StatCard label="Available" value={available.length} /><StatCard label="Purchased" value={purchased.length} /><StatCard label="New" value={statuses.filter((s: string) => s === "new").length} /><StatCard label="Contacted" value={statuses.filter((s: string) => s === "contacted").length} /><StatCard label="Quoted" value={statuses.filter((s: string) => s === "quoted").length} /><StatCard label="Won" value={statuses.filter((s: string) => s === "won").length} /></div><div className="mt-8">{available.length ? <div className="grid gap-4 md:grid-cols-2">{available.slice(0, 4).map((lead: any) => <Link key={lead.id} href={`/business/leads/${lead.id}`} className="rounded-xl border border-slate-200 bg-white p-5 font-semibold hover:border-indigo-300">{lead.services?.name} in {lead.city}<span className="block text-sm font-normal text-slate-500">Score {lead.lead_score} · {lead.urgency}</span></Link>)}</div> : <EmptyState title="No matching leads yet" body="When new leads match your services and service areas, they will appear here." actionHref="/business/onboarding" actionLabel="Review service areas" />}</div></>;
}
