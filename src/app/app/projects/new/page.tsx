export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          This will become a real create flow once Supabase is wired.
        </p>
      </div>

      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Coming next</div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted-foreground)]">
          <li>Create room</li>
          <li>Invite link</li>
          <li>Upload PDF brief</li>
          <li>Generate milestones + tasks</li>
        </ul>
      </div>
    </div>
  );
}
