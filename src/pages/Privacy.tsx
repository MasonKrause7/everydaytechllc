import { contactEmail } from '../data/contactInfo'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Privacy.css'

function Privacy() {
  usePageMeta(
    'Privacy Policy | Everyday Tech',
    'How Everyday Tech LLC collects, uses, and protects the information you share through this website.',
  )

  return (
    <section className="page">
      <div className="page__inner privacy">
        <p className="page__eyebrow">Privacy</p>
        <h1 className="page__title">Privacy policy</h1>
        <p className="page__intro">Effective October 12, 2026</p>

        <h2>Information you give us</h2>
        <p>
          When you fill out our contact form or start a project request, we collect the details you
          provide, such as your name, email address, phone number, business name, and information
          about your project. We use this information only to respond to you, prepare quotes, and
          work with you on your project. Submissions are stored securely with our database provider
          (Supabase) and delivered to our inbox through our email provider (Resend).
        </p>

        <h2>Analytics</h2>
        <p>
          We use analytics tools to understand how visitors use this site so we can improve it.
          These tools may collect information such as the pages you visit, how you arrived at the
          site, your general location, device and browser type, and how you interact with pages.
        </p>
        <ul>
          <li>
            <strong>Vercel Web Analytics and Speed Insights</strong> measure page views and page
            performance without using cookies.
          </li>
          <li>
            <strong>Google Analytics</strong> uses cookies to measure site traffic and which pages
            lead to inquiries. You can opt out with the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
              Google Analytics opt-out browser add-on
            </a>
            .
          </li>
          <li>
            <strong>Microsoft Clarity</strong> captures how visitors use the site through heatmaps
            and session replays. Text you type into form fields is masked. Learn more in the{' '}
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noreferrer">
              Microsoft Privacy Statement
            </a>
            .
          </li>
        </ul>

        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We share it only with the service providers
          listed above, which help us operate this website, and when required by law.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct, or delete the information you've submitted at any time
          by emailing <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also block or
          delete cookies through your browser settings.
        </p>

        <h2>Children's privacy</h2>
        <p>
          This website is intended for adults and is not directed to children under 13. We do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes take effect when they're posted on
          this page.
        </p>

        <h2>Contact us</h2>
        <p>
          Everyday Tech LLC, Stanwood, Michigan
          <br />
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </div>
    </section>
  )
}

export default Privacy
