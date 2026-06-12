import Link from "next/link";
import { LoginForm } from "@/components/forms/auth-forms";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/marketing/nav";

export default function LoginPage() {
  return <><Navbar /><main className="mx-auto grid min-h-[80vh] max-w-5xl items-center gap-10 px-4 py-12 md:grid-cols-2"><div><h1 className="text-5xl font-black">Welcome back.</h1><p className="mt-4 text-slate-600">Log in to manage leads, purchases, and marketplace operations.</p><p className="mt-4 text-sm">Need an account? <Link className="font-bold text-indigo-600" href="/signup">Sign up</Link></p></div><Card><LoginForm /></Card></main></>;
}
