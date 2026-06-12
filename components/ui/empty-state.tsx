import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, body, actionHref, actionLabel }: { title: string; body: string; actionHref?: string; actionLabel?: string }) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-slate-100 p-3 text-slate-500"><Search size={22} /></div>
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">{body}</p>
      {actionHref && actionLabel ? <Button className="mt-5" href={actionHref}>{actionLabel}</Button> : null}
    </Card>
  );
}
