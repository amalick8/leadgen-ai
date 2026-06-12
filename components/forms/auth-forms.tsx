"use client";

import { useActionState } from "react";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { login, signUpBusiness, type AuthState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";

const initial: AuthState = { success: false };

export function SignupForm() {
  const [state, action, pending] = useActionState(signUpBusiness, initial);
  return (
    <form action={action} className="grid gap-4">
      {state.error ? <p className="rounded-2xl border border-rose-100 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{state.error}</p> : null}
      <Field label="Owner name" error={state.fieldErrors?.ownerName?.[0]}><Input name="ownerName" autoComplete="name" placeholder="Avery Johnson" /></Field>
      <Field label="Business name" error={state.fieldErrors?.businessName?.[0]}><Input name="businessName" autoComplete="organization" placeholder="Johnson Home Services" /></Field>
      <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" autoComplete="email" placeholder="avery@example.com" /></Field>
      <Field label="Phone" error={state.fieldErrors?.phone?.[0]}><Input name="phone" autoComplete="tel" placeholder="(555) 123-4567" /></Field>
      <Field label="Password" error={state.fieldErrors?.password?.[0]}><Input name="password" type="password" autoComplete="new-password" /></Field>
      <Field label="Confirm password" error={state.fieldErrors?.confirmPassword?.[0]}><Input name="confirmPassword" type="password" autoComplete="new-password" /></Field>
      <Button disabled={pending} size="lg">
        {pending ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
        {pending ? "Creating account..." : "Create business account"}
      </Button>
    </form>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="grid gap-4">
      {state.error ? <p className="rounded-2xl border border-rose-100 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{state.error}</p> : null}
      <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></Field>
      <Field label="Password" error={state.fieldErrors?.password?.[0]}><Input name="password" type="password" autoComplete="current-password" /></Field>
      <Button disabled={pending} size="lg">
        {pending ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
        {pending ? "Signing in..." : "Log in"}
      </Button>
    </form>
  );
}
