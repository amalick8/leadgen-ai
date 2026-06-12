import { BusinessSidebar } from "@/components/business/sidebar";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 md:flex"><BusinessSidebar /><main className="flex-1 p-4 md:p-8">{children}</main></div>;
}
