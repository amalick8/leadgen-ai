import { LeadCard } from "@/components/business/lead-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getAvailableLeads } from "@/lib/actions/business";

export default async function AvailableLeadsPage() {
  const leads = await getAvailableLeads();
  return <><PageHeader title="Available leads" description="Only server-side eligible leads are shown. Contact details stay masked until purchase." />{leads.length ? <div className="grid gap-5 lg:grid-cols-2">{leads.map((lead: any) => <LeadCard key={lead.id} lead={lead} detailHref={`/business/leads/${lead.id}`} />)}</div> : <EmptyState title="No eligible leads" body="Try expanding your services, cities, or ZIP codes in onboarding." actionHref="/business/onboarding" actionLabel="Update matching" />}</>;
}
