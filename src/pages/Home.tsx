import { Link } from 'react-router'
import {
  FaArrowRight,
  FaChartLine,
  FaCloudArrowUp,
  FaGlobe,
  FaLightbulb,
  FaMobileScreenButton,
  FaPlus,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import consultationPhoto from '../assets/home/consultation.webp'
import writingCodePhoto from '../assets/home/writing-code.webp'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Home.css'

function Home() {
  usePageMeta(
    'Everyday Tech LLC | Websites, Apps & AI for West Michigan Small Businesses',
    'Everyday Tech builds affordable custom websites, mobile apps, data analytics, and AI integrations for small businesses in Big Rapids, Grand Rapids, and across West Michigan. Free consultations and flexible payment plans.',
  )

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Websites · Mobile apps · Data analytics · AI integrations</p>
          <h1 className="hero__title">
            <span className="hero__highlight">Technology</span> that works as hard as your
            small <span className="hero__highlight">business.</span>
          </h1>
          <p className="hero__subtitle">
            Everyday Tech builds custom websites, apps, and AI tools for small businesses,
            organizations, and anyone with a great idea. You have the vision, and we'll help you
            make it real.
          </p>
          <div className="hero__actions">
            <Link to="/start-project" className="hero__button hero__button--primary">
              Start a project
            </Link>
            <Link to="/services" className="hero__button hero__button--secondary">
              See services
            </Link>
          </div>
        </div>
      </section>
      <section className="home_content">
        <div className="home_content__section">
          <div className="home_content__inner">
            <div className="home_content__feature">
              <div>
                <p className="home_content__eyebrow">What we do</p>
                <h2 className="home_content__title">
                  Affordable <span className="home_content__highlight">custom solutions</span>
                </h2>
                <p className="home_content__intro">
                  Custom software used to take a whole team to build, and it cost too much for the
                  average small business or local organization. We remove that barrier with tailored
                  solutions that fit your needs and your budget, plus flexible payment plans so your
                  organization can start growing right away. Everything is built from scratch: we
                  write the code, and you own it outright.
                </p>
              </div>
              <figure className="home_content__photo home_content__photo--framed">
                <img
                  src={writingCodePhoto}
                  alt="Close-up of hands typing on a laptop keyboard"
                  width={1200}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
            <div className="home_content__grid">
              <div className="home_content__card">
                <span className="home_content__icon"><FaGlobe /></span>
                <h3 className="home_content__card-title">Websites</h3>
                <p className="home_content__card-text">
                  A strong website helps new customers and community members find you, leaves a
                  lasting first impression, and builds trust in your brand. We build effective,
                  modern websites you can be proud of, without a massive upfront expense.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaMobileScreenButton /></span>
                <h3 className="home_content__card-title">Mobile apps</h3>
                <p className="home_content__card-text">
                  Mobile apps are a great way to keep your brand top of mind. Offer rewards
                  programs, daily deals, and other incentives to keep your customers engaged, or run
                  your workflows (document uploads, e-signatures, scheduling, and more) through your
                  own app in the App Store and Google Play.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaCloudArrowUp /></span>
                <h3 className="home_content__card-title">Cloud migrations</h3>
                <p className="home_content__card-text">
                  Still running your organization on spreadsheets, Google Docs, or paper? We migrate
                  your data to a secure cloud database so it's organized and ready to use. Have a
                  server or existing system but aren't sure where your data lives? We'll help you
                  take control of it and build a dashboard around it.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaChartLine /></span>
                <h3 className="home_content__card-title">Data analytics</h3>
                <p className="home_content__card-text">
                  Whether you have an existing tech suite or we build you a new one, we believe in
                  making data-backed decisions. We build analytics into every product and track the
                  numbers closely to improve the customer experience and your conversion rates over
                  time.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaWandMagicSparkles /></span>
                <h3 className="home_content__card-title">AI integrations</h3>
                <p className="home_content__card-text">
                  AI can now take on much of the repetitive work that eats up your day, like
                  answering common questions, drafting emails, and entering data. We bring big-tech
                  AI experience to small businesses and local organizations. Let's chat and see if
                  AI automation could benefit your team.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaPlus /></span>
                <h3 className="home_content__card-title">And more!</h3>
                <p className="home_content__card-text">
                  We also offer search engine optimization (SEO) to help your business rank higher
                  on Google. Whatever your tech needs, reach out for a free consultation and we'll
                  help you get started.
                </p>
              </div>
            </div>
            <div className="home_content__idea">
              <span className="home_content__icon"><FaLightbulb /></span>
              <div>
                <h3 className="home_content__card-title">Not a business? Bring us your app idea.</h3>
                <p className="home_content__card-text">
                  You don't need a business to work with us. If you have a great idea for an app,
                  pitch it to us and we'll talk through what it takes to build it. We discuss
                  ownership options up front, so everyone is compensated fairly for both the idea
                  and the work to bring it to life.
                </p>
              </div>
              <div className="home_content__idea-actions">
                <Link to="/start-project?intent=idea" className="hero__button hero__button--primary">
                  Pitch your idea
                </Link>
                <Link to="/services#app-ideas" className="home_content__idea-link">
                  How it works <FaArrowRight aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home_content__section home_content__section--alt">
          <div className="home_content__inner">
            <p className="home_content__eyebrow">How it works</p>
            <h2 className="home_content__title">
              Our simple <span className="home_content__highlight">3-step</span> delivery process
            </h2>
            <figure className="home_content__photo home_content__photo--banner">
              <img
                src={consultationPhoto}
                alt="Two people talking through a project on a laptop at a cafe table"
                width={2000}
                height={1334}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="home_content__grid">
              <div className="home_content__step">
                <span className="home_content__step-number">01</span>
                <h3 className="home_content__card-title">Initial consultation</h3>
                <p className="home_content__card-text">
                  We get to know you, your organization, your brand, and your vision for the
                  future. If we're a good fit, we discuss how we can help you reach your goals, how
                  we'll measure and track the results, and what your budget and timeline look like.
                  Once we agree on terms, we finalize a contract and get started.
                </p>
              </div>
              <div className="home_content__step">
                <span className="home_content__step-number">02</span>
                <h3 className="home_content__card-title">Design and implementation</h3>
                <p className="home_content__card-text">
                  This is where the code gets written. We start with a detailed design document
                  that lays out the system requirements and an estimated timeline, and we share it
                  with you so you can follow along as we build. Communication is key to building the
                  best possible product, so we share progress often and keep you involved in design
                  decisions throughout development.
                </p>
              </div>
              <div className="home_content__step">
                <span className="home_content__step-number">03</span>
                <h3 className="home_content__card-title">Delivery and continued support</h3>
                <p className="home_content__card-text">
                  We make sure your product is fully deployed and accessible, and we help train you
                  and your team on the new system. Your codebase is shared with you, so you always
                  have access and can hire another agency or developer to build on it later. From
                  there, you can use the analytics dashboards we provide to maintain and optimize
                  things on your own, or choose continued support where we analyze usage data and
                  handle updates for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home_content__section home_content__section--cta">
          <div className="home_content__inner home_content__cta">
            <h2 className="home_content__title">
              Let's bring your <span className="home_content__highlight">vision</span> to life
            </h2>
            <p className="home_content__intro">
              Schedule your free initial consultation today, in person anywhere from Big Rapids to
              Grand Rapids or over video anywhere in the US. We'd love to hear your ideas :)
            </p>
            <div className="hero__actions">
              <Link to="/book" className="hero__button hero__button--primary">
                Book a free consultation
              </Link>
              <Link to="/start-project" className="hero__button hero__button--secondary">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
