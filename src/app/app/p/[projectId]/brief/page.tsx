import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function BriefPage({ params }: { params: { projectId: string } }) {
  async function generate(formData: FormData) {
    "use server";
    const briefText = String(formData.get("briefText") || "").trim();
    if (!briefText) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/projects/${params.projectId}/plan`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefText }),
      }
    );

    if (!res.ok) {
      // For demo: fail loud.
      throw new Error(await res.text());
    }

    revalidatePath(`/app/p/${params.projectId}/board`);
    revalidatePath(`/app/p/${params.projectId}/brief`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Brief</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Paste the project brief, generate tasks, then go to the board.
        </p>
      </div>

      <form
        action={generate}
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <label className="grid gap-2">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">
            Brief text
          </span>
          <textarea
            name="briefText"
            required
            className="min-h-48 rounded-md border bg-[var(--background)] p-3 text-sm outline-none"
            style={{ borderColor: "var(--border)" }}
            placeholder="Paste the assignment brief here..."
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            type="submit"
          >
            Generate tasks
          </button>
          <Link
            href={`/app/p/${params.projectId}/board`}
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            style={{ borderColor: "var(--border)" }}
          >
            Go to board
          </Link>
        </div>

        <div className="mt-3 text-xs text-[var(--muted-foreground)]">
          Uses Groq + inserts tasks into Supabase.
        </div>
      </form>
    </div>
  );
}
