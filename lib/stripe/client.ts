import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";

let stripe: Stripe | null = null;

export function getStripe() {
  const { stripeSecretKey } = getServerEnv();
  if (!stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is not configured.");
  if (!stripe) stripe = new Stripe(stripeSecretKey);
  return stripe;
}
