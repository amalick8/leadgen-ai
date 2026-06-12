import { describe, expect, it } from "vitest";
import { calculateLeadScore, calculateUrgency, createDuplicateKey, formatPrice, isLeadAvailableForBusiness, maskEmail, maskPhone } from "@/lib/leads/utils";
import type { Business, Lead, Service } from "@/types/database";

describe("lead utilities", () => {
  it("scores high-intent leads deterministically", () => {
    expect(calculateLeadScore({ phone: "2145551111", email: "a@example.com", description: "Emergency burst pipe flooding the kitchen and we need help today with a detailed request over 150 characters long for scoring.", zipCode: "75201", city: "Dallas", contactPreference: "both", serviceName: "Plumbing" })).toBe(100);
  });

  it("detects urgency", () => {
    expect(calculateUrgency("There is a gas leak emergency")).toBe("emergency");
    expect(calculateUrgency("Need help today because it is broken")).toBe("high");
    expect(calculateUrgency("Need help")).toBe("low");
  });

  it("masks contact data", () => {
    expect(maskPhone("214-555-0199")).toBe("•••-•••-0199");
    expect(maskEmail("a@example.com")).toBe("Hidden until purchase");
  });

  it("formats prices", () => {
    expect(formatPrice(3500)).toBe("$35.00");
  });

  it("creates stable duplicate keys", () => {
    expect(createDuplicateKey({ serviceId: "svc", phone: "214 555 0199", zipCode: "75201", description: "Same project description" })).toBe(createDuplicateKey({ serviceId: "svc", phone: "(214)555-0199", zipCode: "75201", description: "Same   project description" }));
  });

  it("checks business eligibility", () => {
    const business = { active: true, onboarding_completed: true, service_area_cities: ["Dallas"], service_area_zips: [] } as unknown as Business;
    const lead = { status: "new", deleted_at: null, expires_at: new Date(Date.now() + 10000).toISOString(), service_id: "svc", city: "Dallas", zip_code: "75201" } as unknown as Lead;
    const service = { active: true } as unknown as Service;
    expect(isLeadAvailableForBusiness(lead, business, ["svc"], service)).toBe(true);
  });
});
