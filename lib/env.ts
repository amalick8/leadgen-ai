const serverOnly = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "OPENAI_API_KEY",
  "ADMIN_BOOTSTRAP_SECRET",
  "ADMIN_BOOTSTRAP_PASSWORD",
] as const;

export type RequiredEnvName =
  | "NEXT_PUBLIC_APP_URL"
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET";

export function getPublicEnv() {
  return {
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function getServerEnv() {
  return {
    ...getPublicEnv(),
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiLeadScoringModel: process.env.OPENAI_LEAD_SCORING_MODEL ?? "gpt-5.4-nano",
    defaultCurrency: process.env.DEFAULT_CURRENCY ?? "usd",
    adminBootstrapEmail: process.env.ADMIN_BOOTSTRAP_EMAIL,
    adminBootstrapPassword: process.env.ADMIN_BOOTSTRAP_PASSWORD,
    adminBootstrapSecret: process.env.ADMIN_BOOTSTRAP_SECRET,
  };
}

export function missingCoreEnv(): RequiredEnvName[] {
  const required: RequiredEnvName[] = [
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];
  return required.filter((key) => !process.env[key]);
}

export function assertServerEnv(keys: RequiredEnvName[]) {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export function isServerOnlyEnv(name: string) {
  return serverOnly.includes(name as (typeof serverOnly)[number]);
}
