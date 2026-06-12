import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { Card } from "@/components/ui/card";
import { getActiveServices } from "@/lib/actions/public";

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
  const { serviceSlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  return { title: service ? `${service.name} | LeadFlow AI` : "Service | LeadFlow AI", description: service?.description ?? "Submit a local service request." };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const { serviceSlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();
  return <><Navbar /><main><SectionWrapper className="grid gap-10 lg:grid-cols-2"><div><p className="font-bold text-indigo-600">{service.name}</p><h1 className="mt-3 text-5xl font-black">Get matched with trusted {service.name.toLowerCase()} pros.</h1><p className="mt-5 text-lg leading-8 text-slate-600">{service.description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Verified request intake", "Local pros only", "Clear contact consent", "Fast project routing"].map((item) => <Card key={item} className="font-semibold">{item}</Card>)}</div></div><LeadForm services={services} selectedSlug={service.slug} sourcePage={`/services/${service.slug}`} /></SectionWrapper></main><Footer /></>;
}
