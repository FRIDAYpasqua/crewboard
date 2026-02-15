import Link from "next/link";

export default function AppHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          MVP in progress. For now, everything is mocked until Supabase creds land.
        </p>
      </div>

      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Quick start</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          Create a project, upload the brief, generate tasks, then run the daily
          standup.
        </div>
        <div className="mt-4 flex gap-3">
          <Link
            href="/app/projects/new"
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            New project
          </Link>
          <Link
            href="/app/projects"
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            style={{ borderColor: "var(--border)" }}
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
