import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";

export default function TermsPage() {
  return <><Navbar /><main><SectionWrapper><h1 className="text-4xl font-black">Terms of Service</h1><div className="mt-6 space-y-4 text-slate-700"><p>This is placeholder terms copy for development and should be reviewed before production.</p><p>Contractors purchase access to lead contact details. Lead quality signals are provided to help decision-making, but a purchased lead is not a guaranteed closed sale.</p><p>Users agree to provide accurate information, use the platform lawfully, and comply with applicable local licensing and consumer protection rules.</p></div></SectionWrapper></main><Footer /></>;
}
