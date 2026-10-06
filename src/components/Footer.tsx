import { Link } from 'react-router'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import logo from '../assets/brand/logo.svg'
import '../styles/components/Footer.css'

const socials = [
  { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://github.com/', label: 'GitHub', icon: FaGithub },
  { href: 'https://www.facebook.com/', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://www.instagram.com/', label: 'Instagram', icon: FaInstagram },
  { href: 'https://x.com/', label: 'X', icon: FaXTwitter },
]

const columns = [
  {
    title: 'Services',
    links: [
      { to: '/services', label: 'Websites' },
      { to: '/services', label: 'Mobile apps' },
      { to: '/services', label: 'AI integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/our-work', label: 'Our work' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/start-project', label: 'Start a project' },
    ],
  },
]

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/">
            <img src={logo} alt="Everyday Tech LLC" className="footer__logo" />
          </Link>
          <p className="footer__tagline">
            Custom websites, mobile apps, and AI integrations for small businesses.
          </p>
          <ul className="footer__socials">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="footer__social"
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="footer__heading">{column.title}</h2>
            <ul className="footer__links">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="footer__heading">Get in touch</h2>
          <ul className="footer__links">
            <li>
              <a href="mailto:mason@everydaytechllc.com" className="footer__link">
                mason@everydaytechllc.com
              </a>
            </li>
            <li className="footer__text">Serving clients nationwide</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {year} Everyday Tech LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
