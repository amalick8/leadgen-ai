"use client";

import { useActionState } from "react";
import { updateBusinessOnboarding } from "@/lib/actions/business";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import type { Business, Service } from "@/types/database";

export function BusinessForm({ business, services, selectedServiceIds }: { business: Business; services: Service[]; selectedServiceIds: string[] }) {
  const [state, action, pending] = useActionState(updateBusinessOnboarding, { success: false });
  return (
    <form action={action} className="grid gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {state.success ? <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">Saved successfully.</p> : null}
      {state.error ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{state.error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Business name" error={state.fieldErrors?.businessName?.[0]}><Input name="businessName" defaultValue={business.business_name} /></Field>
        <Field label="Owner name" error={state.fieldErrors?.ownerName?.[0]}><Input name="ownerName" defaultValue={business.owner_name ?? ""} /></Field>
        <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" defaultValue={business.email} /></Field>
        <Field label="Phone" error={state.fieldErrors?.phone?.[0]}><Input name="phone" defaultValue={business.phone} /></Field>
        <Field label="Website"><Input name="website" defaultValue={business.website ?? ""} placeholder="https://example.com" /></Field>
        <Field label="License number"><Input name="licenseNumber" defaultValue={business.license_number ?? ""} /></Field>
      </div>
      <Field label="Description"><Textarea name="description" defaultValue={business.description ?? ""} /></Field>
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Services offered</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <label key={service.id} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
              <input type="checkbox" name="serviceIds" value={service.id} defaultChecked={selectedServiceIds.includes(service.id)} />
              {service.name}
            </label>
          ))}
        </div>
        {state.fieldErrors?.serviceIds?.[0] ? <p className="mt-1 text-sm text-rose-600">{state.fieldErrors.serviceIds[0]}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Cities served, comma separated" error={state.fieldErrors?.serviceAreaCities?.[0]}><Input name="serviceAreaCities" defaultValue={business.service_area_cities?.join(", ")} /></Field>
        <Field label="ZIP codes served, comma separated"><Input name="serviceAreaZips" defaultValue={business.service_area_zips?.join(", ")} /></Field>
        <Field label="Notification preference"><Select name="notificationPreference" defaultValue={business.notification_preference ?? "both"}><option value="both">Email and phone</option><option value="email">Email</option><option value="phone">Phone</option></Select></Field>
        <Field label="Monthly lead budget"><Input name="monthlyLeadBudgetDollars" type="number" defaultValue={business.monthly_lead_budget_cents ? business.monthly_lead_budget_cents / 100 : ""} /></Field>
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm font-medium"><input name="insured" type="checkbox" defaultChecked={business.insured} /> Insured</label>
        <label className="flex items-center gap-2 text-sm font-medium"><input name="acceptsEmergencyLeads" type="checkbox" defaultChecked={business.accepts_emergency_leads} /> Accept emergency leads</label>
      </div>
      <Button disabled={pending}>{pending ? "Saving..." : "Complete onboarding"}</Button>
    </form>
  );
}
