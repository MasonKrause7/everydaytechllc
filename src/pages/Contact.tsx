import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import {
  FaArrowRight,
  FaCircleCheck,
  FaEnvelope,
  FaLocationDot,
  FaVideo,
} from 'react-icons/fa6'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Home.css'
import '../styles/pages/Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const contactEmail = 'mason@everydaytechllc.com'

function Contact() {
  usePageMeta(
    'Contact Everyday Tech | Web & App Development in Big Rapids, MI',
    'Get in touch with Everyday Tech about a custom website, mobile app, or AI integration. Free consultations in person in West Michigan or over video.',
  )

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      if (!response.ok) {
        const data: { error?: string } = await response.json().catch(() => ({}))
        throw new Error(data.error ?? 'Your message could not be sent.')
      }
      form.reset()
      setStatus('sent')
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error ? submitError.message : 'Your message could not be sent.',
      )
      setStatus('error')
    }
  }

  return (
    <>
      <section className="page contact-header">
        <div className="page__inner">
          <p className="page__eyebrow">Contact</p>
          <h1 className="page__title">
            Let's talk about your <span className="home_content__highlight">project</span>
          </h1>
          <p className="page__intro">
            Have a question or an idea you want to explore? Send us a message and we'll get back to
            you to set up a free consultation.
          </p>
        </div>
      </section>

      <section className="home_content__section home_content__section--alt">
        <div className="home_content__inner contact__inner">
          <div className="contact__card">
            {status === 'sent' ? (
              <div className="contact-form__success" role="status">
                <FaCircleCheck aria-hidden className="contact-form__success-icon" />
                <h2 className="contact__card-title">Thanks, your message is on its way!</h2>
                <p className="contact__text">
                  We'll reply to the email address you provided. Need to add something? You can
                  send another message anytime.
                </p>
                <button
                  type="button"
                  className="hero__button hero__button--secondary contact-form__again"
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact__card-title">Send us a message</h2>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="contact-name" className="contact-form__label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      className="contact-form__input"
                      autoComplete="name"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-email" className="contact-form__label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="contact-form__input"
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="contact-phone" className="contact-form__label">
                      Phone <span className="contact-form__optional">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="contact-form__input"
                      autoComplete="tel"
                      maxLength={40}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-company" className="contact-form__label">
                      Business name <span className="contact-form__optional">(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      className="contact-form__input"
                      autoComplete="organization"
                      maxLength={120}
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-message" className="contact-form__label">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    rows={6}
                    maxLength={5000}
                    required
                  />
                </div>

                <div className="contact-form__honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {status === 'error' && (
                  <p className="contact-form__error" role="alert">
                    {errorMessage} You can also email us at{' '}
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="hero__button hero__button--primary contact-form__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          <aside className="contact__aside">
            <h2 className="contact__card-title">Other ways to reach us</h2>
            <ul className="contact__details">
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
              <li className="contact__detail">
                <span className="contact__detail-icon">
                  <FaLocationDot aria-hidden />
                </span>
                <div>
                  <p className="contact__detail-label">In person</p>
                  <p className="contact__text">Big Rapids and across West Michigan</p>
                </div>
              </li>
              <li className="contact__detail">
                <span className="contact__detail-icon">
                  <FaVideo aria-hidden />
                </span>
                <div>
                  <p className="contact__detail-label">Video call</p>
                  <p className="contact__text">Clients anywhere in the US</p>
                </div>
              </li>
            </ul>
            <Link to="/start-project" className="contact__project-link">
              Ready to start a project? <FaArrowRight aria-hidden />
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}

export default Contact
