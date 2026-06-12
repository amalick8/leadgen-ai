import { SignupForm } from "@/components/forms/auth-forms";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/marketing/nav";

export default function SignupPage() {
  return <><Navbar /><main className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2"><div><h1 className="text-5xl font-black">Create your contractor account.</h1><p className="mt-4 text-slate-600">Complete onboarding, browse matching leads, and unlock contact details through Stripe Checkout.</p></div><Card><SignupForm /></Card></main></>;
}
