import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { getMyPurchasedLeads } from "@/lib/actions/business";

export default async function MyLeadsPage() {
  const purchases = await getMyPurchasedLeads();
  return <><PageHeader title="My leads" description="Purchased lead contact details, pipeline status, and CRM notes." />{purchases.length ? <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Lead</th><th className="p-3">Contact</th><th className="p-3">Status</th><th className="p-3">Purchased</th></tr></thead><tbody>{purchases.map((purchase: any) => <tr key={purchase.id} className="border-t"><td className="p-3"><Link className="font-bold text-indigo-600" href={`/business/my-leads/${purchase.lead_id}`}>{purchase.leads?.services?.name} in {purchase.leads?.city}</Link><p className="text-slate-500">{purchase.leads?.description}</p></td><td className="p-3">{purchase.leads?.name}<br />{purchase.leads?.phone}<br />{purchase.leads?.email}</td><td className="p-3"><StatusBadge status={purchase.business_lead_statuses?.[0]?.status ?? "new"} /></td><td className="p-3">{new Date(purchase.purchased_at).toLocaleDateString()}</td></tr>)}</tbody></table></div> : <EmptyState title="No purchased leads" body="Buy a matching lead to unlock full contact details and CRM tools." actionHref="/business/leads" actionLabel="Browse leads" />}</>;
}
