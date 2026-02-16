import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const columns: Array<{ key: "backlog" | "todo" | "doing" | "done"; title: string }> = [
  { key: "backlog", title: "Backlog" },
  { key: "todo", title: "To do" },
  { key: "doing", title: "Doing" },
  { key: "done", title: "Done" },
];

export default async function BoardPage({
  params,
}: {
  params: { projectId: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id,project_id,title,description,status,owner,created_at")
    .eq("project_id", params.projectId)
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Failed to load tasks</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          {error.message}
        </div>
      </div>
    );
  }

  async function updateStatus(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    const status = String(formData.get("status") || "");

    const supabase = createSupabaseServerClient();
    await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id)
      .eq("project_id", params.projectId);

    revalidatePath(`/app/p/${params.projectId}/board`);
  }

  const list = tasks ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Demo MVP: click a task and change its status.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {columns.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border bg-[var(--muted)] p-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{c.title}</div>
              <div className="text-xs text-[var(--muted-foreground)]">
                {list.filter((t) => t.status === c.key).length}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {list
                .filter((t) => t.status === c.key)
                .map((t) => (
                  <div
                    key={t.id}
                    className="rounded-md border bg-[var(--background)] p-3"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {t.owner ? `Owner: ${t.owner}` : "Unassigned"}
                    </div>
                    <div className="mt-2 text-xs text-[var(--muted-foreground)]">
                      {t.description}
                    </div>

                    <form action={updateStatus} className="mt-3 flex gap-2">
                      <input type="hidden" name="id" value={t.id} />
                      <select
                        name="status"
                        defaultValue={t.status}
                        className="h-9 flex-1 rounded-md border bg-[var(--background)] px-2 text-xs"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {columns.map((cc) => (
                          <option key={cc.key} value={cc.key}>
                            {cc.title}
                          </option>
                        ))}
                      </select>
                      <button
                        className="inline-flex h-9 items-center justify-center rounded-md px-3 text-xs font-medium"
                        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                        type="submit"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
