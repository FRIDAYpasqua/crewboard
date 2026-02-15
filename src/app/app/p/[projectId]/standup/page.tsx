export default function StandupPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Standup</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Async daily check-in. Next: save responses + summarize with LLM.
        </p>
      </div>

      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Today</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          Project: {params.projectId}
        </div>

        <div className="mt-4 grid gap-3">
          <label className="grid gap-2">
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              What did you do?
            </span>
            <textarea
              className="min-h-20 rounded-md border bg-[var(--background)] p-3 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
              placeholder="Shipped X, fixed Y..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              What will you do next?
            </span>
            <textarea
              className="min-h-20 rounded-md border bg-[var(--background)] p-3 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
              placeholder="Next I will..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              Blockers?
            </span>
            <textarea
              className="min-h-16 rounded-md border bg-[var(--background)] p-3 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
              placeholder="Waiting on... / stuck because..."
            />
          </label>

          <button
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            type="button"
          >
            Submit (stub)
          </button>

          <div className="mt-4 rounded-md border bg-[var(--background)] p-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              Summary (stub)
            </div>
            <div className="mt-2 text-sm text-[var(--muted-foreground)]">
              Once Supabase is connected, we’ll generate a team digest + risks here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
