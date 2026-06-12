import type { Business, Lead, Service, Urgency } from "@/types/database";

const urgentEmergency = ["emergency", "flooding", "sparking", "gas leak", "burst pipe", "no heat", "no ac"];
const urgentHigh = ["asap", "today", "urgent", "leaking", "broken", "stopped working"];
const highValueServices = ["roofing", "ac repair", "hvac", "emergency electrician", "plumbing", "garage door repair"];

export function normalizeCity(city: string) {
  return city.trim().replace(/\s+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeZip(zip: string) {
  return zip.trim().toUpperCase().replace(/\s+/g, "");
}

export function calculateUrgency(description: string): Urgency {
  const text = description.toLowerCase();
  if (urgentEmergency.some((word) => text.includes(word))) return "emergency";
  if (urgentHigh.some((word) => text.includes(word))) return "high";
  if (description.trim().length < 45) return "low";
  return "medium";
}

export function calculateLeadScore(input: {
  phone?: string | null;
  email?: string | null;
  description: string;
  zipCode?: string | null;
  city?: string | null;
  contactPreference: string;
  serviceName?: string | null;
  serviceSlug?: string | null;
}) {
  let score = 0;
  const hasPhone = Boolean(input.phone?.trim());
  const hasEmail = Boolean(input.email?.trim());
  if (hasPhone && hasEmail) score += 20;
  if (hasPhone) score += 10;
  if (hasEmail) score += 10;
  if (input.description.length > 80) score += 15;
  if (input.description.length > 150) score += 10;
  if ([...urgentEmergency, ...urgentHigh].some((word) => input.description.toLowerCase().includes(word))) score += 15;
  if (input.zipCode) score += 10;
  if (input.city) score += 10;
  if (input.contactPreference === "both") score += 10;
  const service = `${input.serviceName ?? ""} ${input.serviceSlug ?? ""}`.toLowerCase();
  if (highValueServices.some((name) => service.includes(name))) score += 10;
  return Math.min(score, 100);
}

export function maskPhone(phone?: string | null) {
  if (!phone) return "Hidden until purchase";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "Hidden until purchase";
  return `•••-•••-${digits.slice(-4)}`;
}

export function maskEmail(email?: string | null) {
  if (!email) return "Hidden until purchase";
  return "Hidden until purchase";
}

export function formatPrice(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export function createDuplicateKey(input: {
  serviceId: string;
  phone?: string | null;
  email?: string | null;
  zipCode: string;
  description: string;
}) {
  const contact = (input.phone || input.email || "").toLowerCase().replace(/\W/g, "");
  const desc = input.description.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 96);
  return [input.serviceId, contact, normalizeZip(input.zipCode), desc].join(":");
}

export function descriptionPreview(description: string, max = 180) {
  const cleaned = description.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email hidden]");
  const withoutPhones = cleaned.replace(/(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, "[phone hidden]");
  return withoutPhones.length > max ? `${withoutPhones.slice(0, max).trim()}...` : withoutPhones;
}

export function isLeadAvailableForBusiness(lead: Lead, business: Business, serviceIds: string[], service?: Service | null) {
  const now = Date.now();
  const activeService = service ? service.active : true;
  const cityMatch = business.service_area_cities.map((city) => normalizeCity(city)).includes(normalizeCity(lead.city));
  const zipMatch = business.service_area_zips.map(normalizeZip).includes(normalizeZip(lead.zip_code));
  return (
    business.active &&
    business.onboarding_completed &&
    lead.status === "new" &&
    !lead.deleted_at &&
    (!lead.expires_at || new Date(lead.expires_at).getTime() > now) &&
    activeService &&
    serviceIds.includes(lead.service_id) &&
    (cityMatch || zipMatch)
  );
}
