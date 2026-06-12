import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, Textarea } from "@/components/ui/form";
import { PageHeader } from "@/components/ui/page-header";
import { getMyPurchasedLeads, saveBusinessLeadNotes, saveBusinessLeadStatus } from "@/lib/actions/business";

export default async function PurchasedLeadDetail({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const purchases = await getMyPurchasedLeads();
  const purchase = purchases.find((item: any) => item.lead_id === leadId);
  if (!purchase) notFound();
  const lead = purchase.leads;
  const crm = purchase.business_lead_statuses?.[0] ?? {};
  return <><PageHeader title={`${lead.services?.name} lead`} description="Full contact details are available because your business purchased this lead." /><Card><dl className="grid gap-4 md:grid-cols-2"><div><dt className="font-bold text-slate-500">Homeowner</dt><dd>{lead.name}<br />{lead.phone}<br />{lead.email}</dd></div><div><dt className="font-bold text-slate-500">Project</dt><dd>{lead.city}, {lead.zip_code}<br />Preference: {lead.contact_preference}</dd></div></dl><p className="mt-6 leading-7">{lead.description}</p></Card><div className="mt-6 grid gap-6 md:grid-cols-2"><Card><h2 className="text-xl font-bold">Pipeline status</h2><form action={saveBusinessLeadStatus} className="mt-4 flex gap-3"><input type="hidden" name="leadId" value={lead.id} /><Select name="status" defaultValue={crm.status ?? "new"}><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="won">Won</option><option value="lost">Lost</option></Select><Button>Save</Button></form></Card><Card><h2 className="text-xl font-bold">Notes</h2><form action={saveBusinessLeadNotes} className="mt-4 grid gap-3"><input type="hidden" name="leadId" value={lead.id} /><Textarea name="notes" defaultValue={crm.notes ?? ""} /><Button>Save notes</Button></form></Card></div></>;
}
