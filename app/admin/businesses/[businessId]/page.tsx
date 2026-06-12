import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getAll } from "@/lib/actions/admin";

export default async function AdminBusinessDetail({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = (await getAll("businesses")).find((item: any) => item.id === businessId);
  if (!business) notFound();
  return <><PageHeader title={business.business_name} description="Business profile, service areas, and activation state." /><Card><dl className="grid gap-4 md:grid-cols-2"><div><dt className="font-bold text-slate-500">Owner</dt><dd>{business.owner_name}<br />{business.email}<br />{business.phone}</dd></div><div><dt className="font-bold text-slate-500">Areas</dt><dd>{business.service_area_cities?.join(", ")}<br />{business.service_area_zips?.join(", ")}</dd></div></dl><p className="mt-6">{business.description}</p></Card></>;
}
