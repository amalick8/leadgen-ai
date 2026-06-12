"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { requireBusiness } from "@/lib/auth/guards";
import { businessSettingsSchema, notesSchema, statusSchema } from "@/lib/validation/schemas";
import { descriptionPreview, isLeadAvailableForBusiness, maskEmail, maskPhone, normalizeCity, normalizeZip } from "@/lib/leads/utils";
import type { Lead } from "@/types/database";

export async function getMyBusiness() {
  return requireBusiness(true);
}

function splitList(value: FormDataEntryValue | null) {
  return String(value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

export async function updateBusinessOnboarding(_prev: any, formData: FormData) {
  const parsed = businessSettingsSchema.safeParse({
    businessName: formData.get("businessName"),
    ownerName: formData.get("ownerName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    website: formData.get("website"),
    description: formData.get("description"),
    licenseNumber: formData.get("licenseNumber"),
    insured: formData.get("insured") === "on",
    serviceIds: formData.getAll("serviceIds"),
    serviceAreaCities: splitList(formData.get("serviceAreaCities")).map(normalizeCity),
    serviceAreaZips: splitList(formData.get("serviceAreaZips")).map(normalizeZip),
    notificationPreference: formData.get("notificationPreference"),
    monthlyLeadBudgetDollars: formData.get("monthlyLeadBudgetDollars") || undefined,
    acceptsEmergencyLeads: formData.get("acceptsEmergencyLeads") === "on",
  });
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  const { business } = await requireBusiness(true);
  const supabase = getSupabaseAdminClient();
  const budget = parsed.data.monthlyLeadBudgetDollars ? Number(parsed.data.monthlyLeadBudgetDollars) * 100 : null;
  const { error } = await supabase.from("businesses").update({
    business_name: parsed.data.businessName,
    owner_name: parsed.data.ownerName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    website: parsed.data.website || null,
    description: parsed.data.description || null,
    license_number: parsed.data.licenseNumber || null,
    insured: parsed.data.insured ?? false,
    service_area_cities: parsed.data.serviceAreaCities,
    service_area_zips: parsed.data.serviceAreaZips,
    notification_preference: parsed.data.notificationPreference,
    monthly_lead_budget_cents: budget,
    accepts_emergency_leads: parsed.data.acceptsEmergencyLeads,
    onboarding_completed: true,
  }).eq("id", business.id);
  if (error) return { success: false, error: "Could not save business settings." };
  await supabase.from("business_services").delete().eq("business_id", business.id);
  await supabase.from("business_services").insert(parsed.data.serviceIds.map((serviceId) => ({ business_id: business.id, service_id: serviceId })));
  revalidatePath("/business");
  return { success: true };
}

export async function getAvailableLeads() {
  const { business, serviceIds } = await requireBusiness();
  const supabase = getSupabaseAdminClient();
  const { data } = await supabase
    .from("leads")
    .select("*, services(*)")
    .eq("status", "new")
    .is("deleted_at", null)
    .in("service_id", serviceIds.length ? serviceIds : ["00000000-0000-0000-0000-000000000000"])
    .order("created_at", { ascending: false });
  const { data: purchases } = await supabase.from("lead_purchases").select("lead_id");
  const purchased = new Set((purchases ?? []).map((purchase: any) => purchase.lead_id));
  return (data ?? [])
    .filter((lead: Lead) => !purchased.has(lead.id) && isLeadAvailableForBusiness(lead, business, serviceIds, lead.services))
    .map((lead: Lead) => ({
      ...lead,
      name: lead.name.split(" ")[0] || "Homeowner",
      phone: maskPhone(lead.phone),
      email: maskEmail(lead.email),
      description: descriptionPreview(lead.description),
    }));
}

export async function getAvailableLeadDetailMasked(leadId: string) {
  const leads = await getAvailableLeads();
  return leads.find((lead: any) => lead.id === leadId) ?? null;
}

export async function getMyPurchasedLeads() {
  const { business } = await requireBusiness(true);
  const supabase = getSupabaseAdminClient();
  const { data } = await supabase
    .from("lead_purchases")
    .select("*, leads(*, services(*)), business_lead_statuses(status, notes), payments(*)")
    .eq("business_id", business.id)
    .order("purchased_at", { ascending: false });
  return data ?? [];
}

export async function updateBusinessLeadStatus(_prev: any, formData: FormData) {
  const parsed = statusSchema.safeParse({ leadId: formData.get("leadId"), status: formData.get("status") });
  if (!parsed.success) return { success: false, error: "Invalid status." };
  const { business } = await requireBusiness(true);
  const supabase = getSupabaseAdminClient();
  await supabase.from("business_lead_statuses").upsert({ business_id: business.id, lead_id: parsed.data.leadId, status: parsed.data.status }, { onConflict: "lead_id,business_id" });
  revalidatePath("/business/my-leads");
  return { success: true };
}

export async function saveBusinessLeadStatus(formData: FormData) {
  await updateBusinessLeadStatus({}, formData);
}

export async function updateBusinessLeadNotes(_prev: any, formData: FormData) {
  const parsed = notesSchema.safeParse({ leadId: formData.get("leadId"), notes: formData.get("notes") });
  if (!parsed.success) return { success: false, error: "Invalid notes." };
  const { business } = await requireBusiness(true);
  const supabase = getSupabaseAdminClient();
  await supabase.from("business_lead_statuses").upsert({ business_id: business.id, lead_id: parsed.data.leadId, notes: parsed.data.notes }, { onConflict: "lead_id,business_id" });
  revalidatePath("/business/my-leads");
  return { success: true };
}

export async function saveBusinessLeadNotes(formData: FormData) {
  await updateBusinessLeadNotes({}, formData);
}

export async function redirectToCheckout(formData: FormData) {
  const leadId = formData.get("leadId");
  redirect(`/api/stripe/create-checkout-session?leadId=${leadId}`);
}
