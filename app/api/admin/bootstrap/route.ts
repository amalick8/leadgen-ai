import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { adminBootstrapEmail, adminBootstrapPassword, adminBootstrapSecret } = getServerEnv();

  if (!adminBootstrapEmail || !adminBootstrapPassword || !adminBootstrapSecret) {
    return NextResponse.json({ error: "Admin bootstrap is not configured." }, { status: 404 });
  }

  const providedSecret = request.headers.get("x-bootstrap-secret");
  if (providedSecret !== adminBootstrapSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id, auth_user_id")
    .eq("email", adminBootstrapEmail)
    .maybeSingle();

  if (existingProfile?.auth_user_id) {
    const { error: promoteError } = await supabase
      .from("profiles")
      .update({ role: "admin", full_name: "LeadFlow Admin" })
      .eq("id", existingProfile.id);
    if (promoteError) return NextResponse.json({ error: promoteError.message }, { status: 500 });
    return NextResponse.json({ ok: true, mode: "promoted" });
  }

  const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
    email: adminBootstrapEmail,
    password: adminBootstrapPassword,
    email_confirm: true,
    user_metadata: { full_name: "LeadFlow Admin" },
  });

  if (createError || !createdUser.user) {
    return NextResponse.json({ error: createError?.message ?? "Could not create admin user." }, { status: 500 });
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      auth_user_id: createdUser.user.id,
      email: adminBootstrapEmail,
      full_name: "LeadFlow Admin",
      role: "admin",
    },
    { onConflict: "email" },
  );

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  return NextResponse.json({ ok: true, mode: "created" });
}
