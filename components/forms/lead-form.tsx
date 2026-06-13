"use client";

import { useActionState, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Camera,
  CheckCircle2,
  Gift,
  HeartHandshake,
  Home,
  Loader2,
  LockKeyhole,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
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
  { id: "ac-repair", name: "AC Repair", slug: "ac-repair" },
  { id: "plumbing", name: "Plumbing", slug: "plumbing" },
  { id: "roofing", name: "Roofing", slug: "roofing" },
  { id: "emergency-electrician", name: "Electrical", slug: "emergency-electrician" },
  { id: "landscaping", name: "Landscaping", slug: "landscaping" },
  { id: "garage-door-repair", name: "Garage Door Repair", slug: "garage-door-repair" },
];

const servicePrompts: Record<string, { title: string; helper: string; placeholder: string }> = {
  "ac-repair": {
    title: "A few AC details help pros move fast.",
    helper: "Mention cooling/heating issue, unit age if known, and whether it is urgent.",
    placeholder: "Example: AC is blowing warm air, unit is about 8 years old, thermostat is set to 72, hoping for same-day help.",
  },
  plumbing: {
    title: "Tell plumbers what they are walking into.",
    helper: "Mention leaks, clogs, water shutoff, fixture type, and urgency.",
    placeholder: "Example: Kitchen sink is backing up and dripping under the cabinet. Water is currently turned off.",
  },
  roofing: {
    title: "Roofing pros need the visible symptoms.",
    helper: "Mention leak location, storm damage, roof age if known, and access notes.",
    placeholder: "Example: Water spot near upstairs bedroom after rain, roof is around 12 years old, need inspection this week.",
  },
  "emergency-electrician": {
    title: "Electrical safety details matter.",
    helper: "Mention outage area, breaker behavior, burning smells, sparks, or recent changes.",
    placeholder: "Example: Breaker trips when the dryer runs. No burning smell, but the panel feels warm.",
  },
  landscaping: {
    title: "Give landscapers the project shape.",
    helper: "Mention yard size, cleanup, recurring service, planting, irrigation, or hardscape needs.",
    placeholder: "Example: Need front yard cleanup, hedge trimming, and recurring biweekly lawn care quote.",
  },
  "garage-door-repair": {
    title: "Garage door details help diagnose the fix.",
    helper: "Mention spring, opener, track, noise, stuck-open/stuck-closed, and door size if known.",
    placeholder: "Example: Door is stuck halfway and opener hums. Two-car garage, likely spring issue.",
  },
};

function servicePrompt(slug?: string) {
  return slug ? servicePrompts[slug] : undefined;
}

export function LeadForm({ services, selectedSlug, sourcePage }: { services: Service[]; selectedSlug?: string; sourcePage?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const hasLiveServices = services.length > 0;
  const availableServices = useMemo(
    () => (hasLiveServices ? services.map((service) => ({ id: service.id, name: service.name, slug: service.slug })) : previewServices),
    [hasLiveServices, services],
  );
  const selected = availableServices.find((service) => service.slug === selectedSlug);
  const [selectedValue, setSelectedValue] = useState(selected ? selected.id : "");
  const activeService = selected ?? availableServices.find((service) => service.id === selectedValue || service.slug === selectedValue);
  const activePrompt = servicePrompt(activeService?.slug);

  return (
    <form
      action={action}
      id="lead-form"
      className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
        <div className="flex items-start gap-3">
          <motion.span
            animate={{ y: [0, -9, 0], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-lg shadow-indigo-500/15"
          >
            <Gift size={24} />
          </motion.span>
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
        {["Fast intake", "Free request", "Local pros"].map((item) => (
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
          <>
            <input type="hidden" name="serviceSlug" value={selected.slug} />
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-emerald-600" size={20} />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Selected service</p>
                  <p className="text-sm font-black text-slate-950">{selected.name}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Field label="What do you need help with?" error={state.fieldErrors?.serviceId?.[0]}>
            <Select
              name={hasLiveServices ? "serviceId" : "serviceSlug"}
              value={selectedValue}
              onChange={(event) => setSelectedValue(event.target.value)}
              disabled={pending}
              required
            >
              <option value="" disabled>
                Choose a service
              </option>
              {availableServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
          </Field>
        )}

        <AnimatePresence>
          {activePrompt ? (
            <motion.div
              key={activeService?.slug}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 shrink-0 text-cyan-700" size={19} />
                  <div>
                    <p className="font-black text-slate-950">{activePrompt.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{activePrompt.helper}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Timeline">
            <Select name="timeline" defaultValue="asap" disabled={pending}>
              <option value="asap">As soon as possible</option>
              <option value="today">Today</option>
              <option value="this-week">This week</option>
              <option value="planning">Planning / quote only</option>
            </Select>
          </Field>
          <Field label="Property type">
            <Select name="propertyType" defaultValue="single-family" disabled={pending}>
              <option value="single-family">Single-family home</option>
              <option value="townhome">Townhome</option>
              <option value="condo">Condo / apartment</option>
              <option value="commercial">Commercial property</option>
            </Select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Budget range">
            <Select name="budgetRange" defaultValue="not-sure" disabled={pending}>
              <option value="not-sure">Not sure yet</option>
              <option value="under-250">Under $250</option>
              <option value="250-1000">$250 - $1,000</option>
              <option value="1000-plus">$1,000+</option>
            </Select>
          </Field>
          <Field label="Best way to reach you" error={state.fieldErrors?.contactPreference?.[0]}>
            <Select name="contactPreference" defaultValue="both" disabled={pending}>
              <option value="both">Phone or email</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </Select>
          </Field>
        </div>

        <Field label="What is going on?" error={state.fieldErrors?.description?.[0]}>
          <Textarea
            name="description"
            placeholder={activePrompt?.placeholder ?? "Example: Tell us what happened, when you need help, and anything the pro should know before reaching out."}
            disabled={pending}
            required
          />
        </Field>

        <AnimatePresence>
          {activeService ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <Field label={`Extra ${activeService.name.toLowerCase()} details`}>
                <Textarea
                  name="serviceSpecificDetails"
                  placeholder="Optional: model numbers, access notes, safety concerns, preferred appointment window, or anything that helps the pro prepare."
                  disabled={pending}
                  className="min-h-24"
                />
              </Field>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
            <input name="hasExactAddress" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" disabled={pending} />
            <Home className="mt-0.5 shrink-0 text-indigo-600" size={17} />
            <span>I can provide exact address after match</span>
          </label>
          <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
            <input name="hasPhotos" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" disabled={pending} />
            <Camera className="mt-0.5 shrink-0 text-indigo-600" size={17} />
            <span>I have photos or video available</span>
          </label>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
          <div className="flex items-center gap-3">
            <CalendarClock className="text-indigo-600" size={20} />
            <p className="text-sm font-bold leading-6 text-slate-700">Better details help pros quote faster and make your gift-card eligible match easier to confirm.</p>
          </div>
        </div>

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
        <motion.div
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-1 flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white"
        >
          <WalletCards className="text-cyan-200" size={18} />
          Amazon.com Gift Card eligibility is tracked after a verified match.
        </motion.div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
          <HeartHandshake className="text-indigo-600" size={18} />
          No spammy directory blast. Just matched local professionals.
        </div>
      </div>
    </form>
  );
}
