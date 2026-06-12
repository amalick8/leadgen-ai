import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  return <div className="mx-auto max-w-2xl"><Card className="text-center"><h1 className="text-3xl font-black">Purchase confirmed</h1><p className="mt-3 text-slate-600">Stripe is processing the confirmation. Once the webhook records the purchase, the lead appears in My Leads.</p><div className="mt-6 flex justify-center gap-3"><Button href="/business/my-leads">My Leads</Button><Button href="/business/leads" variant="secondary">Browse more</Button></div></Card></div>;
}
