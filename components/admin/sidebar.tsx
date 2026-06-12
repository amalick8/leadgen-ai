import { BarChart3, BriefcaseBusiness, CreditCard, Home, ListChecks, Wrench } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

const items = [
  ["/admin", "Dashboard", Home],
  ["/admin/leads", "Leads", ListChecks],
  ["/admin/services", "Services", Wrench],
  ["/admin/businesses", "Businesses", BriefcaseBusiness],
  ["/admin/payments", "Payments", CreditCard],
  ["/admin/analytics", "Analytics", BarChart3],
] as const;

export function AdminSidebar() {
  return (
    <aside className="border-b border-slate-200 bg-slate-950 p-4 text-white md:min-h-screen md:w-64 md:border-b-0">
      <Link className="text-lg font-black" href="/">LeadFlow <span className="text-cyan-300">AI</span></Link>
      <nav className="mt-6 flex gap-2 overflow-auto md:flex-col">
        {items.map(([href, label, Icon]) => <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"><Icon size={16} />{label}</Link>)}
      </nav>
      <form action={logout} className="mt-4"><button className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10">Log out</button></form>
    </aside>
  );
}
