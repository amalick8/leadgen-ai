import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/leads/utils";

type LeadCardData = {
  id: string;
  city: string;
  zip_code: string;
  description: string;
  price_cents: number;
  lead_score: number | null;
  created_at: string;
  urgency: string | null;
  phone: string | null;
  email: string | null;
  services?: { name?: string | null } | null;
};

export function LeadCard({ lead, detailHref }: { lead: LeadCardData; detailHref: string }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">{lead.services?.name}</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">{lead.city}, {lead.zip_code}</h3>
        </div>
        <Badge tone="green">{formatPrice(lead.price_cents)}</Badge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{lead.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1"><ShieldCheck size={15} /> Score {lead.lead_score ?? 0}</span>
        <span className="inline-flex items-center gap-1"><Clock size={15} /> {new Date(lead.created_at).toLocaleDateString()}</span>
        <span className="inline-flex items-center gap-1"><MapPin size={15} /> {lead.zip_code}</span>
        <StatusBadge status={lead.urgency} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{lead.phone} · {lead.email}</p>
        <Button href={detailHref} variant="secondary">View lead</Button>
      </div>
    </Card>
  );
}
