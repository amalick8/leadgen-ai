"use server";

import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/env";
import { leadSubmissionSchema } from "@/lib/validation/schemas";
import { calculateLeadScore, calculateUrgency, createDuplicateKey, normalizeCity, normalizeZip } from "@/lib/leads/utils";
import type { Service } from "@/types/database";

export type ActionState = { success: boolean; error?: string; fieldErrors?: Record<string, string[]> };

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function getActiveServices(): Promise<Service[]> {
  const { supabaseUrl, supabaseServiceRoleKey } = getServerEnv();
  if (!supabaseUrl || !supabaseServiceRoleKey) return [];

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("services").select("*").eq("active", true).order("name");
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("getActiveServices failed", error);
    return [];
  }
}

export async function submitLead(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = leadSubmissionSchema.safeParse({
    serviceId: formValue(formData, "serviceId"),
    serviceSlug: formValue(formData, "serviceSlug"),
    name: formValue(formData, "name"),
    phone: formValue(formData, "phone"),
    email: formValue(formData, "email"),
    city: formValue(formData, "city"),
    zipCode: formValue(formData, "zipCode"),
    description: formValue(formData, "description"),
    contactPreference: formValue(formData, "contactPreference"),
    consentToShare: formData.get("consentToShare") === "on",
    sourcePage: formValue(formData, "sourcePage"),
  });

  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const { supabaseUrl, supabaseServiceRoleKey } = getServerEnv();
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return {
        success: false,
        error: "LeadFlow AI is almost ready. Add the Supabase URL and service role key to enable live request matching.",
      };
    }

    const supabase = getSupabaseAdminClient();
    const serviceQuery = supabase.from("services").select("*").eq("active", true).limit(1);
    const { data: service, error: serviceError } = parsed.data.serviceId
      ? await serviceQuery.eq("id", parsed.data.serviceId).single()
      : await serviceQuery.eq("slug", parsed.data.serviceSlug).single();

    if (serviceError || !service) return { success: false, error: "That service is not available right now." };

    const duplicateKey = createDuplicateKey({
      serviceId: service.id,
      phone: parsed.data.phone,
      email: parsed.data.email,
      zipCode: parsed.data.zipCode,
      description: parsed.data.description,
    });
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: duplicate } = await supabase
      .from("leads")
      .select("id")
      .eq("duplicate_key", duplicateKey)
      .gte("created_at", tenMinutesAgo)
      .maybeSingle();

    if (!duplicate) {
      const city = normalizeCity(parsed.data.city);
      const zipCode = normalizeZip(parsed.data.zipCode);
      const leadScore = calculateLeadScore({
        phone: parsed.data.phone,
        email: parsed.data.email,
        city,
        zipCode,
        description: parsed.data.description,
        contactPreference: parsed.data.contactPreference,
        serviceName: service.name,
        serviceSlug: service.slug,
      });
      const urgency = calculateUrgency(parsed.data.description);
      const { data: lead, error: insertError } = await supabase
        .from("leads")
        .insert({
          service_id: service.id,
          name: parsed.data.name,
          phone: parsed.data.phone || null,
          email: parsed.data.email || null,
          city,
          zip_code: zipCode,
          description: parsed.data.description,
          contact_preference: parsed.data.contactPreference,
          consent_to_share: true,
          status: "new",
          price_cents: service.default_price_cents,
          lead_score: leadScore,
          urgency,
          source_page: parsed.data.sourcePage || null,
          duplicate_key: duplicateKey,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select("id")
        .single();
      if (insertError) throw insertError;
      await supabase.from("lead_events").insert({ lead_id: lead.id, event_type: "lead_submitted", message: "Lead submitted from public form" });
    }
  } catch (error) {
    console.error("submitLead failed", error);
    return { success: false, error: "We could not submit your request. Please try again." };
  }

  redirect("/thank-you");
}
