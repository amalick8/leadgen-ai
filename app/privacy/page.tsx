import { LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <SectionWrapper className="py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Legal review required</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              This development policy explains the intended privacy model for LeadFlow AI. Have counsel review and replace final copy before production launch.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: LockKeyhole, title: "Protected contact details", copy: "Homeowner contact information is not displayed publicly." },
              { icon: UsersRound, title: "Matched professionals", copy: "Contact details may be shared with local pros after a lead is purchased." },
              { icon: ShieldCheck, title: "Operational access", copy: "Businesses and admins access only the data needed to run the marketplace." },
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
              <p>LeadFlow AI collects service request details, contact information, and marketplace activity needed to match homeowners with local professionals.</p>
              <p>Submitted contact information may be shared with local professionals after a lead is purchased. We do not intentionally expose homeowner contact details publicly.</p>
              <p>Businesses and admins may access information required to operate the marketplace, process payments, support users, and maintain marketplace health.</p>
              <p>Optional email and enrichment providers should be configured only after reviewing their data-processing obligations.</p>
            </div>
          </Card>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
