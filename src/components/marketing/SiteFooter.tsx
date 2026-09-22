import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="space-y-3">
          <Logo inverted />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Websites, mobile apps, and AI helpers for small businesses.
          </p>
        </div>
        <div className="text-sm text-white/55">
          <p>
            <a
              href="mailto:hello@everydaytechllc.com"
              className="transition hover:text-white"
            >
              hello@everydaytechllc.com
            </a>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Everyday Tech LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
