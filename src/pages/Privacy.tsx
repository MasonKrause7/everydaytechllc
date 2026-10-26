import { supportEmail } from '../data/contactInfo'
import usePageMeta from '../hooks/usePageMeta'
import '../styles/pages/Page.css'
import '../styles/pages/Privacy.css'

function Privacy() {
  usePageMeta(
    'Privacy Policy | Everyday Tech',
    'How Everyday Tech LLC collects, uses, and protects information through this website and the Puzzle Trader app.',
  )

  return (
    <section className="page">
      <div className="page__inner privacy">
        <p className="page__eyebrow">Privacy</p>
        <h1 className="page__title">Privacy policy</h1>
        <p className="page__intro">Effective October 26, 2026</p>

        <p>
          This policy explains how Everyday Tech LLC ("we", "us") handles information collected
          through this website, everydaytechllc.com, and through our Puzzle Trader mobile app for
          iOS and Android.
        </p>

        <h2>Website: information you give us</h2>
        <p>
          When you fill out our contact form or start a project request, we collect the details you
          provide, such as your name, email address, phone number, business name, and information
          about your project. We use this information only to respond to you, prepare quotes, and
          work with you on your project. Submissions are stored securely with our database provider
          (Supabase) and delivered to our inbox through our email provider (Resend).
        </p>

        <h2>Website: analytics</h2>
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
            <strong>Meta Pixel</strong> uses cookies to measure how people who see our ads on
            Facebook and Instagram use this site, and whether they contact us, so we can improve
            our advertising. You can adjust how Meta uses this data in your{' '}
            <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noreferrer">
              Facebook ad preferences
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

        <h2 id="puzzle-trader">Puzzle Trader app: information we collect</h2>
        <p>
          Puzzle Trader lets you log the jigsaw puzzles you finish, see your stats, and track goals.
          To do that, the app collects:
        </p>
        <ul>
          <li>
            <strong>Account information:</strong> your name, email address, and password. Your
            password is stored only in hashed form; we can't see it.
          </li>
          <li>
            <strong>Puzzles you log:</strong> puzzle names, brands, piece counts, completion dates,
            time spent, ratings, notes, and the goals you set.
          </li>
          <li>
            <strong>Photos you choose to add:</strong> the app asks for camera or photo library
            access only when you add a picture of a puzzle, and only the photos you pick are
            uploaded. Your photos are private to your account.
          </li>
        </ul>
        <p>
          The app does not collect your location, contacts, or advertising identifiers. It contains
          no ads and no third-party analytics, and it does not track you across other apps or
          websites.
        </p>

        <h2>Puzzle Trader app: how we use information</h2>
        <p>
          We use this information only to run the app for you: to create and secure your account,
          store and show your puzzles, photos, stats, and goals, send account emails such as
          verification and password reset codes, and respond when you contact support. We don't
          use it for advertising or sell it.
        </p>
        <p>
          App data is stored with our database and hosting provider, Supabase, and is sent over
          encrypted connections. Access is limited so that only you can read your own puzzles,
          photos, and goals.
        </p>

        <h2 id="delete-account">Puzzle Trader app: deleting your account and data</h2>
        <p>
          You can delete your account at any time in the app: open the <strong>You</strong> tab and
          tap <strong>Delete account</strong>. This permanently deletes your account, every puzzle
          you've logged, your photos, and your goals. If you can't access the app, email{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a> from the address on your account
          and we'll delete it for you.
        </p>
        <p>
          We keep your data for as long as your account is active. After you delete your account,
          copies may remain in our provider's backups for a limited time before they're overwritten.
        </p>

        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We share it only with the service providers
          listed above, which help us operate this website and the Puzzle Trader app, and when
          required by law.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct, or delete your information at any time by emailing{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. You can also block or delete
          cookies through your browser settings, and turn off the Puzzle Trader app's camera or
          photo access in your device settings.
        </p>

        <h2>Children's privacy</h2>
        <p>
          This website and the Puzzle Trader app are intended for adults and are not directed to
          children under 13. We do not knowingly collect personal information from children. If
          you believe a child has given us information, contact us and we'll delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes take effect when they're posted on
          this page, and we'll update the effective date above.
        </p>

        <h2>Contact us</h2>
        <p>
          Everyday Tech LLC, Stanwood, Michigan
          <br />
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </p>
      </div>
    </section>
  )
}

export default Privacy
