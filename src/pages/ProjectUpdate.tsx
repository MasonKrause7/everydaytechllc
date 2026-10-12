import { FaEnvelope, FaPhone } from 'react-icons/fa6'
import BookingCalendar from '../components/BookingCalendar'
import { projectUpdateCalLink } from '../data/booking'
import { contactEmail, contactPhone } from '../data/contactInfo'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Contact.css'
import '../styles/pages/Book.css'

function ProjectUpdate() {
  usePageMeta(
    'Book a Project Update | Everyday Tech',
    'Current Everyday Tech clients can schedule a meeting to check on progress, review work, or talk through changes to an ongoing project.',
  )

  return (
    <>
      <meta name="robots" content="noindex" />
      <section className="page contact-header">
        <div className="page__inner">
          <p className="page__eyebrow">Current clients</p>
          <h1 className="page__title">
            Book a project <span className="home_content__highlight">update</span>
          </h1>
          <p className="page__intro">
            Want to check on progress, review the latest work, or talk through a change? Pick a
            time that works for you and we'll walk through where your project stands.
          </p>
        </div>
      </section>

      <section className="home_content__section home_content__section--alt">
        <div className="home_content__inner book">
          <BookingCalendar calLink={projectUpdateCalLink} />
          <p className="contact__text book__urgent">
            Something urgent? Skip the calendar and reach out directly.
          </p>
          <ul className="book__types book__types--compact">
            <li className="contact__detail">
              <span className="contact__detail-icon">
                <FaPhone aria-hidden />
              </span>
              <div>
                <p className="contact__detail-label">Call or text</p>
                <a href={contactPhone.href} className="contact__detail-link">
                  {contactPhone.label}
                </a>
              </div>
            </li>
            <li className="contact__detail">
              <span className="contact__detail-icon">
                <FaEnvelope aria-hidden />
              </span>
              <div>
                <p className="contact__detail-label">Email</p>
                <a href={`mailto:${contactEmail}`} className="contact__detail-link">
                  {contactEmail}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default ProjectUpdate
