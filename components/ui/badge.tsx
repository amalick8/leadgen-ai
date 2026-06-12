import { cn } from "@/lib/utils/cn";

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "green" | "blue" | "amber" | "rose" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-indigo-50 text-indigo-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function StatusBadge({ status }: { status?: string | null }) {
  const tone = status === "won" || status === "succeeded" ? "green" : status === "lost" || status === "failed" ? "rose" : status === "emergency" ? "amber" : "blue";
  return <Badge tone={tone}>{status ?? "unknown"}</Badge>;
}
