import { Footer, Navbar } from "@/components/marketing/nav";
import { SectionWrapper } from "@/components/marketing/section";

export default function PrivacyPage() {
  return <><Navbar /><main><SectionWrapper><h1 className="text-4xl font-black">Privacy Policy</h1><div className="mt-6 space-y-4 text-slate-700"><p>This is placeholder privacy copy for development and should be reviewed by counsel before production.</p><p>LeadFlow AI collects service request details, contact information, and marketplace activity needed to match homeowners with local professionals.</p><p>Submitted contact information may be shared with local professionals after a lead is purchased. We do not intentionally expose homeowner contact details publicly.</p><p>Businesses and admins may access information required to operate the marketplace, process payments, and provide support.</p></div></SectionWrapper></main><Footer /></>;
}
