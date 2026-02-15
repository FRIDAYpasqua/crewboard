import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: { projectId: string } }
) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id,project_id,title,description,status,owner,created_at,updated_at")
    .eq("project_id", params.projectId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, tasks: data });
}

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const supabase = createSupabaseServerClient();
  const body = (await req.json().catch(() => null)) as null | {
    title?: string;
    description?: string;
    status?: "backlog" | "todo" | "doing" | "done";
    owner?: string;
  };

  if (!body?.title) {
    return NextResponse.json({ ok: false, error: "title is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      project_id: params.projectId,
      title: body.title,
      description: body.description ?? "",
      status: body.status ?? "todo",
      owner: body.owner ?? null,
    })
    .select("id,project_id,title,description,status,owner")
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, task: data });
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const supabase = createSupabaseServerClient();
  const body = (await req.json().catch(() => null)) as null | {
    id?: string;
    status?: "backlog" | "todo" | "doing" | "done";
    owner?: string | null;
  };

  if (!body?.id) {
    return NextResponse.json({ ok: false, error: "id is required" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (body.status) patch.status = body.status;
  if (typeof body.owner !== "undefined") patch.owner = body.owner;

  const { data, error } = await supabase
    .from("tasks")
    .update(patch)
    .eq("id", body.id)
    .eq("project_id", params.projectId)
    .select("id,project_id,title,description,status,owner")
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, task: data });
}
