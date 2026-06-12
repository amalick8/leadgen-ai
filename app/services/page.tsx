import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";

export const metadata: Metadata = { title: "Services | LeadFlow AI", description: "Browse local service request categories on LeadFlow AI." };

export default async function ServicesPage() {
  const services = await getActiveServices();
  return (
    <><Navbar /><main><SectionWrapper><h1 className="text-4xl font-black">Local services</h1><p className="mt-3 max-w-2xl text-slate-600">Submit one request and get matched with pros who serve your city or ZIP code.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{services.map((service) => <Card key={service.id}><h2 className="text-xl font-bold">{service.name}</h2><p className="mt-2 min-h-20 text-sm text-slate-600">{service.description}</p><Button className="mt-5" href={`/services/${service.slug}`} variant="secondary">Open service</Button></Card>)}</div></SectionWrapper></main><Footer /></>
  );
}
