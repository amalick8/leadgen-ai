import { BadgeDollarSign, Scale, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <SectionWrapper className="py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Legal review required</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Terms of Service</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              These development terms describe the intended marketplace model. Replace with counsel-approved production terms before launch.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: BadgeDollarSign, title: "Pay per lead", copy: "Contractors purchase access to lead contact details through Stripe Checkout." },
              { icon: ShieldCheck, title: "No guaranteed sale", copy: "Lead quality signals help decision-making, but a purchased lead is not a guaranteed closed job." },
              { icon: Scale, title: "Use lawfully", copy: "Businesses remain responsible for licensing, consumer rules, and accurate profile information." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-2xl">
                  <Icon className="text-indigo-600" />
                  <h2 className="mt-4 text-lg font-black">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
                </Card>
              );
            })}
          </div>
          <Card className="mt-8 rounded-2xl">
            <div className="space-y-4 text-slate-700">
              <p>Contractors purchase access to lead contact details. Lead quality signals are provided to help decision-making, but a purchased lead is not a guaranteed closed sale.</p>
              <p>Homeowners agree to provide accurate project and contact information and consent to being contacted by matched local professionals.</p>
              <p>Users agree to use the platform lawfully and comply with applicable local licensing, advertising, consumer protection, and privacy rules.</p>
              <p>Marketplace operators should define refund, dispute, abuse, gift-card, and lead replacement policies before accepting live payments.</p>
            </div>
          </Card>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
