import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";

let resend: Resend | null = null;

function getResend() {
  const { resendApiKey } = getServerEnv();
  if (!resendApiKey) return null;
  if (!resend) resend = new Resend(resendApiKey);
  return resend;
}

export async function sendOptionalEmail(input: { to?: string | null; subject: string; html: string }) {
  const client = getResend();
  const from = getServerEnv().resendFromEmail;
  if (!client || !from || !input.to) {
    console.info("Email skipped because RESEND_API_KEY is not configured.");
    return;
  }
  try {
    await client.emails.send({ from, to: input.to, subject: input.subject, html: input.html });
  } catch (error) {
    console.error("Optional email failed", error);
  }
}
