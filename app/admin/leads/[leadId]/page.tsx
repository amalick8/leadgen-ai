import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { getAll } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/leads/utils";

export default async function AdminLeadDetail({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const lead = (await getAll("leads")).find((item: any) => item.id === leadId);
  if (!lead) notFound();
  return <><PageHeader title={`${lead.services?.name} in ${lead.city}`} description="Full lead details and marketplace metadata." /><Card><div className="flex justify-between"><h2 className="text-2xl font-black">{lead.name}</h2><StatusBadge status={lead.status} /></div><dl className="mt-6 grid gap-4 md:grid-cols-3"><div><dt className="font-bold text-slate-500">Contact</dt><dd>{lead.phone}<br />{lead.email}</dd></div><div><dt className="font-bold text-slate-500">Location</dt><dd>{lead.city}, {lead.zip_code}</dd></div><div><dt className="font-bold text-slate-500">Price</dt><dd>{formatPrice(lead.price_cents)} · Score {lead.lead_score}</dd></div></dl><p className="mt-6 leading-7">{lead.description}</p><pre className="mt-6 overflow-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify({ source_page: lead.source_page, duplicate_key: lead.duplicate_key, expires_at: lead.expires_at, purchases: lead.lead_purchases }, null, 2)}</pre></Card></>;
}
