import { expireLead, getAll, softDeleteLead, updateLeadStatus } from "@/lib/actions/admin";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form";
import { StatusBadge } from "@/components/ui/badge";

export default async function AdminLeadsPage() {
  const leads = await getAll("leads");
  return <><PageHeader title="Leads" description="View, expire, soft-delete, and update marketplace leads." /><div className="overflow-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Lead</th><th className="p-3">Contact</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead><tbody>{leads.map((lead: any) => <tr key={lead.id} className="border-t"><td className="p-3"><a className="font-bold text-indigo-600" href={`/admin/leads/${lead.id}`}>{lead.services?.name} in {lead.city}</a><p className="text-slate-500">{lead.description}</p></td><td className="p-3">{lead.name}<br />{lead.phone}<br />{lead.email}</td><td className="p-3"><StatusBadge status={lead.status} /></td><td className="p-3"><div className="flex flex-wrap gap-2"><form action={updateLeadStatus} className="flex gap-2"><input type="hidden" name="leadId" value={lead.id} /><Select name="status" defaultValue={lead.status}><option value="new">new</option><option value="purchased">purchased</option><option value="expired">expired</option><option value="deleted">deleted</option></Select><Button size="sm">Save</Button></form><form action={expireLead}><input type="hidden" name="leadId" value={lead.id} /><Button size="sm" variant="secondary">Expire</Button></form><form action={softDeleteLead}><input type="hidden" name="leadId" value={lead.id} /><Button size="sm" variant="danger">Delete</Button></form></div></td></tr>)}</tbody></table></div></>;
}
