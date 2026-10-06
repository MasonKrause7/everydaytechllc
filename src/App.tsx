import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import OurWork from './pages/OurWork'
import Services from './pages/Services'
import StartProject from './pages/StartProject'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-project" element={<StartProject />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
