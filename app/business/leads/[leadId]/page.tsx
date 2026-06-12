import { notFound } from "next/navigation";
import { redirectToCheckout } from "@/lib/actions/business";
import { getAvailableLeadDetailMasked } from "@/lib/actions/business";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/leads/utils";

export default async function AvailableLeadDetail({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const lead = await getAvailableLeadDetailMasked(leadId);
  if (!lead) notFound();
  return <><PageHeader title={`${lead.services?.name} in ${lead.city}`} description="Masked lead preview. Purchase through Stripe Checkout to unlock full contact details." /><Card><div className="flex flex-wrap justify-between gap-4"><div><p className="text-sm font-bold text-indigo-600">Lead score {lead.lead_score}</p><h2 className="mt-2 text-3xl font-black">{formatPrice(lead.price_cents)}</h2></div><StatusBadge status={lead.urgency} /></div><dl className="mt-6 grid gap-4 md:grid-cols-2"><div><dt className="text-sm font-bold text-slate-500">Contact</dt><dd>{lead.name} · {lead.phone} · {lead.email}</dd></div><div><dt className="text-sm font-bold text-slate-500">Location</dt><dd>{lead.city}, {lead.zip_code}</dd></div></dl><p className="mt-6 leading-7 text-slate-700">{lead.description}</p><form action={redirectToCheckout} className="mt-8"><input type="hidden" name="leadId" value={lead.id} /><Button>Buy this lead</Button></form></Card></>;
}
