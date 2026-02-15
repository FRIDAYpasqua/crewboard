import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "./env";

export function createSupabaseBrowserClient() {
  // Browser client uses anon key.
  return createClient(supabaseEnv.url, supabaseEnv.anonKey);
}
