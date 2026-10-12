import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useTextureAlignment } from './hooks/useTextureAlignment'
import About from './pages/About'
import Book from './pages/Book'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import OurWork from './pages/OurWork'
import Pricing from './pages/Pricing'
import Privacy from './pages/Privacy'
import ProjectUpdate from './pages/ProjectUpdate'
import Services from './pages/Services'
import StartProject from './pages/StartProject'
import { trackPageView } from './utils/analytics'

function App() {
  const { pathname, search, hash } = useLocation()
  useTextureAlignment(pathname)

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    trackPageView()
  }, [pathname, search])

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-project" element={<StartProject key={search} />} />
          <Route path="/book" element={<Book />} />
          <Route path="/project-update" element={<ProjectUpdate />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
