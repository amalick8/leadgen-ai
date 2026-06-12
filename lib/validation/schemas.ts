import { z } from "zod";

const phone = z.string().trim().min(7, "Enter a valid phone number").max(30).optional().or(z.literal(""));
const email = z.string().trim().email("Enter a valid email").optional().or(z.literal(""));

export const signUpSchema = z
  .object({
    ownerName: z.string().trim().min(2, "Owner name is required"),
    businessName: z.string().trim().min(2, "Business name is required"),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().min(7, "Enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const leadSubmissionSchema = z
  .object({
    serviceId: z.string().uuid().optional(),
    serviceSlug: z.string().trim().min(1).optional(),
    name: z.string().trim().min(2, "Name is required"),
    phone,
    email,
    city: z.string().trim().min(2, "City is required"),
    zipCode: z.string().trim().min(3, "ZIP code is required"),
    description: z.string().trim().min(20, "Tell us a little more about the project"),
    contactPreference: z.enum(["phone", "email", "both"]),
    consentToShare: z.coerce.boolean().refine(Boolean, "Consent is required"),
    sourcePage: z.string().optional(),
  })
  .refine((data) => data.serviceId || data.serviceSlug, { path: ["serviceId"], message: "Choose a service" })
  .refine((data) => data.phone || data.email, { path: ["email"], message: "Enter at least phone or email" })
  .refine((data) => data.contactPreference !== "phone" || data.phone, { path: ["phone"], message: "Phone is required" })
  .refine((data) => data.contactPreference !== "email" || data.email, { path: ["email"], message: "Email is required" });

export const businessSettingsSchema = z.object({
  businessName: z.string().trim().min(2, "Business name is required"),
  ownerName: z.string().trim().min(2, "Owner name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  description: z.string().max(1000).optional().or(z.literal("")),
  licenseNumber: z.string().max(80).optional().or(z.literal("")),
  insured: z.coerce.boolean().optional(),
  serviceIds: z.array(z.string().uuid()).min(1, "Select at least one service"),
  serviceAreaCities: z.array(z.string().trim().min(2)).default([]),
  serviceAreaZips: z.array(z.string().trim().min(3)).default([]),
  notificationPreference: z.enum(["email", "phone", "both"]),
  monthlyLeadBudgetDollars: z.coerce.number().nonnegative().optional().or(z.literal("")),
  acceptsEmergencyLeads: z.coerce.boolean().default(true),
}).refine((data) => data.serviceAreaCities.length > 0 || data.serviceAreaZips.length > 0, {
  path: ["serviceAreaCities"],
  message: "Enter at least one city or ZIP code",
});

export const serviceSchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens"),
  description: z.string().trim().optional().or(z.literal("")),
  defaultPriceDollars: z.coerce.number().min(1),
  active: z.coerce.boolean().default(true),
});

export const statusSchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});

export const notesSchema = z.object({
  leadId: z.string().uuid(),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

export const checkoutSchema = z.object({
  leadId: z.string().uuid(),
});
