import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Demo mode: creates a project in Supabase via server API.
        </p>
      </div>

      <form
        className="grid gap-3 rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
        action={async (formData) => {
          "use server";
          const name = String(formData.get("name") || "").trim();
          const description = String(formData.get("description") || "").trim();

          const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
          });

          if (!res.ok) throw new Error(await res.text());
          // For MVP speed: no redirect, user can go to Projects list.
        }}
      >
        <label className="grid gap-2">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">
            Name
          </span>
          <input
            name="name"
            required
            className="h-10 rounded-md border bg-[var(--background)] px-3 text-sm outline-none"
            style={{ borderColor: "var(--border)" }}
            placeholder="History presentation"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">
            Description (optional)
          </span>
          <textarea
            name="description"
            className="min-h-24 rounded-md border bg-[var(--background)] p-3 text-sm outline-none"
            style={{ borderColor: "var(--border)" }}
            placeholder="What are we building?"
          />
        </label>

        <button
          className="mt-2 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          type="submit"
        >
          Create
        </button>

        <div className="text-xs text-[var(--muted-foreground)]">
          After creating, go to <Link className="underline" href="/app/projects">Projects</Link>.
        </div>
      </form>
    </div>
  );
}
