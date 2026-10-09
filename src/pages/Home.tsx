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
import consultationPhoto from '../assets/home/consultation.jpg'
import writingCodePhoto from '../assets/home/writing-code.jpg'
import '../styles/pages/Home.css'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Websites · Mobile Apps · Data analytics · AI integrations</p>
          <h1 className="hero__title">
            <span className="hero__highlight">Technology</span> that works as hard as your
            small <span className="hero__highlight">business.</span>
          </h1>
          <p className="hero__subtitle">
            Everyday Tech builds custom software solutions for all. You have a vision, we want to help you realize it. 
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
                  Traditional custom software took a team to build and cost too much for the average small business or local organization.
                  We eliminate that barrier by offering tailored solutions that fit your needs, and your budget. 
                  We offer flexible payment arrangements, so that your organization can start scaling as soon as possible. 
                  Solutions are built from scratch - we write the code, and you have full proprietary ownership.
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
                  A strong website helps new customers and community members find you, leaves a lasting first impression, and builds trust in your brand.
                  We specialize in building effective, modern websites that you can be proud of, without incurring a massive up front expense.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaMobileScreenButton /></span>
                <h3 className="home_content__card-title">Mobile apps</h3>
                <p className="home_content__card-text">
                  Mobile apps are a great way to keep your brand top of mind. 
                  Offer rewards programs, daily deals, and other incentives to keep your customers engaged. 
                  Or, manage your workflows (document uploads, e-signatures, scheduling, etc) through your very own app in the app store.  
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaCloudArrowUp /></span>
                <h3 className="home_content__card-title">Cloud migrations</h3>
                <p className="home_content__card-text">
                  Still running your organization on spreadsheets, Google Docs, or paper? We migrate your data to a secure cloud database so it's organized and ready to use.
                  Have a server or existing system but aren't sure where your data lives? We'll help you take control of it and build a dashboard around it.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaChartLine /></span>
                <h3 className="home_content__card-title">Data analytics</h3>
                  <p className="home_content__card-text">
                    Whether you have an existing tech suite or we build you a new one, we believe in making data backed decisions. We build analytics into every product and track data closely to optimize the customer experience and improve your conversion rates over time.
                  </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaWandMagicSparkles /></span>
                <h3 className="home_content__card-title">AI integrations</h3>
                <p className="home_content__card-text">
                  AI can now take on much of the repetitive work that eats up your day, like answering common questions, drafting emails, and entering data.
                  We bring big-tech AI experience to small businesses and local organizations. Let's chat and see if an AI automation could benefit your team.
                </p>
              </div>
              <div className="home_content__card">
                <span className="home_content__icon"><FaPlus /></span>
                <h3 className="home_content__card-title">And more!</h3>
                <p className="home_content__card-text">
                  We also offer services such as search engine optimization to help your business perform better in search engine rankings like Google. 
                  If you have any tech need, reach out for a free consultation and we will help get you started.
                </p>
              </div>
            </div>
            <div className="home_content__idea">
              <span className="home_content__icon"><FaLightbulb /></span>
              <div>
                <h3 className="home_content__card-title">Not a business? Bring us your app idea.</h3>
                <p className="home_content__card-text">
                  You don't need a business to work with us. If you have a great idea for an app, pitch it to us and we'll talk through what it takes to build it.
                  We discuss ownership options up front, so everyone is compensated fairly for both the idea and the work to bring it to life.
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
              Our simple <span className="home_content__highlight">3 step</span> delivery process
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
                <h3 className="home_content__card-title">Initial Consultation</h3>
                <p className="home_content__card-text">
                  In this step, we get to know you, your organization, your brand, and your goals and vision for the future. 
                  If our services fit your needs, we discuss how we can help you reach those goals, how we can quantify and track the results, and what your budget and timeline are for the project.
                  Once we agree on the terms, we can begin the project by finalizing a contract.
                </p>
              </div>
              <div className="home_content__step">
                <span className="home_content__step-number">02</span>
                <h3 className="home_content__card-title">Design and Implementation</h3>
                <p className="home_content__card-text">
                  This is where the code is written. We start with a detailed design document that includes the system requirements and an estimated timeline for the project.
                  We share the design document so you can follow along as we develop your product. 
                  We believe communication is key to come up with the best possible product, so we share progress often and keep you involved in the design decisions throughout the development process.
                </p>
              </div>
              <div className="home_content__step">
                <span className="home_content__step-number">03</span>
                <h3 className="home_content__card-title">Delivery and Continued Support</h3>
                <p className="home_content__card-text">
                  We make sure that your product is fully deployed and accessible, and assist with training on a new system.
                  Your codebase is shared with you so that you have access and could always hire other agencies/developers to build on top of it later. 
                  We can provide analytics dashboards so you can maintain and optimize on your own moving forward, or we offer continued support where we analyze usage data and provide updates for you.  
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
              Schedule your free initial consultation today, we'd love to hear your ideas :)
            </p>
            <Link to="/start-project" className="hero__button hero__button--primary">
              Get started for free
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
