import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../assets/brand/logo.svg'
import '../styles/components/Navbar.css'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Main">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img src={logo} alt="Everyday Tech LLC" className="navbar__logo" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="navbar-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        <ul
          id="navbar-menu"
          className={`navbar__menu${open ? ' navbar__menu--open' : ''}`}
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
                onClick={close}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/start-project" className="navbar__cta" onClick={close}>
              Start a project
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
