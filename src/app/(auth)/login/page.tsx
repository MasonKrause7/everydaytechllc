import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";

export const metadata = {
  title: "Client login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-surface">
      <div className="px-6 py-6 md:px-8">
        <Logo />
      </div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
          Client login
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          Project portals are coming next. You’ll use this space to follow
          screenshots, notes, and progress on work in flight.
        </p>
        <div className="mt-8 rounded-md border border-line bg-surface-elevated px-5 py-6">
          <p className="text-sm text-muted">
            Authentication isn’t enabled yet. If you already have an active
            project, email{" "}
            <a
              href="mailto:hello@everydaytechllc.com"
              className="text-accent-deep underline-offset-2 hover:underline"
            >
              hello@everydaytechllc.com
            </a>{" "}
            for a status update.
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 text-sm font-medium text-ink transition hover:text-accent-deep"
        >
          ← Back to Everyday Tech
        </Link>
      </div>
    </div>
  );
}
