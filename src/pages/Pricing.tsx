import type { IconType } from 'react-icons'
import { Link } from 'react-router'
import {
  FaArrowRight,
  FaCheck,
  FaCircleInfo,
  FaFileLines,
  FaLayerGroup,
  FaMobileScreenButton,
  FaPalette,
  FaPlug,
  FaRobot,
} from 'react-icons/fa6'
import Faq, { type FaqItem } from '../components/Faq'
import { businessAddress, businessId, contactPhone } from '../data/contactInfo'
import usePageMeta from '../hooks/usePageMeta'
import faqStructuredData from '../utils/faqStructuredData'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Pricing.css'

type Tier = {
  name: string
  service: string
  // Monthly website plans show a price. Everything else is quoted individually.
  monthly?: { price: number; terms: string }
  badge?: string
  featured?: boolean
  summary: string
  features: string[]
  bestFor: string
}

type TierGroup = {
  id: string
  eyebrow: string
  title: string
  intro: string
  tiers: Tier[]
}

const tierGroups: TierGroup[] = [
  {
    id: 'websites',
    eyebrow: 'Websites',
    title: 'Website plans',
    intro: 'Our website plans cover custom static websites. Every visitor sees the same content and there\'s no database behind the scenes, which keeps your site fast, simple, and secure. Instead of a large upfront bill, you pay a low monthly price that includes hosting, your domain, and updates. If you need features like accounts, booking, payments, or the ability to update content yourself, that\'s a web app, and any website we build can grow into one later.',
    tiers: [
      {
        name: '12-month plan',
        service: 'website-plan',
        monthly: { price: 65, terms: '$0 down · 12-month minimum' },
        badge: 'Best value',
        featured: true,
        summary: 'Get your website live with nothing due up front. Once you complete your 12 monthly payments, the website is yours.',
        features: [
          'Custom-designed static website that matches your brand',
          'Hosting, domain, and SSL included',
          'Mobile-friendly, fast-loading layout',
          'On-page SEO and Google Business Profile setup',
          'Contact form and analytics setup',
          'Content updates while you\'re on the plan',
          'Full ownership of your website after 12 months',
        ],
        bestFor: 'Businesses that want a professional website without a large upfront cost.',
      },
      {
        name: 'Month-to-month',
        service: 'website-plan',
        monthly: { price: 79, terms: '$250 setup · cancel anytime' },
        summary: 'The same website and support with no long-term commitment. A one-time setup fee gets you started, and you can cancel whenever you need to.',
        features: [
          'Everything included in the 12-month plan',
          'No long-term contract',
          'Cancel anytime',
          'Full ownership of your website after 12 monthly payments',
        ],
        bestFor: 'Businesses that value flexibility over the lowest monthly rate.',
      },
    ],
  },
  {
    id: 'apps',
    eyebrow: 'Web & mobile apps',
    title: 'Web app & mobile app development',
    intro: 'Apps add a database and real functionality to your organization, like user accounts, admin dashboards, and tools you can manage yourself. Every app is different, so each one is quoted individually after a free consultation. A self-service app is also more sustainable in the long run, because you are not paying someone every time something needs to change.',
    tiers: [
      {
        name: 'Web app',
        service: 'web-app',
        badge: 'Best for most small businesses',
        featured: true,
        summary: 'A website with a database and functionality behind it. Manage your own content, view usage and analytics, and give customers features that go beyond a static page.',
        features: [
          'Everything included in our websites',
          'Database to store your organization\'s data',
          'Admin dashboard for usage and analytics',
          'Self-service updates for things like weekly events, menus, or specials',
          'User accounts and secure sign in when needed',
        ],
        bestFor: 'Organizations that update their content regularly or want to offer real functionality for their customers or members, like signing up and logging in, booking appointments, making payments, or uploading documents.',
      },
      {
        name: 'Mobile app',
        service: 'mobile-app',
        summary: 'Similar to a web app, but built for phones, which takes more time and specialization. Pricing depends on whether you need iOS, Android, or both, and on the app\'s complexity.',
        features: [
          'Custom app for iPhone, Android, or both',
          'Customer accounts, rewards, ordering, or booking',
          'Push notifications to keep customers engaged',
          'App Store and Google Play publishing',
          'Usage analytics built in',
        ],
        bestFor: 'Businesses that want to stay on their customers\' home screens and keep them coming back.',
      },
      {
        name: 'Full tech suite',
        service: 'full-tech-suite',
        badge: 'Best value at scale',
        summary: 'Most businesses with a mobile app should also have a web app, with both sharing the same data through an API. This is where we can truly optimize your customer experience across every platform.',
        features: [
          'API that powers all of your apps from one source of data',
          'Web app plus iOS and Android apps',
          'Consistent experience across web and mobile',
          'Detailed analytics across every platform',
          'Data-driven optimization based on real usage',
        ],
        bestFor: 'Growing organizations ready to run their operations and customer experience through their own technology.',
      },
    ],
  },
  {
    id: 'seo-ai',
    eyebrow: 'SEO & AI',
    title: 'SEO & AI integration',
    intro: 'Grow what you\'ve already built. Search engine optimization helps more customers find you, and AI automation takes repetitive work off your plate so you can focus on what you do best. Both are quoted individually based on your goals.',
    tiers: [
      {
        name: 'SEO (standalone)',
        service: 'seo',
        summary: 'SEO is built into every new website and web app we create. For businesses with an existing website, we offer SEO as a standalone service with measurable results.',
        features: [
          'Technical SEO audit and fixes',
          'Local SEO and Google Business Profile improvements',
          'Keyword research and content recommendations',
          'Before and after analytics so you can see the impact',
        ],
        bestFor: 'Businesses with an existing website that isn\'t showing up on Google.',
      },
      {
        name: 'AI integration',
        service: 'ai-integration',
        summary: 'Pricing depends on the application and scale of the integration. AI features come with ongoing usage costs, so we explain those up front and keep them in mind when we plan your project.',
        features: [
          'AI chat assistants that know your business',
          'Automated lead responses and follow-ups',
          'Document processing and data entry automation',
          'Custom AI features inside your website or app',
          'Honest guidance on expected ongoing AI costs',
        ],
        bestFor: 'Teams spending hours each week on repetitive questions, paperwork, or data entry.',
      },
    ],
  },
]

