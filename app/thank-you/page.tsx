import { ArrowRight, CheckCircle2, Gift, MessageSquareText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-[75vh] overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,#dbeafe_0,transparent_30%),radial-gradient(circle_at_82%_18%,#ccfbf1_0,transparent_24%)]" />
        <div className="relative mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
              <CheckCircle2 size={30} />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Your request is in.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We will route your project to local professionals who match the service and area. If a pro purchases the lead, they can contact you using the details you provided.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/services">Browse services <ArrowRight size={18} /></Button>
              <Button href="/" variant="secondary">Back home</Button>
            </div>
          </div>
          <Card className="rounded-[1.75rem] p-6 shadow-2xl shadow-slate-950/10">
            <h2 className="text-2xl font-black text-slate-950">What happens next</h2>
            <div className="mt-5 grid gap-4">
              {[
                { icon: ShieldCheck, title: "We protect your details", copy: "Contractors see a masked preview before unlocking contact information." },
                { icon: MessageSquareText, title: "Matched pros can reach out", copy: "They use your preferred contact method and project notes to respond." },
                { icon: Gift, title: "Launch treat eligibility", copy: "Matched homeowners are eligible for a $10 Amazon.com Gift Card after the match is confirmed." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                      <Icon size={19} />
                    </span>
                    <div>
                      <p className="font-black text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
