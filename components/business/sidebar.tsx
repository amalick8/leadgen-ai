import { BarChart3, BriefcaseBusiness, Settings, ShoppingBag, UserCheck } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

const items = [
  ["/business/dashboard", "Dashboard", BarChart3],
  ["/business/leads", "Available leads", ShoppingBag],
  ["/business/my-leads", "My leads", BriefcaseBusiness],
  ["/business/onboarding", "Onboarding", UserCheck],
  ["/business/settings", "Settings", Settings],
] as const;

export function BusinessSidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <Link className="text-lg font-black text-slate-950" href="/">LeadFlow <span className="text-indigo-600">AI</span></Link>
      <nav className="mt-6 flex gap-2 overflow-auto md:flex-col">
        {items.map(([href, label, Icon]) => <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"><Icon size={16} />{label}</Link>)}
      </nav>
      <form action={logout} className="mt-4"><button className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">Log out</button></form>
    </aside>
  );
}
