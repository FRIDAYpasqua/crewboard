import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id,name,description,due_date,created_at,updated_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, projects: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const body = (await req.json().catch(() => null)) as null | {
    name?: string;
    description?: string;
    dueDate?: string;
  };

  if (!body?.name) {
    return NextResponse.json({ ok: false, error: "name is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: body.name,
      description: body.description ?? null,
      due_date: body.dueDate ?? null,
    })
    .select("id,name,description,due_date")
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, project: data });
}
