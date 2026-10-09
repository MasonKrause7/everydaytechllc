import type { IconType } from 'react-icons'
import { Link } from 'react-router'
import {
  FaArrowRight,
  FaAward,
  FaChartLine,
  FaCheck,
  FaCloudArrowUp,
  FaCode,
  FaComments,
  FaGlobe,
  FaHandHoldingDollar,
  FaKey,
  FaLightbulb,
  FaLocationDot,
  FaMobileScreenButton,
  FaPlus,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import Faq, { type FaqItem } from '../components/Faq'
import { contactEmail, contactPhone } from '../data/contactInfo'
import usePageMeta from '../hooks/usePageMeta'
import faqStructuredData from '../utils/faqStructuredData'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Services.css'

type Service = {
  id: string
  icon: IconType
  label: string
  name: string
  title: string
  lead: string
  paragraphs: string[]
  included: string[]
  benefits: string[]
  pricing: string
  pricingAnchor: string
  intakeQuery?: string
  proof?: string
}

const services: Service[] = [
  {
    id: 'websites',
    icon: FaGlobe,
    label: 'Websites',
    name: 'Website design & development',
    title: 'Websites that bring in customers',
    lead: 'For most customers, your website is their first impression of your organization. Whether they find you on Google, through a social post, or from a friend\'s recommendation, they look you up before they call, visit, or buy. A slow, outdated, or hard-to-use website quietly sends them to a competitor.',
    paragraphs: [
      'We design and build custom websites for small businesses and organizations in Big Rapids, across West Michigan, and nationwide. Every site is written from scratch to fit your brand and your goals instead of being squeezed into a generic template. The result is a fast, mobile-friendly website that ranks well in search engines and makes it easy for visitors to take the next step, whether that means calling you, booking an appointment, requesting a quote, placing an order, or signing up for an event.',
      'Unlike website builders that charge monthly fees forever and lock your content into their platform, you own your website outright. And unlike large agencies, you work directly with the engineer building it, so your project never gets lost in a chain of account managers.',
    ],
    included: [
      'Custom design that matches your brand',
      'Mobile-first layouts for phones, tablets, and desktops',
      'On-page SEO: titles, descriptions, structured data, and sitemaps',
      'Google Business Profile and local search setup',
      'Contact forms, booking, quote requests, and online ordering',
      'Page speed and Core Web Vitals optimization',
      'Accessibility best practices',
      'Analytics and conversion tracking from day one',
      'Domain, hosting, and SSL setup',
    ],
    benefits: [
      'Get found by customers searching on Google',
      'Earn trust with a professional first impression',
      'Turn visitors into calls, bookings, and sales',
      'Stop renting a template you will never own',
    ],
    pricing: 'Websites start around $400',
    pricingAnchor: 'websites',
  },
  {
    id: 'mobile-apps',
    icon: FaMobileScreenButton,
    label: 'Mobile apps',
    name: 'iOS & Android app development',
    title: 'Your business, on your customers\' home screens',
    lead: 'A mobile app keeps your brand one tap away. Customers who install your app are some of your most loyal, and an app gives you a direct line to them through push notifications, rewards, and exclusive offers, without paying for ads or fighting a social media algorithm.',
    paragraphs: [
      'We build custom mobile apps for iPhone and Android. That includes customer-facing apps like rewards programs, daily deals, online ordering, and appointment booking, as well as internal tools that streamline your operations, such as scheduling, document uploads, e-signatures, checklists, and employee management. We handle the entire process, from design and development to App Store and Google Play publishing and updates after launch.',
      'Custom apps used to be reserved for companies with large budgets and in-house development teams. We make them achievable for small businesses and organizations with focused feature sets, flexible payment arrangements, and a build approach that lets your app grow alongside you.',
    ],
    included: [
      'Native-quality apps for iOS and Android',
      'Customer accounts and secure sign in',
      'Push notifications',
      'Rewards, loyalty programs, and daily deals',
      'Online ordering, booking, and payments',
      'Workflow tools: scheduling, document uploads, e-signatures',
      'Backend, database, and admin dashboard',
      'App Store and Google Play publishing',
    ],
    benefits: [
      'Bring customers back more often with rewards and notifications',
      'Replace paper forms and spreadsheets with one app',
      'Stand out from competitors who don\'t have an app',
      'Learn what your customers want from real usage data',
    ],
    pricing: 'Mobile apps start around $1,500',
    pricingAnchor: 'apps',
    intakeQuery: '?service=mobile-app',
    proof: 'See the iOS and Android apps we built for SCT Training and Axis',
  },
  {
    id: 'cloud-migrations',
    icon: FaCloudArrowUp,
    label: 'Cloud migrations',
    name: 'Cloud data migration',
    title: 'Get your data out of spreadsheets and into the cloud',
    lead: 'Plenty of small businesses and organizations still run on spreadsheets, shared Google Docs, paper forms, and other manual processes. They work until they don\'t: files get duplicated, numbers stop matching, only one person knows where everything lives, and answering a simple question about your organization takes an afternoon of digging.',
    paragraphs: [
      'We migrate your data into a secure, cloud-based database designed around how your organization actually works. Your customers, members, orders, inventory, jobs, or records end up in one organized place that you can access from anywhere, and that\'s ready to power dashboards, reports, apps, and automation. We clean up duplicates and inconsistencies along the way, and your current process keeps running until the new system is ready, so nothing gets lost in the switch.',
      'Already have a server or an existing system, but not sure where your data is stored or how to use it? We\'ll track it down, untangle it, and help you take control of it. From there, we can build a dashboard around your data so you can see what\'s happening across your organization at a glance, instead of leaving years of valuable information sitting unused.',
    ],
    included: [
      'Review of your current spreadsheets, documents, and systems',
      'Cloud database designed around how you operate',
      'Data cleanup, deduplication, and formatting',
      'Migration with your current process running until launch',
      'Recovering and organizing data from existing servers and systems',
      'Custom dashboards built on your data',
      'User accounts and access controls for your team',
      'Training for you and your team',
    ],
    benefits: [
      'Keep all of your data in one organized place',
      'Access your data securely from anywhere',
      'Stop losing time to duplicate and outdated files',
      'Turn data you already have into real answers',
    ],
    pricing: 'Quoted after a free consultation',
    pricingAnchor: 'apps',
  },
  {
    id: 'data-analytics',
    icon: FaChartLine,
    label: 'Data analytics',
    name: 'Business data & analytics',
    title: 'Make decisions backed by real data',
    lead: 'Most small businesses and organizations already have valuable data sitting in their point of sale system, website, spreadsheets, and social media accounts. The problem is that it\'s scattered across platforms and hard to turn into answers. Which marketing actually brings in customers? Which products are the most profitable? Where are people dropping off before they buy?',
    paragraphs: [
      'We connect your data sources and turn them into clear, easy-to-read dashboards and reports, so you can see what\'s working at a glance. Every product we build includes analytics from the start, and we use that data to continuously improve the customer experience and increase your conversion rates over time.',
      'Whether you have an existing tech suite or we build you a new one, we help you define the numbers that matter for your business, track them accurately, and act on them with confidence.',
    ],
    included: [
      'Custom dashboards and reporting',
      'Website and app analytics setup',
      'Conversion and sales funnel tracking',
      'Connecting your POS, CRM, spreadsheets, and other tools',
      'Automated weekly and monthly reports',
      'A/B testing and conversion rate optimization',
    ],
    benefits: [
      'Know which marketing dollars actually bring in customers',
      'Spot trends before they become problems',
      'Spend less time building spreadsheets by hand',
      'Grow revenue by steadily improving conversion rates',
    ],
    pricing: 'Built into every app we build',
    pricingAnchor: 'apps',
    proof: 'See the analytics dashboards we built into Busy Bee',
  },
  {
    id: 'ai-integrations',
    icon: FaWandMagicSparkles,
    label: 'AI integrations',
    name: 'AI automation & integrations',
    title: 'Practical AI, sized for small teams',
    lead: 'AI can now take on much of the repetitive work that eats up a small business owner\'s day: answering common customer questions, drafting emails and quotes, sorting paperwork, and entering data. Used well, it frees you and your team up for the work that matters most.',
    paragraphs: [
      'AI is only worth it if it\'s reliable. We bring hands-on experience building AI features to small businesses and local organizations, with practical tools that solve real problems instead of chasing hype.',
      'We start by learning how your organization runs and identifying where AI can save you the most time or money. Then we build solutions that work with the tools you already use, with careful attention to accuracy, privacy, and keeping a human in the loop where it matters. If AI isn\'t the right fit for a problem, we\'ll tell you.',
    ],
    included: [
      'AI chat assistants that know your business',
      'Automated lead responses and follow-ups',
      'Document processing and data entry automation',
      'AI-assisted content like product descriptions and social posts',
      'Custom AI features inside your website or app',
      'Workflow automation that connects your existing tools',
    ],
    benefits: [
      'Answer customer questions around the clock',
      'Cut hours of repetitive admin work every week',
      'Respond to new leads faster than your competitors',
      'Get more done without adding staff',
    ],
    pricing: 'AI integrations start around $2,000',
    pricingAnchor: 'seo-ai',
    intakeQuery: '?service=ai-integration',
    proof: 'See how Giggle Tales uses generative AI to create illustrated story books',
  },
  {
    id: 'app-ideas',
    icon: FaLightbulb,
    label: 'App ideas',
    name: 'App idea development',
    title: 'Have an idea for an app? Let\'s build it together',
    lead: 'You don\'t need to own a business to work with us. If you have an idea for an app that solves a real problem, but not the technical background or the team to build it, we want to hear it.',
    paragraphs: [
      'Pitch us your idea and we\'ll talk it through together: who it\'s for, what it needs to do, and what it would take to bring it to life. If it\'s a good fit, we can design, build, and launch it on the web, iPhone, and Android, with the same engineering standards we bring to every client we work with.',
      'A successful app takes both a great idea and a lot of work to build, and we believe both deserve to be rewarded. That\'s why we discuss ownership openly before any work begins. You can pay for development and own your app outright, or we can explore a partnership where we share ownership in exchange for a lower upfront cost. Whatever we agree on is put in writing, so everyone is compensated fairly for both the idea and the work.',
    ],
    included: [
      'A free conversation about your idea',
      'Honest feedback on feasibility and scope',
      'Planning the first version: features, screens, and priorities',
      'Design and development for web, iOS, and Android',
      'Backend, database, and analytics',
      'App Store and Google Play publishing',
      'Ownership terms agreed on in writing up front',
    ],
    benefits: [
      'No business required, just a good idea',
      'Turn your idea into a real, working product',
      'Choose the ownership option that fits you',
      'Get fairly rewarded for your idea',
    ],
    pricing: 'Flexible ownership & payment options',
    pricingAnchor: 'payment-plans',
    intakeQuery: '?intent=idea',
  },
  {
    id: 'more',
    icon: FaPlus,
    label: 'SEO & more',
    name: 'SEO, custom software & tech consulting',
    title: 'Whatever your tech needs, we can help',
    lead: 'Not every project fits neatly in a box. If technology is slowing your team down, or you have an idea that no off-the-shelf product quite solves, we\'d love to hear about it.',
    paragraphs: [
      'Search engine optimization is one of the most valuable investments a local business or organization can make. We help you show up when people in Big Rapids, Grand Rapids, and across West Michigan search for the products and services you offer, through technical SEO, local search optimization, Google Business Profile improvements, and content that answers your customers\' questions.',
      'We also build custom web applications, customer portals, and integrations between the tools you already use. Not sure what you need? Book a free consultation and we\'ll help you figure out the right solution, even if that turns out to be an existing product instead of something custom.',
    ],
    included: [
      'Search engine optimization (SEO)',
      'Local SEO and Google Business Profile optimization',
      'Custom web applications and customer portals',
      'Software integrations and APIs',
      'Website redesigns and migrations',
      'Ongoing maintenance, hosting, and support',
      'Technology consulting',
    ],
    benefits: [
      'Rank higher in local Google searches',
      'Automate the processes that slow you down',
      'Have one trusted partner for all of your tech',
      'Start with a free consultation to find the right fit',
    ],
    pricing: 'Standalone SEO starts around $500',
    pricingAnchor: 'seo-ai',
    proof: 'See how Queue-less replaced the food truck line with QR code ordering',
  },
]

const serviceAreas = [
  'Big Rapids',
  'Grand Rapids',
  'Mount Pleasant',
  'Cadillac',
  'Reed City',
  'Ludington',
  'Muskegon',
  'Greenville',
  'Fremont',
  'Newaygo',
  'Mecosta County',
  'Osceola County',
]

const reasons: { icon: IconType; title: string; text: string }[] = [
  {
    icon: FaKey,
    title: 'You own everything',
    text: 'Every line of code we write belongs to you. Your codebase is shared with you, so you are never locked in and can always hire another developer to build on it later.',
  },
  {
    icon: FaAward,
    title: 'Professional engineering',
    text: 'You get the engineering standards of a large tech company at a price that makes sense for small teams and tight budgets.',
  },
  {
    icon: FaHandHoldingDollar,
    title: 'Flexible payments',
    text: 'Custom software shouldn\'t require a massive upfront investment. Pay half when we sign and half at delivery, or split your project into as many as 8 payments.',
  },
  {
    icon: FaComments,
    title: 'Talk to your engineer',
    text: 'No account managers or ticket queues. You work directly with the person building your product, and we share progress often so you\'re involved in every key decision.',
  },
  {
    icon: FaCode,
    title: 'Built from scratch',
    text: 'No bloated templates or page builders. Your solution is designed around how your organization actually works, and built to grow as you do.',
  },
  {
    icon: FaChartLine,
    title: 'Data-driven from day one',
    text: 'Analytics are built into everything we make, so you can measure results, see your return on investment, and keep improving after launch.',
  },
]

const faqs: FaqItem[] = [
  {
    question: 'How much does a custom website or app cost?',
    answer: 'Single-page websites start around $400, multi-page websites around $650, web apps around $1,000, and mobile apps around $1,500. Every project is different, so final pricing depends on the time and complexity involved, and we give you a clear quote after a free consultation, before any work begins. Our pricing page has a full breakdown, including our flexible payment plans.',
  },
  {
    question: 'Do you meet with clients in person?',
    answer: 'Yes. We\'re based in Big Rapids, Michigan, and offer in-person consultations for businesses and organizations throughout West Michigan, including Grand Rapids, Mount Pleasant, Cadillac, Reed City, Ludington, and Muskegon. We\'re also happy to meet over video call.',
  },
  {
    question: 'Do you work with clients outside of Michigan?',
    answer: 'Absolutely. We work with small businesses and organizations across the United States. Remote clients get the same experience through video calls, a shared design document, and frequent progress updates.',
  },
  {
    question: 'Will I own the code for my website or app?',
    answer: 'Yes. Every solution is built from scratch and you have full proprietary ownership. We share the codebase with you, so you can always bring in another agency or developer to build on top of it later. The only exception is if you choose a shared-ownership partnership for an app idea, in which case ownership is split exactly as we agree to in writing.',
  },
  {
    question: 'Can you move my organization off of spreadsheets?',
    answer: 'Yes. We migrate data from spreadsheets, Google Docs and Sheets, paper records, and existing servers or systems into a secure cloud database designed around how you work. We clean up the data along the way and can build dashboards on top of it, so you can actually use the information you\'ve been collecting.',
  },
  {
    question: 'I don\'t have a business, but I have an app idea. Can you help?',
    answer: 'Absolutely. Tell us about your idea and we\'ll talk through what it would take to build. Before any work begins, we discuss ownership options, whether that means paying for development and owning the app outright, or partnering on it with shared ownership in exchange for a lower upfront cost, so everyone is compensated fairly.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer: 'Timelines depend on scope. A focused small business website comes together much faster than a mobile app with a custom backend. Your design document includes an estimated timeline, and we share progress throughout development so you always know where things stand.',
  },
  {
    question: 'Can you help my business show up higher on Google?',
    answer: 'Yes. Every website we build includes on-page SEO, and we offer ongoing local SEO services like Google Business Profile optimization and content strategy. No one can honestly guarantee a #1 ranking, but we focus on the proven fundamentals that help local customers find you.',
  },
  {
    question: 'Is AI a good fit for my business?',
    answer: 'Often, yes, especially if you spend a lot of time on repetitive tasks like answering the same customer questions, entering data, or writing follow-up emails. In a free consultation, we\'ll look at how your team works and give you an honest assessment of where AI can help and where it can\'t.',
  },
  {
    question: 'What happens after my project launches?',
    answer: 'We make sure your product is fully deployed and help train you and your team. From there, you can use the analytics dashboards we provide to manage things on your own, or choose continued support where we monitor usage data and handle updates for you.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'Everyday Tech LLC',
      description:
        'Custom websites, mobile apps, cloud data migrations, data analytics, and AI integrations for small businesses and organizations in Big Rapids, West Michigan, and nationwide, plus app development for individuals with app ideas.',
      email: contactEmail,
      telephone: contactPhone.number,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Big Rapids',
        addressRegion: 'MI',
        addressCountry: 'US',
      },
      areaServed: [
        ...serviceAreas.map((name) => ({
          '@type': name.endsWith('County') ? 'AdministrativeArea' : 'City',
          name: `${name}, MI`,
        })),
        { '@type': 'State', name: 'Michigan' },
        { '@type': 'Country', name: 'United States' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name, description: service.lead },
        })),
      },
    },
    faqStructuredData(faqs),
  ],
}

