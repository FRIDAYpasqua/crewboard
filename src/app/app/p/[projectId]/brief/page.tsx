export default function BriefPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Brief</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Upload a PDF. Next: text extraction + planning.
        </p>
      </div>

      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">PDF upload (stub)</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          Project: {params.projectId}
        </div>
        <div className="mt-4">
          <input
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-[var(--muted-foreground)] file:mr-4 file:rounded-md file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--accent-foreground)]"
          />
          <div className="mt-3 text-xs text-[var(--muted-foreground)]">
            Storage will be Supabase. Extraction will be server-side.
          </div>
        </div>
      </div>
    </div>
  );
}
