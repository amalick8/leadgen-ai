import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";
import { Card } from "@/components/ui/card";
import { getActiveServices } from "@/lib/actions/public";

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
  const { serviceSlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  return {
    title: service ? `${service.name} | LeadFlow AI` : "Service | LeadFlow AI",
    description: service?.description ?? "Submit a local service request.",
  };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const { serviceSlug } = await params;
  const services = await getActiveServices();
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,#dbeafe_0,transparent_30%),radial-gradient(circle_at_88%_18%,#ccfbf1_0,transparent_24%)]" />
          <SectionWrapper className="relative grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                <Sparkles size={16} /> {service.name}
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Get matched with trusted {service.name.toLowerCase()} pros.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{service.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["Verified request intake", "Local pros only", "Clear contact consent", "Fast project routing"].map((item) => (
                  <Card key={item} className="rounded-2xl font-bold">
                    <CheckCircle2 className="mb-3 text-emerald-500" size={20} />
                    {item}
                  </Card>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
                <div className="flex gap-3">
                  <Gift className="shrink-0 text-indigo-600" size={22} />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    Launch treat: matched homeowners are eligible for a $10 Amazon.com Gift Card after a verified local pro accepts the request.
                  </p>
                </div>
              </div>
            </div>
            <LeadForm services={services} selectedSlug={service.slug} sourcePage={`/services/${service.slug}`} />
          </SectionWrapper>
        </section>
        <SectionWrapper className="py-12">
          <Card className="rounded-2xl bg-slate-950 text-white">
            <div className="flex gap-4">
              <ShieldCheck className="shrink-0 text-cyan-200" />
              <div>
                <h2 className="text-2xl font-black">Your request is routed by fit.</h2>
                <p className="mt-2 text-slate-300">Contractors see service type, area, urgency, and project context before contacting you.</p>
              </div>
            </div>
          </Card>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
