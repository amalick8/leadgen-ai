import { BusinessForm } from "@/components/forms/business-form";
import { PageHeader } from "@/components/ui/page-header";
import { getActiveServices } from "@/lib/actions/public";
import { getMyBusiness } from "@/lib/actions/business";

export default async function OnboardingPage() {
  const [{ business, serviceIds }, services] = await Promise.all([getMyBusiness(), getActiveServices()]);
  return <><PageHeader eyebrow="Business" title={business.onboarding_completed ? "Edit onboarding" : "Complete onboarding"} description="Choose services, service areas, and lead preferences before buying leads." /><BusinessForm business={business} services={services} selectedServiceIds={serviceIds} /></>;
}
