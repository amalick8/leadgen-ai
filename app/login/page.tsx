import Link from "next/link";
import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { LoginForm } from "@/components/forms/auth-forms";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/marketing/nav";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,#dbeafe_0,transparent_30%),radial-gradient(circle_at_90%_20%,#ccfbf1_0,transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1 text-sm font-bold text-indigo-700 shadow-sm">
              <Sparkles size={16} /> Marketplace command center
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Welcome back.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Log in as a contractor to manage leads and purchases, or as an admin to operate the LeadFlow AI marketplace.
            </p>
            <div className="mt-8 grid gap-3">
              {["Contractors go to onboarding or dashboard automatically.", "Admins are routed straight into marketplace controls.", "Sessions use Supabase Auth with server-side guards."].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-bold text-slate-700">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Card className="rounded-[1.75rem] p-6 shadow-2xl shadow-slate-950/10">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <LockKeyhole size={20} />
              </span>
              <div>
                <h2 className="text-xl font-black text-slate-950">Secure login</h2>
                <p className="text-sm text-slate-500">Business and admin access</p>
              </div>
            </div>
            <LoginForm />
            <p className="mt-5 text-sm text-slate-600">
              Need a contractor account? <Link className="font-black text-indigo-600" href="/signup">Sign up</Link>
            </p>
          </Card>
        </div>
      </main>
    </>
  );
}
