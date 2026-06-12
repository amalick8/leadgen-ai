"use client";

import { useActionState } from "react";
import { login, signUpBusiness, type AuthState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";

const initial: AuthState = { success: false };

export function SignupForm() {
  const [state, action, pending] = useActionState(signUpBusiness, initial);
  return (
    <form action={action} className="grid gap-4">
      {state.error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p> : null}
      <Field label="Owner name" error={state.fieldErrors?.ownerName?.[0]}><Input name="ownerName" /></Field>
      <Field label="Business name" error={state.fieldErrors?.businessName?.[0]}><Input name="businessName" /></Field>
      <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" /></Field>
      <Field label="Phone" error={state.fieldErrors?.phone?.[0]}><Input name="phone" /></Field>
      <Field label="Password" error={state.fieldErrors?.password?.[0]}><Input name="password" type="password" /></Field>
      <Field label="Confirm password" error={state.fieldErrors?.confirmPassword?.[0]}><Input name="confirmPassword" type="password" /></Field>
      <Button disabled={pending}>{pending ? "Creating account..." : "Create business account"}</Button>
    </form>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="grid gap-4">
      {state.error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p> : null}
      <Field label="Email" error={state.fieldErrors?.email?.[0]}><Input name="email" type="email" /></Field>
      <Field label="Password" error={state.fieldErrors?.password?.[0]}><Input name="password" type="password" /></Field>
      <Button disabled={pending}>{pending ? "Signing in..." : "Log in"}</Button>
    </form>
  );
}
