import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 md:flex"><AdminSidebar /><main className="flex-1 p-4 md:p-8">{children}</main></div>;
}
