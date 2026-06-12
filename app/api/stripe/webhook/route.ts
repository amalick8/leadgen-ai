import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe/client";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { JsonObject } from "@/types/database";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = getServerEnv().stripeWebhookSecret;
  if (!signature || !secret) return NextResponse.json({ error: "Webhook is not configured" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Stripe signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  const { data: seen } = await supabase.from("webhook_events").select("id").eq("provider", "stripe").eq("event_id", event.id).maybeSingle();
  if (seen) return NextResponse.json({ received: true, duplicate: true });

  const eventPayload = event as unknown as JsonObject;
  await supabase.from("webhook_events").insert({ provider: "stripe", event_id: event.id, event_type: event.type, payload: eventPayload });

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;
      const businessId = session.metadata?.business_id;
      const leadId = session.metadata?.lead_id;
      if (paymentId && businessId && leadId) {
        await supabase.from("payments").update({
          status: "succeeded",
          stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
          raw_event: eventPayload,
        }).eq("id", paymentId);
        const { data: purchase } = await supabase.from("lead_purchases").upsert({
          lead_id: leadId,
          business_id: businessId,
          payment_id: paymentId,
          status: "active",
        }, { onConflict: "lead_id" }).select("id").maybeSingle();
        await supabase.from("business_lead_statuses").upsert({ lead_id: leadId, business_id: businessId, status: "new" }, { onConflict: "lead_id,business_id" });
        await supabase.from("leads").update({ status: "purchased" }).eq("id", leadId);
        if (purchase) await supabase.from("lead_events").insert({ lead_id: leadId, business_id: businessId, event_type: "lead_purchased", message: "Lead purchased through Stripe Checkout" });
      }
    }
    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.payment_id) await supabase.from("payments").update({ status: "canceled", raw_event: eventPayload }).eq("id", session.metadata.payment_id);
    }
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