const growthSteps = [
  {
    title: 'Start with what you need',
    text: 'Say you need a web app today and might want a mobile app someday. We build your web app on an API from day one, even though your web app is the only thing using it for now.',
  },
  {
    title: 'Prove the value',
    text: 'Put your web app to work, watch the analytics, and see the impact on your organization before you invest in anything more.',
  },
  {
    title: 'Add on when you\'re ready',
    text: 'When you\'re ready for a mobile app, it plugs into the same API and the same data. Everything you already have carries forward, so you\'re adding to it, not rebuilding it.',
  },
]

const upgradePaths = [
  ['Website plan', 'Web app'],
  ['Web app', 'Full tech suite'],
  ['Any website or app', 'SEO or AI integration'],
]

const priceFactors: { icon: IconType; title: string; text: string }[] = [
  {
    icon: FaFileLines,
    title: 'Screens and user flows',
    text: 'More app screens and steps for your users means more design and development time.',
  },
  {
    icon: FaLayerGroup,
    title: 'Features',
    text: 'User accounts, booking, payments, and admin dashboards each add functionality to build and test.',
  },
  {
    icon: FaMobileScreenButton,
    title: 'Platforms',
    text: 'A web app alone, iOS or Android, or all three working together from one shared API.',
  },
  {
    icon: FaPlug,
    title: 'Integrations',
    text: 'Connecting to the tools you already use, like your point of sale, CRM, or scheduling software.',
  },
  {
    icon: FaPalette,
    title: 'Design and content',
    text: 'Whether you already have a logo, photos, and written content, or need help creating them.',
  },
  {
    icon: FaRobot,
    title: 'AI usage and scale',
    text: 'How many people will use an AI feature and how much work it handles for your team.',
  },
]

