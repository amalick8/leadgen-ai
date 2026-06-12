import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";

export const metadata: Metadata = {
  title: "Services | LeadFlow AI",
  description: "Browse local service request categories on LeadFlow AI.",
};

const fallbackServices = [
  { name: "AC Repair", description: "Cooling problems, tune-ups, emergency HVAC, and same-day repair requests.", slug: "ac-repair" },
  { name: "Plumbing", description: "Leaks, clogs, water heaters, fixtures, and urgent plumbing help.", slug: "plumbing" },
  { name: "Roofing", description: "Storm damage, leak inspection, roof replacement, and repair estimates.", slug: "roofing" },
  { name: "Electrical", description: "Panel issues, outages, fixture installs, and licensed electrician requests.", slug: "emergency-electrician" },
  { name: "Landscaping", description: "Yard cleanups, lawn care, maintenance, and outdoor project help.", slug: "landscaping" },
  { name: "Garage Door Repair", description: "Broken springs, opener issues, off-track doors, and safety inspections.", slug: "garage-door-repair" },
];

export default async function ServicesPage() {
  const services = await getActiveServices();
  const displayedServices = services.length
    ? services.map((service) => ({ name: service.name, description: service.description, slug: service.slug, live: true }))
    : fallbackServices.map((service) => ({ ...service, live: false }));

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,#dbeafe_0,transparent_32%),radial-gradient(circle_at_85%_10%,#ccfbf1_0,transparent_25%)]" />
          <SectionWrapper className="relative py-16 sm:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                <Sparkles size={16} /> Service request categories
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Find the right local pro for the job.</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Pick a service, tell us what is happening, and LeadFlow AI routes your request to contractors who serve your city or ZIP code.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
                {["Free to submit", "No homeowner account", "Consent-first routing"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                    <CheckCircle2 className="text-emerald-500" size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper>
          <div className="grid gap-5 md:grid-cols-3">
            {displayedServices.map((service) => (
              <Card key={service.slug} className="rounded-2xl transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <ShieldCheck size={21} />
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                    Local match
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-black">{service.name}</h2>
                <p className="mt-2 min-h-20 text-sm leading-6 text-slate-600">{service.description}</p>
                <Button className="mt-5 w-full" href={service.live ? `/services/${service.slug}` : "/#lead-form"} variant="secondary">
                  Start request <ArrowRight size={16} />
                </Button>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Clock3 size={22} />
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-950">Need something not listed?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">Use the general form and describe the project. Admins can add more service categories as the marketplace grows.</p>
              </div>
              <Button href="/#lead-form">Submit request</Button>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
