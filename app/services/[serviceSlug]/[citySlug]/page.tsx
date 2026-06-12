import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPinned, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { Card } from "@/components/ui/card";
import { getActiveServices } from "@/lib/actions/public";

function cityName(slug: string) {
  return slug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string; citySlug: string }> }): Promise<Metadata> {
  const { serviceSlug, citySlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  const city = cityName(citySlug);
  return {
    title: `${service?.name ?? "Service"} in ${city} | LeadFlow AI`,
    description: `Submit your ${service?.name.toLowerCase() ?? "service"} request and get matched with trusted local professionals in ${city}.`,
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ serviceSlug: string; citySlug: string }> }) {
  const { serviceSlug, citySlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();
  const city = cityName(citySlug);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <SectionWrapper className="grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
              <MapPinned size={16} /> {service.name} in {city}
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Get matched with trusted {service.name.toLowerCase()} pros in {city}.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us what you need once. LeadFlow AI routes qualified requests to local professionals who serve {city} and nearby ZIP codes.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Matched by service area", "No homeowner account", "Consent-first contact", "Gift-card eligible match"].map((item) => (
                <Card key={item} className="rounded-2xl font-bold">
                  <CheckCircle2 className="mb-3 text-emerald-500" size={20} />
                  {item}
                </Card>
              ))}
            </div>
            <Card className="mt-6 rounded-2xl bg-slate-950 text-white">
              <div className="flex gap-4">
                <ShieldCheck className="shrink-0 text-cyan-200" />
                <div>
                  <h2 className="text-2xl font-black">Local fit matters.</h2>
                  <p className="mt-2 text-slate-300">Businesses only see leads that match their selected services and service areas.</p>
                </div>
              </div>
            </Card>
          </div>
          <LeadForm services={services} selectedSlug={service.slug} sourcePage={`/services/${service.slug}/${citySlug}`} />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
