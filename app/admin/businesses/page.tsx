import { getAll, updateBusinessActiveStatus } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";

export default async function AdminBusinessesPage() {
  const businesses = await getAll("businesses");
  return <><PageHeader title="Businesses" description="Manage contractor onboarding, activation, and marketplace access." /><div className="grid gap-4">{businesses.map((business: any) => <div key={business.id} className="rounded-xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><a href={`/admin/businesses/${business.id}`} className="text-xl font-bold text-indigo-600">{business.business_name}</a><p className="text-sm text-slate-500">{business.owner_name} · {business.email} · {business.phone}</p><p className="mt-2 text-sm text-slate-600">{business.service_area_cities?.join(", ")} {business.service_area_zips?.join(", ")}</p></div><div className="flex items-center gap-2"><StatusBadge status={business.active ? "active" : "inactive"} /><StatusBadge status={business.onboarding_completed ? "onboarded" : "incomplete"} /></div></div><form action={updateBusinessActiveStatus} className="mt-4 flex gap-2"><input type="hidden" name="businessId" value={business.id} /><Button size="sm" name="active" value="true" variant="secondary">Activate</Button><Button size="sm" name="active" value="false" variant="danger">Deactivate</Button></form></div>)}</div></>;
}
