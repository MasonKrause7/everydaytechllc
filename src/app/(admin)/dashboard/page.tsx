import Link from "next/link";

export const metadata = {
  title: "Admin",
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
        Pipeline & CRM
      </h1>
      <p className="mt-3 text-muted">
        Admin dashboard stub for Phase B: attention queue, deadlines, and client
        conversation notes.
      </p>
      <Link href="/" className="mt-8 text-sm font-medium text-accent-deep">
        ← Home
      </Link>
    </div>
  );
}
