import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";

export const metadata: Metadata = { title: "Get Local Leads | LeadFlow AI", description: "Buy qualified local service leads that match your business." };

export default function ContractorsPage() {
  const cards = ["Masked preview before purchase", "One-time Stripe Checkout", "CRM notes and pipeline", "Service-area matching", "No subscription required", "Lead scoring included"];
  return <><Navbar /><main><SectionWrapper><div className="max-w-3xl"><h1 className="text-5xl font-black">Buy qualified local leads without chasing low-intent directories.</h1><p className="mt-5 text-lg leading-8 text-slate-600">LeadFlow AI helps contractors browse matching service requests, review price and quality signals, and unlock full contact details only after purchase.</p><div className="mt-8 flex gap-3"><Button href="/signup" size="lg">Get qualified local leads</Button><Button href="/login" variant="secondary" size="lg">Log in</Button></div></div><div className="mt-12 grid gap-5 md:grid-cols-3">{cards.map((card) => <Card key={card} className="text-lg font-bold">{card}</Card>)}</div></SectionWrapper></main><Footer /></>;
}
