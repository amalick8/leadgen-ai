import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return <div className="mx-auto max-w-2xl"><Card className="text-center"><h1 className="text-3xl font-black">Payment canceled</h1><p className="mt-3 text-slate-600">The lead was not purchased and no contact details were unlocked.</p><Button className="mt-6" href="/business/leads">Back to available leads</Button></Card></div>;
}
