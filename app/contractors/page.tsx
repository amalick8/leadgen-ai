import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  LockKeyhole,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import contractorMarketplaceHero from "./contractor-marketplace-hero.png";

export const metadata: Metadata = {
  title: "Get Local Leads | LeadFlow AI",
  description: "Buy qualified local service leads that match your business.",
};

const metrics = [
  { value: "72 hr", label: "typical lead freshness window" },
  { value: "100%", label: "service-area matched requests" },
  { value: "$0", label: "subscription required to browse" },
];

const qualitySignals = [
  { icon: MapPinned, label: "Service area", copy: "Only see requests inside the cities and zip codes you actually serve." },
  { icon: ClipboardCheck, label: "Project fit", copy: "Review service type, urgency, budget range, and notes before paying." },
  { icon: ShieldCheck, label: "Consent first", copy: "Homeowners opt in to being contacted by matched local pros." },
  { icon: LockKeyhole, label: "Masked preview", copy: "Contact details stay protected until you unlock the lead." },
];

const steps = [
  { icon: Target, title: "Browse matching requests", copy: "Filter by service, city, urgency, lead score, and price." },
  { icon: BadgeCheck, title: "Review the masked preview", copy: "See enough context to judge fit before you buy access." },
  { icon: CircleDollarSign, title: "Unlock with Stripe Checkout", copy: "Pay once for the lead. No monthly commitment or bidding maze." },
  { icon: MessageSquareText, title: "Work it in your lead desk", copy: "Full contact details, status tracking, and notes live in your dashboard." },
];

const leadPreview = [
  { label: "Service", value: "Emergency HVAC repair" },
  { label: "Location", value: "Plano, TX 75024" },
  { label: "Urgency", value: "Same day" },
  { label: "Lead score", value: "92 / 100" },
];

const segments = ["HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping", "Remodeling"];

export default function ContractorsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-slate-50">
        <section className="relative bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,#dbeafe_0,transparent_34%),radial-gradient(circle_at_88%_18%,#ccfbf1_0,transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
          <SectionWrapper className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                <Sparkles size={16} />
                Qualified local leads without directory chaos
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Buy the local jobs you actually want to win.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                LeadFlow AI gives contractors a cleaner way to find high-intent homeowner requests: matched by service area, scored for quality, masked until purchase, and ready to manage in a simple CRM-style dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/signup" size="lg" className="h-13">
                  Start getting leads <ArrowRight size={18} />
                </Button>
                <Button href="/login" variant="secondary" size="lg" className="h-13">
                  Contractor login
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["No bidding wars", "Pay per unlocked lead", "Built for local pros"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="text-emerald-500" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-slate-950/10 backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUp size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-950">Lead quality</p>
                    <p className="text-xs font-semibold text-slate-500">Score, urgency, fit</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-3 bottom-8 hidden rounded-2xl border border-white/80 bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/20 md:block">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Unlocked</p>
                <p className="mt-1 text-2xl font-black">Full contact info</p>
              </div>
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
                <Image
                  src={contractorMarketplaceHero}
                  alt="Contractors and a homeowner reviewing qualified local leads in LeadFlow AI"
                  priority
                  className="aspect-[16/10] w-full rounded-[1.45rem] object-cover"
                />
              </div>
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper className="py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-3xl font-black tracking-tight text-slate-950">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">A calmer way to buy homeowner demand.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Contractors should not need to chase noisy lists, race ten other pros, or pay for leads outside their market. LeadFlow AI keeps the buying flow simple and transparent.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="rounded-2xl p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Step {index + 1}</p>
                      <h3 className="mt-2 text-lg font-black text-slate-950">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.copy}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </SectionWrapper>

        <section className="bg-white">
          <SectionWrapper className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-4 shadow-2xl shadow-slate-950/15 sm:p-6">
              <div className="rounded-[1.25rem] bg-white p-5">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-black text-indigo-600">New matched lead</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-950">Homeowner needs help today</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Contact details unlock after checkout.</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">High fit</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {leadPreview.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-sm font-black text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-4">
                  <div className="flex items-center gap-3">
                    <LockKeyhole className="text-indigo-600" size={20} />
                    <p className="text-sm font-bold text-slate-700">Phone, email, and exact address are protected until purchase.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">What unlocks</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">See enough to decide. Pay only when the lead fits.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The marketplace explains the purchase before money moves: what is visible now, what unlocks after payment, and how the lead lands in your dashboard.
              </p>
              <div className="mt-6 grid gap-3">
                {["Full homeowner contact details", "Project notes and urgency", "Lead status and private notes", "Purchase history for your team"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="text-emerald-500" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper className="py-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Quality controls</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Built for trust on both sides of the marketplace.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Homeowners get routed to relevant local experts. Contractors get clearer buying signals and fewer surprises before checkout.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {segments.map((segment) => (
                  <span key={segment} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    {segment}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {qualitySignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <Card key={signal.label} className="rounded-2xl p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-lg font-black text-slate-950">{signal.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{signal.copy}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        <section className="bg-slate-950 text-white">
          <SectionWrapper className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-3 text-cyan-200">
                <UsersRound size={22} />
                <p className="text-sm font-black uppercase tracking-[0.2em]">Contractor growth desk</p>
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Turn local demand into booked jobs with less guesswork.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Sign up, complete onboarding, choose your services and markets, then start browsing leads that match your business.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button href="/signup" size="lg" className="bg-white text-slate-950 hover:bg-cyan-50">
                Create contractor account <BriefcaseBusiness size={18} />
              </Button>
              <Button href="/login" variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
                View dashboard <Clock3 size={18} />
              </Button>
            </div>
          </SectionWrapper>
        </section>
      </main>
      <Footer />
    </>
  );
}
