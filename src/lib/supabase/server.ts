import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "./env";

export function createSupabaseServerClient() {
  if (!supabaseEnv.serviceRoleKey) {
    throw new Error(
      "Missing env: SUPABASE_SERVICE_ROLE_KEY (required for server writes in MVP)"
    );
  }

  return createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: { persistSession: false },
  });
}
