"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitLead, type ActionState } from "@/lib/actions/public";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import type { Service } from "@/types/database";

const initial: ActionState = { success: false };

export function LeadForm({ services, selectedSlug, sourcePage }: { services: Service[]; selectedSlug?: string; sourcePage?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const selected = services.find((service) => service.slug === selectedSlug);
  return (
    <form action={action} id="lead-form" className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10">
      {state.error ? <div className="rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-700">{state.error}</div> : null}
      <input type="hidden" name="sourcePage" value={sourcePage ?? ""} />
      {selected ? <input type="hidden" name="serviceSlug" value={selected.slug} /> : (
        <Field label="Service" error={state.fieldErrors?.serviceId?.[0]}>
          <Select name="serviceId" defaultValue="">
            <option value="" disabled>Choose a service</option>
            {services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
          </Select>
        </Field>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={state.fieldErrors?.name?.[0]}><Input name="name" autoComplete="name" /></Field>
        <Field label="Phone" error={state.fieldErrors?.phone?.[0]}><Input name="phone" autoComplete="tel" /></Field>
      </div>
      <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" autoComplete="email" /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" error={state.fieldErrors?.city?.[0]}><Input name="city" /></Field>
        <Field label="ZIP code" error={state.fieldErrors?.zipCode?.[0]}><Input name="zipCode" /></Field>
      </div>
      <Field label="Preferred contact" error={state.fieldErrors?.contactPreference?.[0]}>
        <Select name="contactPreference" defaultValue="both">
          <option value="both">Phone or email</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </Select>
      </Field>
      <Field label="Project details" error={state.fieldErrors?.description?.[0]}><Textarea name="description" placeholder="Tell us what is happening, timing, and anything the pro should know." /></Field>
      <label className="flex gap-3 text-sm text-slate-600">
        <input name="consentToShare" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
        <span>I agree that LeadFlow AI may share my request and contact details with local professionals who can help with this project.</span>
      </label>
      {state.fieldErrors?.consentToShare?.[0] ? <p className="text-sm text-rose-600">{state.fieldErrors.consentToShare[0]}</p> : null}
      <Button disabled={pending} size="lg"><Send size={18} />{pending ? "Submitting..." : "Submit your request"}</Button>
    </form>
  );
}
