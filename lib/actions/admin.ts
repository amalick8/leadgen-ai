"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { serviceSchema } from "@/lib/validation/schemas";

export async function adminCounts() {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  const [leads, businesses, payments] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("businesses").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("payments").select("amount_cents,status"),
  ]);
  const revenue = (payments.data ?? []).filter((p: any) => p.status === "succeeded").reduce((sum: number, p: any) => sum + p.amount_cents, 0);
  return { leads: leads.count ?? 0, businesses: businesses.count ?? 0, revenue, payments: payments.data ?? [] };
}

export async function getAll(table: "leads" | "services" | "businesses" | "payments") {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  const select = table === "leads" ? "*, services(*), lead_purchases(*, businesses(*))" : table === "payments" ? "*, leads(*), businesses(*)" : "*";
  const { data } = await supabase.from(table).select(select).order("created_at", { ascending: false });
  return data ?? [];
}

export async function createService(_prev: any, formData: FormData) {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("services").upsert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    default_price_cents: Math.round(parsed.data.defaultPriceDollars * 100),
    active: parsed.data.active,
  }, { onConflict: "slug" });
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/services");
  return { success: true };
}

export async function saveService(formData: FormData) {
  await createService({}, formData);
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  await supabase.from("leads").update({ status: String(formData.get("status")) }).eq("id", String(formData.get("leadId")));
  revalidatePath("/admin/leads");
}

export async function expireLead(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  await supabase.from("leads").update({ status: "expired", expires_at: new Date().toISOString() }).eq("id", String(formData.get("leadId")));
  revalidatePath("/admin/leads");
}

export async function softDeleteLead(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  await supabase.from("leads").update({ status: "deleted", deleted_at: new Date().toISOString() }).eq("id", String(formData.get("leadId")));
  revalidatePath("/admin/leads");
}

export async function updateBusinessActiveStatus(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdminClient();
  await supabase.from("businesses").update({ active: formData.get("active") === "true" }).eq("id", String(formData.get("businessId")));
  revalidatePath("/admin/businesses");
}
