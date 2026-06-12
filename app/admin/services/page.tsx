import { getAll, saveService } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/form";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/leads/utils";

export default async function AdminServicesPage() {
  const services = await getAll("services");
  return <><PageHeader title="Services" description="Create, update, activate, deactivate, and price service categories." /><div className="grid gap-6 lg:grid-cols-[380px_1fr]"><Card><h2 className="text-xl font-bold">Create or update</h2><form action={saveService} className="mt-4 grid gap-3"><Field label="Name"><Input name="name" /></Field><Field label="Slug"><Input name="slug" /></Field><Field label="Description"><Textarea name="description" /></Field><Field label="Default price dollars"><Input name="defaultPriceDollars" type="number" defaultValue="25" /></Field><label className="flex gap-2 text-sm"><input type="checkbox" name="active" defaultChecked /> Active</label><Button>Save service</Button></form></Card><div className="grid gap-3">{services.map((service: any) => <Card key={service.id} className="flex items-center justify-between gap-4"><div><h3 className="font-bold">{service.name}</h3><p className="text-sm text-slate-500">{service.slug} · {formatPrice(service.default_price_cents)}</p></div><StatusBadge status={service.active ? "active" : "inactive"} /></Card>)}</div></div></>;
}
