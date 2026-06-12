"use client";

import { useActionState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Gift,
  HeartHandshake,
  Loader2,
  LockKeyhole,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";
import { submitLead, type ActionState } from "@/lib/actions/public";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import type { Service } from "@/types/database";

const initial: ActionState = { success: false };

const trustItems = [
  { icon: ShieldCheck, label: "Contact details stay private until matched" },
  { icon: MapPin, label: "Routed to pros in your local service area" },
  { icon: LockKeyhole, label: "No account required for homeowners" },
];

const previewServices = [
  { name: "AC Repair", slug: "ac-repair" },
  { name: "Plumbing", slug: "plumbing" },
  { name: "Roofing", slug: "roofing" },
  { name: "Electrical", slug: "emergency-electrician" },
  { name: "Landscaping", slug: "landscaping" },
  { name: "Garage Door Repair", slug: "garage-door-repair" },
];

export function LeadForm({ services, selectedSlug, sourcePage }: { services: Service[]; selectedSlug?: string; sourcePage?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const selected = services.find((service) => service.slug === selectedSlug);
  const hasLiveServices = services.length > 0;

  return (
    <form
      action={action}
      id="lead-form"
      className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
            <Gift size={22} />
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-700">Launch treat</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">Matched homeowners are eligible for a $10 Amazon.com Gift Card.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Submit once, get matched with a verified local pro, and we will send simple redemption instructions after the match is confirmed.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["1 minute", "Free request", "Local pros"].map((item) => (
          <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
            <CheckCircle2 className="text-emerald-500" size={14} />
            {item}
          </span>
        ))}
      </div>

      {state.error ? (
        <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold leading-6 text-rose-700">
          {state.error}
        </div>
      ) : null}

      <input type="hidden" name="sourcePage" value={sourcePage ?? ""} />

      <div className="mt-5 grid gap-4">
        {selected ? (
          <input type="hidden" name="serviceSlug" value={selected.slug} />
        ) : (
          <Field label="What do you need help with?" error={state.fieldErrors?.serviceId?.[0]}>
            <Select name={hasLiveServices ? "serviceId" : "serviceSlug"} defaultValue="" disabled={pending} required>
              <option value="" disabled>
                Choose a service
              </option>
              {hasLiveServices
                ? services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))
                : previewServices.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
            </Select>
          </Field>
        )}

        {selected ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <BadgeCheck className="text-emerald-600" size={20} />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Selected service</p>
                <p className="text-sm font-black text-slate-950">{selected.name}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" error={state.fieldErrors?.name?.[0]}>
            <Input name="name" autoComplete="name" placeholder="Jane Smith" disabled={pending} required />
          </Field>
          <Field label="Phone" error={state.fieldErrors?.phone?.[0]}>
            <Input name="phone" autoComplete="tel" placeholder="(555) 123-4567" disabled={pending} />
          </Field>
        </div>

        <Field label="Email" error={state.fieldErrors?.email?.[0]}>
          <Input name="email" type="email" autoComplete="email" placeholder="jane@example.com" disabled={pending} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" error={state.fieldErrors?.city?.[0]}>
            <Input name="city" placeholder="Plano" disabled={pending} required />
          </Field>
          <Field label="ZIP code" error={state.fieldErrors?.zipCode?.[0]}>
            <Input name="zipCode" inputMode="numeric" placeholder="75024" disabled={pending} required />
          </Field>
        </div>

        <Field label="Best way to reach you" error={state.fieldErrors?.contactPreference?.[0]}>
          <Select name="contactPreference" defaultValue="both" disabled={pending}>
            <option value="both">Phone or email</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </Select>
        </Field>

        <Field label="What is going on?" error={state.fieldErrors?.description?.[0]}>
          <Textarea
            name="description"
            placeholder="Example: AC stopped cooling this afternoon. Looking for someone who can come today or tomorrow."
            disabled={pending}
            required
          />
        </Field>

        <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <input name="consentToShare" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" disabled={pending} required />
          <span>
            I agree that LeadFlow AI may share my request and contact details with local professionals who can help with this project.
          </span>
        </label>
        {state.fieldErrors?.consentToShare?.[0] ? <p className="text-sm text-rose-600">{state.fieldErrors.consentToShare[0]}</p> : null}

        <Button disabled={pending} size="lg" className="h-13 w-full">
          {pending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          {pending ? "Matching your request..." : "Get matched with local pros"}
          {!pending ? <ArrowRight size={18} /> : null}
        </Button>
      </div>

      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Icon size={16} />
              </span>
              {item.label}
            </div>
          );
        })}
        <div className="mt-1 flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
          <HeartHandshake className="text-cyan-200" size={18} />
          No spammy directory blast. Just matched local professionals.
        </div>
      </div>
    </form>
  );
}
