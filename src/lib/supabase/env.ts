function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const supabaseEnv = {
  url: requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  anonKey: requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
