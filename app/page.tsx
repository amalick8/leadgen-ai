import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { getActiveServices } from "@/lib/actions/public";

const cities = ["Dallas", "Fort Worth", "Arlington", "Plano", "Irving", "Frisco", "Richardson", "Garland"];
const steps = ["Submit one project request", "We qualify and score the lead", "Matched pros can buy access", "Homeowners hear from local experts"];

export default async function Home() {
  const services = await getActiveServices();
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),linear-gradient(135deg,#ffffff,#f8fafc)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700"><Sparkles size={16} /> Local marketplace OS</div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl">Qualified local service requests, matched with trusted pros.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Homeowners submit their project once. Local contractors buy verified, high-intent leads that match their services and service areas.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button href="#lead-form" size="lg">Find a local pro <ArrowRight size={18} /></Button><Button href="/contractors" variant="secondary" size="lg">Get local leads</Button></div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Masked until purchased", "Rule-based scoring", "Stripe checkout ready"].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 className="text-emerald-500" size={18} />{item}</div>)}
              </div>
            </div>
            <LeadForm services={services} sourcePage="/" />
          </div>
        </section>
        <SectionWrapper>
          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 6).map((service) => <Card key={service.id} className="transition hover:-translate-y-1 hover:shadow-lg"><ShieldCheck className="text-indigo-600" /><h3 className="mt-4 text-xl font-bold">{service.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p><a className="mt-4 inline-block text-sm font-bold text-indigo-600" href={`/services/${service.slug}`}>Request {service.name}</a></Card>)}
          </div>
        </SectionWrapper>
        <SectionWrapper className="pt-0">
          <div className="grid gap-10 lg:grid-cols-2">
            <div><h2 className="text-3xl font-black">How it works</h2><div className="mt-6 grid gap-4">{steps.map((step, index) => <Card key={step} className="flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">{index + 1}</span><p className="font-semibold">{step}</p></Card>)}</div></div>
            <div><h2 className="text-3xl font-black">Popular markets</h2><div className="mt-6 flex flex-wrap gap-3">{cities.map((city) => <span key={city} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{city}</span>)}</div><Card className="mt-6 bg-slate-950 text-white"><h3 className="text-2xl font-bold">Built for lead quality, not volume theater.</h3><p className="mt-3 text-slate-300">Contractors see service, location, urgency, score, price, and a masked preview before deciding to buy.</p></Card></div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
