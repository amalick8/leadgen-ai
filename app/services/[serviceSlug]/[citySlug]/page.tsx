import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";

function cityName(slug: string) { return slug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" "); }

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string; citySlug: string }> }): Promise<Metadata> {
  const { serviceSlug, citySlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  const city = cityName(citySlug);
  return { title: `${service?.name ?? "Service"} in ${city} | LeadFlow AI`, description: `Submit your ${service?.name.toLowerCase() ?? "service"} request and get matched with trusted local professionals in ${city}.` };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ serviceSlug: string; citySlug: string }> }) {
  const { serviceSlug, citySlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();
  const city = cityName(citySlug);
  return <><Navbar /><main><SectionWrapper className="grid gap-10 lg:grid-cols-2"><div><p className="font-bold text-indigo-600">{service.name} in {city}</p><h1 className="mt-3 text-5xl font-black">Get matched with trusted {service.name.toLowerCase()} pros in {city}</h1><p className="mt-5 text-lg leading-8 text-slate-600">Tell us what you need once. LeadFlow AI routes qualified requests to local professionals who serve {city} and nearby ZIP codes.</p><div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white"><h2 className="text-2xl font-bold">Local fit matters.</h2><p className="mt-2 text-slate-300">Businesses only see leads that match their selected services and service areas.</p></div></div><LeadForm services={services} selectedSlug={service.slug} sourcePage={`/services/${service.slug}/${citySlug}`} /></SectionWrapper></main><Footer /></>;
}
