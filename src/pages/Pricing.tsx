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
import usePageMeta from '../hooks/usePageMeta'
import faqStructuredData from '../utils/faqStructuredData'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Pricing.css'

type Tier = {
  name: string
  min: number
  max: number
  openEnded?: boolean
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
    title: 'Custom website pricing',
    intro: 'A static website is an affordable starting point for establishing a professional online presence. Every visitor sees the same content and there\'s no database behind the scenes, which keeps it simple, fast, and secure. If you want to update your own content or offer features like accounts, booking, or payments, a web app is the better fit, and any website we build can grow into one later.',
    tiers: [
      {
        name: 'Single-page website',
        min: 400,
        max: 600,
        badge: 'Most affordable',
        summary: 'Our most affordable option. A clean, professional landing page that grabs your customers\' attention and leaves a great first impression of your brand.',
        features: [
          'One custom-designed page that matches your brand',
          'Mobile-friendly, fast-loading layout',
          'Clear calls to action like call, email, or get directions',
          'Basic on-page SEO',
          'Help setting up your domain and hosting',
        ],
        bestFor: 'New businesses and anyone who needs a professional web presence fast.',
      },
      {
        name: '3-page website',
        min: 650,
        max: 1000,
        badge: 'A good starting point to gain visibility',
        summary: 'A clean landing page that captures attention and makes a strong first impression, plus room for the content that helps you rank on Google.',
        features: [
          'Up to 3 custom pages, such as Home, Services, and About',
          'Contact form so customers can reach you directly',
          'On-page SEO across every page',
          'Mobile-friendly, fast-loading layout',
          'Analytics setup to see how visitors find you',
        ],
        bestFor: 'Established local businesses that want to be found on Google and turn visitors into customers.',
      },
    ],
  },
  {
    id: 'apps',
    eyebrow: 'Web & mobile apps',
    title: 'Web app & mobile app development pricing',
    intro: 'Apps add a database and real functionality to your business, like user accounts, admin dashboards, and tools you can manage yourself. A self-service app costs a bit more up front, but it is more sustainable and cost-efficient in the long run because you are not paying someone every time something needs to change.',
    tiers: [
      {
        name: 'Web app',
        min: 1000,
        max: 3000,
        badge: 'Best for most small businesses',
        featured: true,
        summary: 'A website with a database and functionality behind it. Manage your own content, view usage and analytics, and give customers features that go beyond a static page.',
        features: [
          'Everything included in our websites',
          'Database to store your business data',
          'Admin dashboard for usage and analytics',
          'Self-service updates for things like weekly events, menus, or specials',
          'User accounts and secure sign in when needed',
        ],
        bestFor: 'Businesses that update their content regularly or want to offer real functionality for their customers, like signing up and logging in, booking appointments, making payments, or uploading documents.',
      },
      {
        name: 'Mobile app',
        min: 1500,
        max: 5000,
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
        min: 3000,
        max: 7000,
        openEnded: true,
        badge: 'Best value at scale',
        summary: 'Most businesses with a mobile app should also have a web app, with both sharing the same data through an API. This is where we can truly optimize your customer experience across every platform.',
        features: [
          'API that powers all of your apps from one source of data',
          'Web app plus iOS and Android apps',
          'Consistent experience across web and mobile',
          'Detailed analytics across every platform',
          'Data-driven optimization based on real usage',
        ],
        bestFor: 'Growing businesses ready to run their operations and customer experience through their own technology.',
      },
    ],
  },
  {
    id: 'seo-ai',
    eyebrow: 'SEO & AI',
    title: 'SEO & AI integration pricing',
    intro: 'Grow the business you already have. Search engine optimization helps more customers find you, and AI automation takes repetitive work off your plate so you can focus on what you do best.',
    tiers: [
      {
        name: 'SEO (standalone)',
        min: 500,
        max: 1000,
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
        min: 2000,
        max: 10000,
        summary: 'Pricing depends on the application and scale of the integration. AI features come with ongoing usage costs, so we keep our development pricing as lean as possible to help offset them.',
        features: [
          'AI chat assistants that know your business',
          'Automated lead responses and follow-ups',
          'Document processing and data entry automation',
          'Custom AI features inside your website or app',
          'Honest guidance on expected ongoing AI costs',
        ],
        bestFor: 'Businesses spending hours each week on repetitive questions, paperwork, or data entry.',
      },
    ],
  },
]

