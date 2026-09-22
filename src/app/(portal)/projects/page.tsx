import Link from "next/link";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
        Your projects
      </h1>
      <p className="mt-3 text-muted">
        Customer project views land in Phase B — screenshots, notes, and live
        progress will show up here after login.
      </p>
      <Link href="/" className="mt-8 text-sm font-medium text-accent-deep">
        ← Home
      </Link>
    </div>
  );
}
