import Image from "next/image";
import { ArrowRight, CheckCircle2, Gift, MapPinned, ShieldCheck, Sparkles, Star, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";
import homeownerMarketplaceHero from "./homeowner-marketplace-hero.png";

const cities = ["Dallas", "Fort Worth", "Arlington", "Plano", "Irving", "Frisco", "Richardson", "Garland"];
const steps = ["Tell us what happened", "We qualify and route it", "Matched pros review the fit", "You hear from local experts"];
const serviceExamples = [
  { name: "AC Repair", description: "Cooling problems, tune-ups, emergency HVAC, and same-day repair requests.", slug: "ac-repair" },
  { name: "Plumbing", description: "Leaks, clogs, water heaters, fixtures, and urgent plumbing help.", slug: "plumbing" },
  { name: "Roofing", description: "Storm damage, leak inspection, roof replacement, and repair estimates.", slug: "roofing" },
  { name: "Electrical", description: "Panel issues, outages, fixture installs, and licensed electrician requests.", slug: "emergency-electrician" },
  { name: "Landscaping", description: "Yard cleanups, lawn care, maintenance, and outdoor project help.", slug: "landscaping" },
  { name: "Garage Door", description: "Broken springs, opener issues, off-track doors, and safety inspections.", slug: "garage-door-repair" },
];

export default async function Home() {
  const services = await getActiveServices();
  const displayedServices = services.length
    ? services.slice(0, 6).map((service) => ({ name: service.name, description: service.description, slug: service.slug }))
    : serviceExamples;

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,#dbeafe_0,transparent_32%),radial-gradient(circle_at_90%_12%,#ccfbf1_0,transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
            <div>
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                <Sparkles size={16} /> Local marketplace OS
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Get matched with trusted local pros without the callback circus.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Submit one clean project request. LeadFlow AI routes it to qualified contractors who serve your area, understand the job, and can reach out with real next steps.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#lead-form" size="lg">Find a local pro <ArrowRight size={18} /></Button>
                <Button href="/contractors" variant="secondary" size="lg">Get local leads</Button>
              </div>
              <div className="mt-6 max-w-xl rounded-2xl border border-indigo-100 bg-white/85 p-4 shadow-sm backdrop-blur">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Gift size={20} /></span>
                  <div>
                    <p className="text-sm font-black text-slate-950">Launch treat for homeowners</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Matched customers are eligible for a $10 Amazon.com Gift Card after a verified local pro accepts the request.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["No account required", "Consent-first matching", "Local pros only"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="text-emerald-500" size={18} />{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
                <Image
                  src={homeownerMarketplaceHero}
                  alt="Homeowner getting matched with trusted local service professionals through LeadFlow AI"
                  priority
                  className="aspect-[16/10] w-full rounded-[1.45rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-white/80 bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/20">
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold sm:text-sm">
                  <span>Matched by area</span>
                  <span>Vetted request</span>
                  <span>Gift eligible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionWrapper className="grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Start here</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Tell us once. We route the request cleanly.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The form is built for real customers: fast, clear, privacy-aware, and specific enough that local pros can decide whether they are a good fit before contacting you.
            </p>
            <div className="mt-6 grid gap-3">
              {["Your contact details stay protected until a contractor unlocks the lead.", "You choose phone, email, or both.", "Your project gets scored and matched by service area."].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <LeadForm services={services} sourcePage="/" />
        </SectionWrapper>

        <section className="bg-white">
          <SectionWrapper>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Popular services</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">High-intent help for everyday home projects.</h2>
              </div>
              <Button href="/services" variant="secondary">Browse all services</Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {displayedServices.map((service) => (
                <Card key={service.slug} className="rounded-2xl transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                  <ShieldCheck className="text-indigo-600" />
                  <h3 className="mt-4 text-xl font-black">{service.name}</h3>
                  <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{service.description}</p>
                  <a className="mt-4 inline-flex items-center gap-2 text-sm font-black text-indigo-600" href={services.length ? `/services/${service.slug}` : "#lead-form"}>
                    Request {service.name} <ArrowRight size={16} />
                  </a>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper className="py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight">How it works</h2>
              <div className="mt-6 grid gap-4">
                {steps.map((step, index) => (
                  <Card key={step} className="flex items-center gap-4 rounded-2xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">{index + 1}</span>
                    <p className="font-bold">{step}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Popular markets</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {cities.map((city) => (
                  <span key={city} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    <MapPinned size={15} className="text-indigo-500" /> {city}
                  </span>
                ))}
              </div>
              <Card className="mt-6 rounded-2xl bg-slate-950 text-white">
                <div className="flex items-start gap-4">
                  <UsersRound className="text-cyan-200" />
                  <div>
                    <h3 className="text-2xl font-black">Built for trust, not lead spam.</h3>
                    <p className="mt-3 text-slate-300">Contractors see service, location, urgency, score, price, and a masked preview before deciding to buy.</p>
                  </div>
                </div>
              </Card>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-600">
                <Star className="fill-amber-400 text-amber-400" size={18} />
                Designed for a 48-hour launch path: connect Supabase, connect Stripe, test flows, deploy.
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
