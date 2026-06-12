import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer, Navbar } from "@/components/marketing/nav";

export default function ThankYouPage() {
  return <><Navbar /><main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4"><Card className="text-center"><h1 className="text-4xl font-black">Your request is in.</h1><p className="mt-4 text-slate-600">We will route your project to local professionals who match the service and area. If a pro purchases the lead, they can contact you using the details you provided.</p><div className="mt-8 flex justify-center gap-3"><Button href="/">Back home</Button><Button href="/services" variant="secondary">Browse services</Button></div></Card></main><Footer /></>;
}
