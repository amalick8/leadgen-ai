"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase/server";
import { loginSchema, signUpSchema } from "@/lib/validation/schemas";
import type { Profile } from "@/types/database";

export type AuthState = { success: boolean; error?: string; fieldErrors?: Record<string, string[]> };

function values(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const admin = getSupabaseAdminClient();
    const { data } = await admin.from("profiles").select("*").eq("auth_user_id", user.id).maybeSingle();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function signUpBusiness(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signUpSchema.safeParse(values(formData));
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  const supabase = await createSupabaseServerClient();
  const admin = getSupabaseAdminClient();
  const { data, error } = await supabase.auth.signUp({ email: parsed.data.email, password: parsed.data.password });
  if (error || !data.user) return { success: false, error: error?.message ?? "Could not create account." };
  const { data: profile, error: profileError } = await admin.from("profiles").insert({
    auth_user_id: data.user.id,
    email: parsed.data.email,
    full_name: parsed.data.ownerName,
    phone: parsed.data.phone,
    role: "business",
  }).select("id").single();
  if (profileError) return { success: false, error: profileError.message.includes("duplicate") ? "That email is already registered." : "Could not create profile." };
  const { error: businessError } = await admin.from("businesses").insert({
    owner_profile_id: profile.id,
    business_name: parsed.data.businessName,
    owner_name: parsed.data.ownerName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    notification_preference: "both",
  });
  if (businessError) return { success: false, error: "Could not create business record." };
  redirect("/business/onboarding");
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse(values(formData));
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { success: false, error: "Invalid email or password." };
  const admin = getSupabaseAdminClient();
  const { data: profile } = await admin.from("profiles").select("*, businesses(onboarding_completed)").eq("auth_user_id", data.user.id).maybeSingle();
  if (!profile) return { success: false, error: "No profile exists for this account." };
  if (profile.role === "admin") redirect("/admin");
  const business = Array.isArray(profile.businesses) ? profile.businesses[0] : profile.businesses;
  redirect(business?.onboarding_completed ? "/business/dashboard" : "/business/onboarding");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
