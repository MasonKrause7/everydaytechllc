import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#inquire", label: "Start a project" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Logo inverted />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/75 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="rounded-md border border-white/25 px-3.5 py-1.5 text-sm text-white/90 transition hover:border-white/50 hover:bg-white/5"
          >
            Client login
          </Link>
        </nav>
        <Link
          href="/login"
          className="text-sm text-white/80 md:hidden"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
