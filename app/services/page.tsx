import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ClipboardCheck, Gift, MapPinned, MessageSquareText, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";
import servicesMarketplaceHero from "./services-marketplace-hero.png";

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

const timeline = [
  {
    icon: ClipboardCheck,
    title: "Customer fills out one clean form",
    copy: "Tell us the service, timing, property type, location, and a few job details. It costs the customer nothing.",
  },
  {
    icon: MapPinned,
    title: "We find a nearby recommendation",
    copy: "LeadFlow AI routes the request to local professionals who match the service area and job type.",
  },
  {
    icon: MessageSquareText,
    title: "A qualified pro reaches out",
    copy: "The customer hears from a relevant professional using their preferred contact method.",
  },
  {
    icon: Wrench,
    title: "The service gets done",
    copy: "The pro has enough context to quote faster, show up prepared, and help solve the issue.",
  },
  {
    icon: Gift,
    title: "We send the gift-card reward",
    copy: "Matched customers are eligible for a $10 Amazon.com Gift Card after a verified match.",
  },
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
          <SectionWrapper className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                <Sparkles size={16} /> Free customer matching
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Tell us the job. We find the local pro.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Customers submit one no-cost request, get matched with a strong nearby recommendation, receive outreach from the pro, get the service done, and become eligible for a gift card.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/#lead-form">Start free request <ArrowRight size={18} /></Button>
                <Button href="/contractors" variant="secondary">I am a contractor</Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
                {["No cost to customer", "Nearby pros", "$10 gift-card eligible"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                    <CheckCircle2 className="text-emerald-500" size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
              <Image
                src={servicesMarketplaceHero}
                alt="Home service categories matched with trusted local professionals"
                priority
                className="aspect-[16/10] w-full rounded-[1.45rem] object-cover"
              />
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">A simple path from request to reward.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">The service page should feel obvious: fill out the form, get matched, hear from a great nearby pro, complete the service, and get the gift-card thank-you.</p>
          </div>
          <div className="relative mt-12">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-indigo-200 via-cyan-200 to-emerald-200 md:block" />
            <div className="grid gap-5">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="relative overflow-hidden rounded-2xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 md:ml-16">
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-400" />
                    <div className="flex gap-4">
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15 md:absolute md:-left-[4.7rem] md:top-5">
                        <Icon size={21} />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Step {index + 1}</p>
                        <h3 className="mt-2 text-xl font-black text-slate-950">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.copy}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        <section className="bg-white">
          <SectionWrapper>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Choose a service</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Start with the job type, then we pre-fill the form.</h2>
              </div>
              <Button href="/#lead-form" variant="secondary">Open general form</Button>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {displayedServices.map((service) => (
                <Card key={service.slug} className="rounded-2xl transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <ShieldCheck size={21} />
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">No cost</span>
                  </div>
                  <h2 className="mt-5 text-xl font-black">{service.name}</h2>
                  <p className="mt-2 min-h-20 text-sm leading-6 text-slate-600">{service.description}</p>
                  <Button className="mt-5 w-full" href={`/?service=${service.slug}#lead-form`} variant="secondary">
                    Request {service.name} <ArrowRight size={16} />
                  </Button>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </section>
      </main>
      <Footer />
    </>
  );
}
