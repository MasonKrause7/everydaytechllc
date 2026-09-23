import type { ComponentType } from "react";
import { InquiryForm } from "@/components/marketing/InquiryForm";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </svg>
  );
}

type Service = {
  title: string;
  icon: ComponentType;
  tagline: string;
  includes: string[];
  value: string;
};

const services: Service[] = [
  {
    title: "Websites",
    icon: GlobeIcon,
    tagline: "A website that brings you customers — not just one that looks nice.",
    includes: [
      "Design built around your business, not a template",
      "Works great on phones, tablets, and computers",
      "Set up to show up on Google",
      "Contact forms, maps, and online booking",
    ],
    value:
      "Most customers look you up online before they ever call. A clear, fast website turns those lookers into paying customers.",
  },
  {
    title: "Mobile apps",
    icon: PhoneIcon,
    tagline: "Your business, right in your customers' pockets.",
    includes: [
      "One app for both iPhone and Android",
      "Ordering, booking, or loyalty for customers",
      "Tools for your team out in the field",
      "App store setup handled for you",
    ],
    value:
      "An app keeps you one tap away — easier reorders, faster booking, and customers who come back more often.",
  },
  {
    title: "Desktop apps",
    icon: MonitorIcon,
    tagline: "Real software for the computers in your office.",
    includes: [
      "Built for Windows and Mac",
      "Quoting, scheduling, inventory, and more",
      "Fast and reliable on your own machines",
      "Works with your printers and other equipment",
    ],
    value:
      "For work that happens at a desk or a counter, a dedicated app beats juggling spreadsheets and browser tabs — faster, with fewer mistakes.",
  },
  {
    title: "AI integrations",
    icon: SparklesIcon,
    tagline: "Put AI to work on the repetitive stuff.",
    includes: [
      "Chat helpers that answer common customer questions",
      "Drafting quotes, emails, and paperwork",
      "Connected to the tools you already use",
      "Set up so your team can actually use it",
    ],
    value:
      "AI is great at busywork — answering FAQs, summarizing, drafting. That frees you and your team up for the work that actually needs a human.",
  },
];

const steps = [
  {
    step: "01",
    title: "Tell me the problem",
    body: "Share what's broken or what you want to launch. We'll agree on what \u201cdone\u201d looks like.",
  },
  {
    step: "02",
    title: "Watch it take shape",
    body: "Regular updates with screenshots and notes as the work moves. Never radio silence.",
  },
  {
    step: "03",
    title: "Launch and keep improving",
    body: "Ship it, train your team if needed, and keep a clear path for what's next.",
  },
];

const differentiators = [
  {
    title: "You talk to the builder",
    body: "You work directly with me, from first call to launch. No middlemen, no miscommunication.",
  },
  {
    title: "Senior quality, small-business pricing",
    body: "I use AI tools to build faster, so you get senior-level work without the agency price tag.",
  },
  {
    title: "You own it all",
    body: "Everything I build is yours — your website, your app, your data. You're never stuck with me.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-accent uppercase">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="hero-atmosphere pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 70% 20%, rgba(31, 166, 160, 0.28), transparent 55%),
              radial-gradient(ellipse 55% 45% at 15% 80%, rgba(21, 127, 122, 0.22), transparent 50%),
              linear-gradient(165deg, #0b1f2a 0%, #122f3c 48%, #0b1f2a 100%)
            `,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243,246,244,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(243,246,244,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 60% 40%, black 20%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-32 pb-24 md:px-8">
          <div className="animate-fade-up">
            <Eyebrow>Everyday Tech LLC</Eyebrow>
          </div>
          <h1 className="animate-fade-up-delay-1 mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Technology that earns its place in a small business.
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            Websites, mobile and desktop apps, and AI tools for your business — built
            by a senior engineer, priced for small-business budgets.
          </p>
          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#inquire"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Start a project
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition hover:border-white/50 hover:bg-white/5"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-line bg-surface px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Why Everyday Tech</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            No agency bloat. Just software that works.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-surface-elevated p-7"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="border-b border-line bg-surface-elevated px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What I deliver
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <service.icon />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 font-medium text-ink">{service.tagline}</p>
                <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  What&apos;s included
                </p>
                <ul className="mt-3 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                    Why it matters
                  </p>
                  <p className="mt-2 leading-relaxed text-ink/80">
                    {service.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="how-it-works"
        className="border-b border-line bg-surface px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            From idea to launch, without the mystery
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-line bg-surface-elevated p-7"
              >
                <p className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.16em] text-accent">
                  {item.step}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INQUIRE */}
      <section
        id="inquire"
        className="bg-surface-elevated px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Tell me what you&apos;re building
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Describe the problem you&apos;re trying to solve. I&apos;ll
              reply with honest next steps — usually within a couple of
              business days.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
