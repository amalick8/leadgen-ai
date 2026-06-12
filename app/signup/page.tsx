import { BadgeCheck, BriefcaseBusiness, CreditCard, MapPinned } from "lucide-react";
import { SignupForm } from "@/components/forms/auth-forms";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/marketing/nav";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,#dbeafe_0,transparent_30%),radial-gradient(circle_at_88%_16%,#ccfbf1_0,transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1 text-sm font-bold text-indigo-700 shadow-sm">
              <BriefcaseBusiness size={16} /> Contractor growth desk
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Create your contractor account.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Set up your business profile, choose services and service areas, browse matching requests, and unlock full contact details through Stripe Checkout.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: MapPinned, label: "Area matched" },
                { icon: BadgeCheck, label: "Lead scoring" },
                { icon: CreditCard, label: "Pay per lead" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/85 p-4 text-sm font-black text-slate-700 shadow-sm">
                    <Icon className="mb-3 text-indigo-600" size={22} />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
          <Card className="rounded-[1.75rem] p-6 shadow-2xl shadow-slate-950/10">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-950">Business signup</h2>
              <p className="mt-1 text-sm text-slate-500">Takes about two minutes. Onboarding comes next.</p>
            </div>
            <SignupForm />
          </Card>
        </div>
      </main>
    </>
  );
}
