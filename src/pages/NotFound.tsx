import { Link } from 'react-router'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'

function NotFound() {
  usePageMeta(
    'Page Not Found | Everyday Tech',
    'The page you were looking for could not be found.',
  )

  return (
    <section className="page">
      <meta name="robots" content="noindex" />
      <div className="page__inner">
        <p className="page__eyebrow">404</p>
        <h1 className="page__title">
          We couldn't find that <span className="home_content__highlight">page</span>
        </h1>
        <p className="page__intro">
          The link may be broken, or the page may have moved. Head back home or take a look at
          what we offer.
        </p>
        <div className="hero__actions page__actions">
          <Link to="/" className="hero__button hero__button--primary">
            Back to home
          </Link>
          <Link to="/services" className="hero__button hero__button--secondary">
            See services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
