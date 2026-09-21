import Link from "next/link";
import { InquiryForm } from "@/components/marketing/InquiryForm";

const services = [
  {
    title: "Websites that work for the business",
    body: "Clear messaging, fast pages, and forms that turn visitors into leads — built so you can own and update them.",
  },
  {
    title: "Custom apps & workflows",
    body: "Internal tools, customer portals, and automation that replace spreadsheets and manual follow-up.",
  },
  {
    title: "Practical AI integrations",
    body: "Assistants, document handling, and smart features wired into the tools your team already uses — no science project.",
  },
];

const steps = [
  {
    step: "01",
    title: "Share the problem",
    body: "Submit a project idea. We’ll clarify goals, constraints, and what “done” looks like.",
  },
  {
    step: "02",
    title: "Build in the open",
    body: "You get a client space with screenshots and notes as the work moves — not radio silence until launch day.",
  },
  {
    step: "03",
    title: "Ship and stay close",
    body: "Launch, train your team if needed, and keep a clear path for the next improvement.",
  },
];

export default function HomePage() {
  return (
    <>
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

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:justify-center md:px-8 md:pb-24 md:pt-28">
          <p className="animate-fade-up font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.18em] text-accent uppercase">
            Everyday Tech LLC
          </p>
          <h1 className="animate-fade-up-delay-1 mt-5 max-w-3xl font-[family-name:var(--font-syne)] text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Technology that earns its place in a small business.
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            I build websites, apps, and AI integrations that save time and
            create clarity — and partner with MSPs when they need custom code
            their stack doesn’t cover.
          </p>
          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#inquire"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Start a project
            </a>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/50 hover:bg-white/5"
            >
              Client login
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Built for owners who need results, not another vendor.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Most small businesses don’t need a bloated platform. They need a
              site that converts, a tool that removes busywork, or an
              integration that connects the systems they already trust.
            </p>
            <p>
              Everyday Tech is a focused engineering practice: one builder,
              clear communication, and software that fits how you actually
              operate.
            </p>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="border-b border-line bg-surface-elevated px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What I deliver
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Outcomes first — shipped code that your customers and team can use
            this quarter.
          </p>
          <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {services.map((service) => (
              <li key={service.title}>
                <div className="mb-4 h-1 w-10 bg-accent" aria-hidden />
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-b border-line bg-surface px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            How engagement works
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From first idea to a living project portal — so you always know
            where things stand.
          </p>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((item) => (
              <li key={item.step}>
                <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.16em] text-accent uppercase">
                  {item.step}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="partners"
        className="border-b border-line bg-ink px-6 py-20 text-white md:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
              Partnering with MSPs
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              When a client needs custom development outside your standard
              stack, I plug in as engineering support — scoped builds,
              integrations, and one-off tools without adding headcount.
            </p>
          </div>
          <p className="text-lg leading-relaxed text-white/70 md:border-l md:border-white/15 md:pl-12">
            Keep the customer relationship. I’ll handle the custom coding,
            document what shipped, and hand off cleanly when the work is done.
          </p>
        </div>
      </section>

      <section
        id="inquire"
        className="bg-surface-elevated px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Start with a project idea
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Tell me what you’re trying to fix or launch. I’ll review it and
              reply with next steps — usually within a couple of business days.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
