import { getServerEnv } from "@/lib/env";

export async function optionalLeadInsight(input: { serviceName: string; city: string; description: string }) {
  const { openAiApiKey } = getServerEnv();
  if (!openAiApiKey) return null;
  try {
    return `Strong fit for ${input.serviceName} contractors serving ${input.city}.`;
  } catch {
    return null;
  }
}