const faqs: FaqItem[] = [
  {
    question: 'How much does a custom website cost?',
    answer: 'Our website plans start at $65 a month with $0 down and a 12-month minimum. If you would rather not commit to 12 months, our month-to-month plan is $79 a month with a one-time $250 setup fee, and you can cancel anytime. Both plans include a custom static website, hosting, your domain, and updates. Within reason, the number of pages does not change the price. Websites that need a database, user accounts, online booking, payments, or an admin dashboard are web apps, which are quoted individually.',
  },
  {
    question: 'When do I own my website?',
    answer: 'Your website and its code become yours once you have made 12 monthly payments, on either plan.',
  },
  {
    question: 'What happens after the first 12 months?',
    answer: 'You only pay what your hosting actually costs, with nothing added on top. If you want us to keep handling regular updates, you can add an updates plan for $35 a month plus hosting. Or you can just pay for hosting and request updates as you need them, billed per job. You are also free to take your website to another host.',
  },
  {
    question: 'What happens if I cancel my website plan early?',
    answer: 'If you cancel before you have made 12 monthly payments, your website is taken offline. If you would like to keep it, you can buy it out by paying the rest of your first 12 months, and the website is yours. On the 12-month plan, you are committed to the full 12 months when you sign up.',
  },
  {
    question: 'Can I buy my website outright instead of paying monthly?',
    answer: 'Yes. If you would rather pay for your website up front and own it from day one, reach out and we will put together a one-time price for you.',
  },
  {
    question: 'How much does a web app or mobile app cost?',
    answer: 'Every app is quoted individually because the work depends on the features, platforms, and integrations you need. After a free consultation, we give you a clear quote in writing before any work begins. Call us or start a project to talk through your idea and your budget.',
  },
  {
    question: 'How much does it cost to add AI to my business?',
    answer: 'It depends on the application and the scale of the integration, so AI work is quoted individually. AI features also have ongoing usage costs from AI providers, and we explain the expected ongoing costs up front so there are no surprises.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes. Websites are paid monthly through our website plans, starting at $0 down. For apps and other projects, we can split the cost into payments over time, and we are open to working out an arrangement that fits your situation.',
  },
  {
    question: 'Can I start with one service and add more later?',
    answer: 'Yes. You can start with the one service you need most and expand once it proves its value. For example, if you start with a web app but might want a mobile app in the future, we build your web app on an API from day one. When you\'re ready, your new mobile app connects to that same API and data, so you\'re adding on to what you already have instead of starting over.',
  },
  {
    question: 'Why does a web app cost more than a static website?',
    answer: 'A static website shows the same content to every visitor, while a web app adds a database and functionality like admin dashboards, user accounts, and self-service content updates. That takes more time to build, but it often saves money in the long run because you can make regular updates yourself instead of paying a developer each time.',
  },
  {
    question: 'Is SEO included with a new website?',
    answer: 'Yes. On-page SEO is built into every new website and web app we create. For businesses with an existing website, we offer standalone SEO with analytics from before and after our work so you can measure the impact.',
  },
  {
    question: 'Are there ongoing costs after my project launches?',
    answer: 'Website plans already include hosting, your domain, and updates. For apps and other projects, ongoing costs can include your domain name, hosting, and AI usage. We walk you through all of them up front so there are no surprises.',
  },
]

const seller = {
  '@type': 'ProfessionalService',
  '@id': businessId,
  name: 'Everyday Tech LLC',
  address: businessAddress,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'OfferCatalog',
      name: 'Everyday Tech LLC pricing',
      itemListElement: tierGroups.flatMap((group) =>
        group.tiers.map((tier) => ({
          '@type': 'Offer',
          name: tier.monthly ? `Website ${tier.name.toLowerCase()}` : tier.name,
          itemOffered: { '@type': 'Service', name: tier.name, description: tier.summary },
          ...(tier.monthly
            ? {
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  priceCurrency: 'USD',
                  price: tier.monthly.price,
                  unitCode: 'MON',
                  unitText: 'month',
                },
              }
            : {}),
          seller,
        })),
      ),
    },
    faqStructuredData(faqs),
  ],
}