const paymentPlans = [
  {
    count: '2',
    title: 'Standard',
    text: '50% when we finalize your contract and 50% when your project is delivered.',
  },
  {
    count: '4',
    title: 'Split',
    text: 'Split your project into 4 payments over time to keep cash flow manageable.',
  },
  {
    count: '8',
    title: 'Extended',
    text: 'Spread the cost across as many as 8 payments, so you can start growing now and pay as your new tools start earning their keep.',
  },
]

const growthSteps = [
  {
    title: 'Start with what you need',
    text: 'Say you need a web app today and might want a mobile app someday. We build your web app on an API from day one, even though your web app is the only thing using it for now.',
  },
  {
    title: 'Prove the value',
    text: 'Put your web app to work, watch the analytics, and see the impact on your business before you invest in anything more.',
  },
  {
    title: 'Add on when you\'re ready',
    text: 'When you\'re ready for a mobile app, it plugs into the same API and the same data. Everything you already have carries forward, so you\'re adding to it, not rebuilding it.',
  },
]

const upgradePaths = [
  ['Single-page website', '3-page website'],
  ['Website', 'Web app'],
  ['Web app', 'Full tech suite'],
  ['Any website or app', 'SEO or AI integration'],
]

const priceFactors: { icon: IconType; title: string; text: string }[] = [
  {
    icon: FaFileLines,
    title: 'Pages and screens',
    text: 'More pages or app screens means more design and development time.',
  },
  {
    icon: FaLayerGroup,
    title: 'Features',
    text: 'User accounts, booking, payments, and admin dashboards each add functionality to build and test.',
  },
  {
    icon: FaMobileScreenButton,
    title: 'Platforms',
    text: 'A website alone, iOS or Android, or all three working together from one shared API.',
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
    text: 'How many people will use an AI feature and how much work it handles for your business.',
  },
]

const faqs: FaqItem[] = [
  {
    question: 'How much does a custom website cost?',
    answer: 'A single-page custom website typically costs $400 to $600, and a 3-page website typically costs $650 to $1,000. Websites that need a database, user accounts, online booking, payments, or an admin dashboard fall into our web app tier, the best fit for most small businesses, which typically ranges from $1,000 to $3,000. Final pricing depends on the time and complexity involved, and we provide an exact quote after a free consultation.',
  },
  {
    question: 'How much does it cost to build a mobile app?',
    answer: 'A mobile app typically costs $1,500 to $5,000, depending on whether you need iOS, Android, or both, and on how complex the app is. If you also need a web app that shares the same data, a full tech suite with an API, web app, and mobile apps typically ranges from $3,000 to $7,000 or more.',
  },
  {
    question: 'How much does it cost to add AI to my business?',
    answer: 'AI integrations typically range from $2,000 to $10,000, depending on the application and the scale of the integration. AI features also have ongoing usage costs from AI providers, so we keep our development pricing as lean as possible and explain the expected ongoing costs up front.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes. Our standard arrangement is 50% when we finalize your contract and 50% when your project is delivered. We can also split your project into 4 payments, or as many as 8 payments over time.',
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
    answer: 'Yes. On-page SEO is built into every new website and web app we create. For businesses with an existing website, standalone SEO typically ranges from $500 to $1,000 and includes analytics from before and after our work so you can measure the impact.',
  },
  {
    question: 'Are there ongoing costs after my project launches?',
    answer: 'Depending on your project, ongoing costs can include your domain name, hosting, and AI usage. We walk you through all of them up front so there are no surprises. Continued support, where we monitor your analytics and handle updates for you, is optional.',
  },
  {
    question: 'Are these prices final?',
    answer: 'No. These ranges are meant to give you a general idea of what to expect. Every project is different, so final pricing is decided per project based on the time and complexity involved, and agreed on in writing before any work begins.',
  },
]

