import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-tight text-slate-950">LeadFlow <span className="text-indigo-600">AI</span></Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/services">Services</Link>
          <Link href="/contractors">Contractors</Link>
          <Link href="/login">Log in</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/signup" variant="secondary" size="sm">Get leads</Button>
          <Button href="/#lead-form" size="sm">Find a pro</Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-black">LeadFlow AI</p>
          <p className="mt-3 max-w-md text-sm text-slate-300">Qualified local service requests matched with trusted pros across high-intent local markets.</p>
        </div>
        <Link href="/privacy" className="text-sm text-slate-300">Privacy</Link>
        <Link href="/terms" className="text-sm text-slate-300">Terms</Link>
      </div>
    </footer>
  );
}