function Services() {
  usePageMeta(
    'Web Design & App Development in Big Rapids, MI | Everyday Tech',
    'Custom websites, mobile apps, cloud data migrations, analytics, and AI for small businesses and organizations in Big Rapids and West Michigan. Free in-person consultations.',
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page services-header">
        <div className="page__inner">
          <p className="page__eyebrow">Services</p>
          <h1 className="page__title">
            Websites, apps &amp; software for{' '}
            <span className="home_content__highlight">West Michigan</span> small businesses
          </h1>
          <p className="page__intro">
            Everyday Tech is a software company based in Big Rapids, Michigan. We build custom
            websites, mobile apps, cloud databases, data analytics, and AI integrations for small
            businesses and organizations, with free in-person consultations across West Michigan
            and clients nationwide. Every solution is built from scratch, priced for smaller budgets,
            and 100% owned by you. Not a business owner? If you have a great app idea, we'd love to
            hear it.
          </p>
          <nav className="services-nav" aria-label="Services">
            {services.map(({ id, icon: Icon, label }) => (
              <Link key={id} to={`#${id}`} className="services-nav__link">
                <Icon aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`home_content__section service${index % 2 === 0 ? ' home_content__section--alt' : ''}`}
        >
          <div className="home_content__inner service__inner">
            <div className="service__content">
              <span className="home_content__icon">
                <service.icon />
              </span>
              <p className="service__eyebrow">{service.name}</p>
              <h2 className="home_content__title">{service.title}</h2>
              <p className="service__lead">{service.lead}</p>
              {service.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="service__text">
                  {paragraph}
                </p>
              ))}
              <ul className="service__benefits">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="service__benefit">
                    <FaCheck aria-hidden className="service__benefit-icon" />
                    {benefit}
                  </li>
                ))}
              </ul>
              {service.proof && (
                <Link to="/our-work" className="service__proof">
                  {service.proof} <FaArrowRight aria-hidden />
                </Link>
              )}
            </div>

            <aside className="service__card">
              <h3 className="service__card-title">What's included</h3>
              <ul className="service__included">
                {service.included.map((item) => (
                  <li key={item} className="service__included-item">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="service__pricing">
                <span className="service__pricing-label">{service.pricing}</span>
                <Link to={`/pricing#${service.pricingAnchor}`} className="service__pricing-link">
                  See pricing →
                </Link>
              </div>
              <Link
                to={`/start-project${service.intakeQuery ?? ''}`}
                className="hero__button hero__button--primary service__cta"
              >
                Get a free consultation
              </Link>
            </aside>
          </div>
        </section>
      ))}

      <section className="services-local">
        <div className="home_content__inner services-local__inner">
          <div>
            <p className="home_content__eyebrow services-local__eyebrow">
              <FaLocationDot aria-hidden /> Big Rapids, Michigan
            </p>
            <h2 className="home_content__title">
              Locally owned, proudly serving{' '}
              <span className="home_content__highlight">West Michigan</span>
            </h2>
            <p className="services-local__text">
              The best software comes from truly understanding your organization, and there's no
              substitute for sitting down together face to face. That's why we offer free
              in-person consultations for businesses and organizations in Big Rapids and throughout
              West Michigan. We'll meet you where it's convenient, learn how you operate, and
              talk through what technology can do for you.
            </p>
            <p className="services-local__text">
              Not in Michigan? We work with clients across the United States through video
              calls, shared design documents, and frequent progress updates, so you get the same
              level of communication wherever you are.
            </p>
          </div>
          <div>
            <h3 className="services-local__areas-title">Communities we serve in person</h3>
            <ul className="services-local__areas">
              {serviceAreas.map((area) => (
                <li key={area} className="services-local__area">
                  {area}
                </li>
              ))}
              <li className="services-local__area services-local__area--accent">
                + Remote, nationwide
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home_content__section">
        <div className="home_content__inner">
          <p className="home_content__eyebrow">Why Everyday Tech</p>
          <h2 className="home_content__title">
            The value of an agency, the attention of a{' '}
            <span className="home_content__highlight">local partner</span>
          </h2>
          <div className="home_content__grid">
            {reasons.map(({ icon: Icon, title, text }) => (
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
        <div className="home_content__inner services-faq">
          <p className="home_content__eyebrow">FAQ</p>
          <h2 className="home_content__title">
            Frequently asked <span className="home_content__highlight">questions</span>
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="home_content__section home_content__section--cta">
        <div className="home_content__inner home_content__cta">
          <h2 className="home_content__title">
            Ready to grow your <span className="home_content__highlight">business</span>?
          </h2>
          <p className="home_content__intro">
            Book a free consultation, in person in West Michigan or over video anywhere in the US.
            We'll talk through your goals and recommend the right solution for your budget.
          </p>
          <Link to="/start-project" className="hero__button hero__button--primary">
            Get started for free
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services
