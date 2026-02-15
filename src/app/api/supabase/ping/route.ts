import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  // Minimal sanity check that our keys work: list storage buckets.
  // (This avoids needing DB schema/migrations in place.)
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, buckets: data });
}
