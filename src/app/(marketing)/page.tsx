import { InquiryForm } from "@/components/marketing/InquiryForm";

const services = [
  {
    title: "Websites that win customers",
    body: "Fast, clear sites that turn visitors into leads — and you own every pixel.",
  },
  {
    title: "Custom apps & automations",
    body: "Internal tools and customer portals that replace spreadsheets and manual follow-up.",
  },
  {
    title: "Practical AI, minus the hype",
    body: "Assistants and smart features wired into the tools your team already uses.",
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
    body: "One senior engineer from first call to launch. No account managers, no telephone game.",
  },
  {
    title: "Senior quality, small-business pricing",
    body: "AI-accelerated development means experienced engineering without the agency markup.",
  },
  {
    title: "You own it all",
    body: "Your code, your data, your infrastructure. No lock-in, no hostage situations.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.18em] text-accent uppercase">
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
          <h1 className="animate-fade-up-delay-1 mt-5 max-w-3xl font-[family-name:var(--font-syne)] text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Technology that earns its place in a small business.
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            Custom websites, apps, and AI integrations — built by a senior
            engineer, priced for small-business budgets.
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
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            No agency bloat. Just software that works.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-surface-elevated p-7"
              >
                <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
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
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What I deliver
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
              >
                <div
                  className="mb-5 h-1 w-10 rounded-full bg-accent transition-all duration-300 group-hover:w-16"
                  aria-hidden
                />
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
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
          <h2 className="mt-4 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            From idea to launch, without the mystery
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-line bg-surface-elevated p-7"
              >
                <p className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.16em] text-accent">
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

      {/* MSP */}
      <section
        id="partners"
        className="border-b border-line bg-ink px-6 py-20 text-white md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.18em] text-accent uppercase">
            For MSPs
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            Custom code without the headcount
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
            When a client needs development outside your stack, I plug in as
            engineering support — scoped builds and clean integrations,
            documented and handed off. You keep the relationship; I handle
            the code.
          </p>
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
            <h2 className="mt-4 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
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
