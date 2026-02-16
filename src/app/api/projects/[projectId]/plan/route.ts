import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLlmClient } from "@/lib/llm";

type PlannedTask = {
  title: string;
  description: string;
  status?: "backlog" | "todo" | "doing" | "done";
  owner?: string;
};

function safeJsonParse(text: string): unknown {
  // LLMs like to wrap JSON in markdown fences. Strip them.
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```\s*$/i, "");
  return JSON.parse(cleaned);
}

function getProjectId(req: Request, params?: { projectId?: string }) {
  if (params?.projectId) return params.projectId;
  const pathname = new URL(req.url).pathname;
  const parts = pathname.split("/").filter(Boolean);
  const idx = parts.indexOf("projects");
  return idx >= 0 ? parts[idx + 1] : undefined;
}

export async function POST(req: Request, { params }: { params: { projectId?: string } }) {
  const projectId = getProjectId(req, params);
  if (!projectId) {
    return NextResponse.json({ ok: false, error: "missing projectId" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const body = (await req.json().catch(() => null)) as null | { briefText?: string };
  if (!body?.briefText) {
    return NextResponse.json({ ok: false, error: "briefText is required" }, { status: 400 });
  }

  // Save brief
  const briefInsert = await supabase
    .from("briefs")
    .insert(
      {
        project_id: projectId,
        source: "paste",
        extracted_text: body.briefText,
      },
      { defaultToNull: false }
    )
    .select("id")
    .single();

  if (briefInsert.error) {
    return NextResponse.json(
      { ok: false, error: briefInsert.error.message },
      { status: 500 }
    );
  }

  const llm = getLlmClient();
  const reply = await llm.generateText(
    [
      {
        role: "system",
        content:
          "You are a ruthless project manager. Output ONLY valid JSON. No markdown.",
      },
      {
        role: "user",
        content:
          `Given this student project brief, propose 8-15 tasks for a Kanban board.\n\nReturn JSON in this exact shape: {\"tasks\": [{\"title\": string, \"description\": string, \"status\": \"backlog\"|\"todo\", \"owner\": string?}]}\n\nBrief:\n${body.briefText}`,
      },
    ],
    { temperature: 0.2, maxTokens: 900 }
  );

  let parsed: unknown;
  try {
    parsed = safeJsonParse(reply);
  } catch {
    return NextResponse.json(
      { ok: false, error: "LLM did not return valid JSON", raw: reply },
      { status: 500 }
    );
  }

  type PlanJson = { tasks?: unknown };
  const tasksArr = (parsed as PlanJson).tasks;
  if (!Array.isArray(tasksArr)) {
    return NextResponse.json(
      { ok: false, error: "LLM JSON missing tasks[]", raw: parsed },
      { status: 500 }
    );
  }

  const tasksToInsert: PlannedTask[] = tasksArr
    .slice(0, 20)
    .map((t: unknown) => {
      const obj = (t ?? {}) as Partial<Record<string, unknown>>;
      const statusRaw = obj.status;
      const status: PlannedTask["status"] =
        statusRaw === "backlog" || statusRaw === "todo" ? statusRaw : "todo";

      return {
        title: String(obj.title ?? "").slice(0, 120),
        description: String(obj.description ?? ""),
        status,
        owner: obj.owner ? String(obj.owner).slice(0, 80) : undefined,
      };
    })
    .filter((t) => t.title.length > 0);

  if (tasksToInsert.length === 0) {
    return NextResponse.json(
      { ok: false, error: "LLM produced zero usable tasks", raw: parsed },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert(
      tasksToInsert.map((t) => ({
        project_id: projectId,
        title: t.title,
        description: t.description,
        status: t.status ?? "todo",
        owner: t.owner ?? null,
      }))
    )
    .select("id,project_id,title,description,status,owner");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, tasks: data });
}
