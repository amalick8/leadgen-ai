import { NextRequest, NextResponse } from "next/server";
import { requireBusiness } from "@/lib/auth/guards";
import { getServerEnv } from "@/lib/env";
import { isLeadAvailableForBusiness } from "@/lib/leads/utils";
import { getStripe } from "@/lib/stripe/client";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const leadId = request.nextUrl.searchParams.get("leadId");
    if (!leadId) return NextResponse.redirect(new URL("/business/leads?error=missing-lead", request.url));
    const { business, serviceIds } = await requireBusiness();
    const supabase = getSupabaseAdminClient();
    const { data: lead } = await supabase.from("leads").select("*, services(*)").eq("id", leadId).maybeSingle();
    if (!lead || !isLeadAvailableForBusiness(lead, business, serviceIds, lead.services)) {
      return NextResponse.redirect(new URL("/business/leads?error=not-available", request.url));
    }
    const { data: payment, error } = await supabase.from("payments").insert({
      business_id: business.id,
      lead_id: lead.id,
      amount_cents: lead.price_cents,
      currency: getServerEnv().defaultCurrency,
      status: "pending",
    }).select("id").single();
    if (error) throw error;
    const stripe = getStripe();
    const appUrl = getServerEnv().appUrl;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${appUrl}/business/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/business/checkout/cancel`,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: getServerEnv().defaultCurrency,
          unit_amount: lead.price_cents,
          product_data: { name: `${lead.services?.name ?? "Local"} lead in ${lead.city}` },
        },
      }],
      metadata: { payment_id: payment.id, business_id: business.id, lead_id: lead.id },
    });
    await supabase.from("payments").update({ stripe_checkout_session_id: session.id }).eq("id", payment.id);
    return NextResponse.redirect(session.url ?? `${appUrl}/business/leads`);
  } catch (error) {
    console.error("create checkout failed", error);
    return NextResponse.redirect(new URL("/business/leads?error=checkout", request.url));
  }
}