function Pricing() {
  usePageMeta(
    'Custom Website & App Pricing | West Michigan | Everyday Tech',
    'Custom website plans start at $65/month with $0 down. Web apps, mobile apps, SEO, and AI integrations are quoted individually. Call or reach out to talk through pricing.',
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page pricing-header">
        <div className="page__inner">
          <p className="page__eyebrow">Pricing</p>
          <h1 className="page__title">
            How much does a custom website or app{' '}
            <span className="home_content__highlight">cost?</span>
          </h1>
          <p className="page__intro">
            Websites have simple monthly pricing with nothing due up front. Apps, SEO, and AI
            integrations are custom work, so each one is quoted individually based on what your
            business needs. We work with small businesses in Big Rapids, Grand Rapids, across West
            Michigan, and nationwide.
          </p>
          <div className="pricing-note">
            <FaCircleInfo aria-hidden className="pricing-note__icon" />
            <p className="pricing-note__text">
              Have a budget in mind or a unique situation? Call{' '}
              <a href={contactPhone.href} className="pricing-note__link">
                {contactPhone.label}
              </a>{' '}
              or{' '}
              <Link to="/start-project" className="pricing-note__link">
                start a project
              </Link>{' '}
              to talk it through. We're happy to work with you to find something that fits.
            </p>
          </div>
          <nav className="pricing-jump" aria-label="Pricing categories">
            {tierGroups.map((group) => (
              <Link key={group.id} to={`#${group.id}`} className="pricing-jump__link">
                {group.eyebrow}
              </Link>
            ))}
            <Link to="#grow" className="pricing-jump__link">
              Grow as you go
            </Link>
            <Link to="#payment-plans" className="pricing-jump__link">
              Flexible payments
            </Link>
          </nav>
        </div>
      </section>

      {tierGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={`home_content__section pricing-group${index % 2 === 0 ? ' home_content__section--alt' : ''}`}
        >
          <div className="home_content__inner">
            <p className="home_content__eyebrow">{group.eyebrow}</p>
            <h2 className="home_content__title">{group.title}</h2>
            <p className="pricing-group__intro">{group.intro}</p>
            <div className="pricing-grid">
              {group.tiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`pricing-card${tier.featured ? ' pricing-card--featured' : ''}`}
                >
                  {tier.badge && <span className="pricing-card__badge">{tier.badge}</span>}
                  <h3 className="pricing-card__name">{tier.name}</h3>
                  {tier.monthly ? (
                    <>
                      <p className="pricing-card__price">
                        ${tier.monthly.price}
                        <span className="pricing-card__price-unit">/month</span>
                      </p>
                      <p className="pricing-card__terms">{tier.monthly.terms}</p>
                    </>
                  ) : (
                    <>
                      <p className="pricing-card__price">Custom quote</p>
                      <p className="pricing-card__terms">Priced individually · free consultation</p>
                    </>
                  )}
                  <p className="pricing-card__summary">{tier.summary}</p>
                  <ul className="pricing-card__features">
                    {tier.features.map((feature) => (
                      <li key={feature} className="pricing-card__feature">
                        <FaCheck aria-hidden className="pricing-card__check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="pricing-card__best">
                    <strong>Best for:</strong> {tier.bestFor}
                  </p>
                  <Link
                    to={`/start-project?service=${tier.service}`}
                    className="hero__button hero__button--primary pricing-card__cta"
                  >
                    {tier.monthly ? 'Get started' : 'Get a free quote'}
                  </Link>
                </article>
              ))}
            </div>
            {group.id === 'websites' && (
              <div className="pricing-note pricing-ownership">
                <FaCircleInfo aria-hidden className="pricing-note__icon" />
                <div className="pricing-note__text">
                  <p>
                    <strong>How ownership works:</strong> your website and its code become yours
                    once you've made 12 monthly payments on either plan. If you cancel before then,
                    your website is taken offline, or you can buy it out by paying the rest of your
                    first 12 months.
                  </p>
                  <p>
                    <strong>After 12 months:</strong> you only pay what your hosting actually costs,
                    with nothing added on top. Keep regular updates for $35/month plus hosting, or
                    request updates as you need them. You're also free to move your website
                    anywhere you like.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      <section id="grow" className="home_content__section pricing-group pricing-growth">
        <div className="home_content__inner">
          <p className="home_content__eyebrow">Grow as you go</p>
          <h2 className="home_content__title">
            Start with one service, <span className="home_content__highlight">add more</span> as
            you grow
          </h2>
          <p className="pricing-group__intro">
            You don't have to build everything at once. We design every project to grow with your
            business, so you can start with the service that makes sense today and add on later
            without starting over.
          </p>
          <div className="home_content__grid">
            {growthSteps.map((step, index) => (
              <div key={step.title} className="home_content__step">
                <span className="home_content__step-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="home_content__card-title">{step.title}</h3>
                <p className="home_content__card-text">{step.text}</p>
              </div>
            ))}
          </div>
          <h3 className="pricing-growth__paths-title">Popular ways to grow</h3>
          <ul className="pricing-growth__paths">
            {upgradePaths.map(([from, to]) => (
              <li key={`${from}-${to}`} className="pricing-growth__path">
                {from}
                <FaArrowRight aria-hidden className="pricing-growth__arrow" />
                <strong>{to}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="payment-plans" className="pricing-plans">
        <div className="home_content__inner">
          <p className="home_content__eyebrow pricing-plans__eyebrow">Flexible payments</p>
          <h2 className="home_content__title">
            Payment options that fit your{' '}
            <span className="home_content__highlight">situation</span>
          </h2>
          <p className="pricing-plans__intro">
            Every business is in a different spot, and we're open to working with yours. If you'd
            rather buy your website outright instead of paying monthly, we can do that. If you
            want to spread an app project across several payments, or start small and build from
            there, we can do that too. Reach out and we'll find an arrangement that gets you a
            website or app that represents your business and helps it grow.
          </p>
          <div className="hero__actions pricing-plans__actions">
            <a href={contactPhone.href} className="hero__button hero__button--primary">
              Call {contactPhone.label}
            </a>
            <Link to="/contact" className="hero__button hero__button--secondary">
              Send a message
            </Link>
          </div>
        </div>
      </section>

      <section className="home_content__section">
        <div className="home_content__inner">
          <p className="home_content__eyebrow">What affects the price</p>
          <h2 className="home_content__title">
            Why apps are <span className="home_content__highlight">priced individually</span>
          </h2>
          <p className="pricing-group__intro">
            Two apps can sound similar and still require very different amounts of work. These are
            the biggest factors that shape the price of an app, SEO, or AI project. In your free
            consultation, we'll go through each of them and give you a clear quote.
          </p>
          <div className="home_content__grid">
            {priceFactors.map(({ icon: Icon, title, text }) => (
              <div key={title} className="home_content__card">
                <span className="home_content__icon">
                  <Icon />
                </span>
                <h3 className="home_content__card-title">{title}</h3>
                <p className="home_content__card-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home_content__section home_content__section--alt">
        <div className="home_content__inner pricing-faq">
          <p className="home_content__eyebrow">FAQ</p>
          <h2 className="home_content__title">
            Pricing <span className="home_content__highlight">questions</span>
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="home_content__section home_content__section--cta">
        <div className="home_content__inner home_content__cta">
          <h2 className="home_content__title">
            Let's talk about your <span className="home_content__highlight">project</span>
          </h2>
          <p className="home_content__intro">
            Tell us what you have in mind and we'll put together a price and payment plan that
            works for you. Meet in person in West Michigan or over video anywhere in the US.
          </p>
          <div className="hero__actions">
            <Link to="/start-project" className="hero__button hero__button--primary">
              Start a project
            </Link>
            <a href={contactPhone.href} className="hero__button hero__button--secondary">
              Call {contactPhone.label}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing
