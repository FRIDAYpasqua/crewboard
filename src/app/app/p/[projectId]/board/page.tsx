import { mockDb } from "@/lib/mock/db";

const columns: Array<{ key: "backlog" | "todo" | "doing" | "done"; title: string }> = [
  { key: "backlog", title: "Backlog" },
  { key: "todo", title: "To do" },
  { key: "doing", title: "Doing" },
  { key: "done", title: "Done" },
];

export default function BoardPage({ params }: { params: { projectId: string } }) {
  const tasks = mockDb.listTasks(params.projectId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Mock tasks for now. Next: real CRUD + drag/drop.
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
                {tasks.filter((t) => t.status === c.key).length}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {tasks
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
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
