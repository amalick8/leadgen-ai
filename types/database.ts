export type Role = "business" | "admin";
export type LeadStatus = "new" | "purchased" | "expired" | "deleted";
export type Urgency = "low" | "medium" | "high" | "emergency";
export type ContactPreference = "phone" | "email" | "both";
export type PipelineStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  default_price_cents: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
};

export type Business = {
  id: string;
  owner_profile_id: string;
  business_name: string;
  owner_name: string | null;
  email: string;
  phone: string;
  website: string | null;
  description: string | null;
  license_number: string | null;
  insured: boolean;
  notification_preference: ContactPreference;
  monthly_lead_budget_cents: number | null;
  accepts_emergency_leads: boolean;
  service_area_cities: string[];
  service_area_zips: string[];
  onboarding_completed: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  service_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city: string;
  zip_code: string;
  description: string;
  contact_preference: ContactPreference;
  consent_to_share: boolean;
  status: LeadStatus;
  price_cents: number;
  lead_score: number | null;
  urgency: Urgency | null;
  source_page: string | null;
  duplicate_key: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  services?: Service | null;
};

export type Payment = {
  id: string;
  business_id: string;
  lead_id: string;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "canceled" | "refunded";
  created_at: string;
  updated_at: string;
};

export type LeadPurchase = {
  id: string;
  lead_id: string;
  business_id: string;
  payment_id: string | null;
  status: "active" | "refunded" | "disputed";
  purchased_at: string;
  created_at: string;
};

export type JsonObject = Record<string, unknown>;

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};
