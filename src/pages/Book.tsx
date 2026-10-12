import { Link } from 'react-router'
import { FaArrowRight, FaLocationDot, FaPhone, FaVideo } from 'react-icons/fa6'
import BookingCalendar from '../components/BookingCalendar'
import { consultationCalLink } from '../data/booking'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Contact.css'
import '../styles/pages/Book.css'

const meetingTypes = [
  { icon: FaVideo, label: 'Video call', text: 'Anywhere in the US' },
  { icon: FaPhone, label: 'Phone call', text: 'We call the number you provide' },
  { icon: FaLocationDot, label: 'In person', text: 'Stanwood to Grand Rapids and across West Michigan' },
]

function Book() {
  usePageMeta(
    'Book a Free Consultation | Everyday Tech | West Michigan',
    'Schedule a free consultation with Everyday Tech by video, phone, or in person in West Michigan. Pick a time that works for you.',
  )

  return (
    <>
      <section className="page contact-header">
        <div className="page__inner">
          <p className="page__eyebrow">Book a consultation</p>
          <h1 className="page__title">
            Pick a time to <span className="home_content__highlight">talk</span>
          </h1>
          <p className="page__intro">
            Book a free consultation by video, phone, or in person. We'll talk through your goals
            and recommend the right solution for your budget, with no obligation.
          </p>
        </div>
      </section>

      <section className="home_content__section home_content__section--alt">
        <div className="home_content__inner book">
          <ul className="book__types">
            {meetingTypes.map(({ icon: Icon, label, text }) => (
              <li key={label} className="contact__detail">
                <span className="contact__detail-icon">
                  <Icon aria-hidden />
                </span>
                <div>
                  <p className="contact__detail-label">{label}</p>
                  <p className="contact__text">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <BookingCalendar calLink={consultationCalLink} />
          <Link to="/start-project" className="contact__project-link">
            Want to share project details first? Start a project <FaArrowRight aria-hidden />
          </Link>
          <Link to="/project-update" className="contact__project-link">
            Already working with us? Book a project update <FaArrowRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}

export default Book