const formatPrice = (tier: Tier) =>
  `$${tier.min.toLocaleString('en-US')} – $${tier.max.toLocaleString('en-US')}${tier.openEnded ? '+' : ''}`

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'OfferCatalog',
      name: 'Everyday Tech LLC pricing',
      itemListElement: tierGroups.flatMap((group) =>
        group.tiers.map((tier) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: tier.name, description: tier.summary },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: tier.min,
            ...(tier.openEnded ? {} : { maxPrice: tier.max }),
          },
          seller: {
            '@type': 'ProfessionalService',
            name: 'Everyday Tech LLC',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Big Rapids',
              addressRegion: 'MI',
              addressCountry: 'US',
            },
          },
        })),
      ),
    },
    faqStructuredData(faqs),
  ],
}

function Pricing() {
  usePageMeta(
    'Custom Website & App Pricing | Big Rapids, MI | Everyday Tech',
    'How much does a custom website cost? See starting prices for websites, web apps, mobile apps, SEO, and AI integrations, plus flexible payment plans.',
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
            Most web developers make you book a call before they'll talk about price. We think you
            deserve a straight answer. Here's what small businesses in Big Rapids, across West
            Michigan, and nationwide can expect to invest in a custom website, app, SEO, or AI
            integration with Everyday Tech.
          </p>
          <div className="pricing-note">
            <FaCircleInfo aria-hidden className="pricing-note__icon" />
            <p className="pricing-note__text">
              These are ballpark ranges to give you a general idea. Every project is different, so
              final pricing is decided per project based on the time and complexity involved, and
              agreed on in writing before any work begins.
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
              Payment plans
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
                  <p className="pricing-card__price">{formatPrice(tier)}</p>
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
                    to="/start-project"
                    className="hero__button hero__button--primary pricing-card__cta"
                  >
                    Get a free quote
                  </Link>
                </article>
              ))}
            </div>
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
          <p className="home_content__eyebrow pricing-plans__eyebrow">Payment plans</p>
          <h2 className="home_content__title">
            Flexible payments that fit your{' '}
            <span className="home_content__highlight">cash flow</span>
          </h2>
          <p className="pricing-plans__intro">
            A great website or app should pay for itself, and you shouldn't have to drain your
            savings to get started. Choose the payment schedule that works for your business.
          </p>
          <div className="pricing-plans__grid">
            {paymentPlans.map((plan) => (
              <div key={plan.count} className="pricing-plans__card">
                <span className="pricing-plans__count">{plan.count}</span>
                <span className="pricing-plans__unit">payments</span>
                <h3 className="pricing-plans__title">{plan.title}</h3>
                <p className="pricing-plans__text">{plan.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home_content__section">
        <div className="home_content__inner">
          <p className="home_content__eyebrow">What affects the price</p>
          <h2 className="home_content__title">
            Why every project is <span className="home_content__highlight">priced individually</span>
          </h2>
          <p className="pricing-group__intro">
            Two websites can look similar and still require very different amounts of work. These
            are the biggest factors that move a project toward the low or high end of its range.
            In your free consultation, we'll go through each of them and give you an exact quote.
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
            Get an exact <span className="home_content__highlight">quote</span> for free
          </h2>
          <p className="home_content__intro">
            Tell us about your project and we'll put together a clear quote and payment plan. Meet
            in person in West Michigan or over video anywhere in the US.
          </p>
          <Link to="/start-project" className="hero__button hero__button--primary">
            Start a project
          </Link>
        </div>
      </section>
    </>
  )
}

export default Pricing
