import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/actions/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { Business, Profile } from "@/types/database";

export async function requireBusiness(allowIncomplete = false): Promise<{ profile: Profile; business: Business; serviceIds: string[] }> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== "business" && profile.role !== "admin") redirect("/login");
  const supabase = getSupabaseAdminClient();
  const { data: business } = await supabase.from("businesses").select("*").eq("owner_profile_id", profile.id).maybeSingle();
  if (!business) redirect("/business/onboarding");
  if (!business.active && !allowIncomplete) redirect("/business/settings?inactive=1");
  if (!business.onboarding_completed && !allowIncomplete) redirect("/business/onboarding");
  const { data: links } = await supabase.from("business_services").select("service_id").eq("business_id", business.id);
  return { profile, business, serviceIds: (links ?? []).map((link: any) => link.service_id) };
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== "admin") redirect("/business/dashboard");
  return profile;
}
