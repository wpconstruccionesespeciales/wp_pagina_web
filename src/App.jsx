import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import FirstSteelFrame from './components/FirstSteelFrame'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import Features from './components/Features'
import SustainabilityBanner from './components/SustainabilityBanner'
import Process from './components/Process'
import Comparison from './components/Comparison'
import Projects from './components/Projects'
import Testimonial from './components/Testimonial'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const Nosotros = lazy(() => import('./pages/Nosotros'))
const WMU = lazy(() => import('./pages/WMU'))
const WmuCero = lazy(() => import('./pages/WmuCero'))
const WmuCero2 = lazy(() => import('./pages/WmuCero2'))
const WmuCampo = lazy(() => import('./pages/WmuCampo'))
const WmuAldea = lazy(() => import('./pages/WmuAldea'))
const WmuSauce = lazy(() => import('./pages/WmuSauce'))
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Terminos = lazy(() => import('./pages/Terminos'))
const Sostenibilidad = lazy(() => import('./pages/Sostenibilidad'))
const Servicios = lazy(() => import('./pages/Servicios'))

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-label="Cargando página">
      <div className="h-9 w-9 rounded-full border-2 border-primary/15 border-t-primary animate-spin" />
    </div>
  )
}

function Home() {
  useEffect(() => {
    document.title = "STEEL CORE | WP Construcciones Especiales"
  }, [])

  return (
    <div className="relative overflow-hidden bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[52rem] overflow-hidden">
        <div className="home-glow home-glow-left" />
        <div className="home-glow home-glow-right" />
        <div className="home-dot-cluster" />
        <div className="home-wireframe" />
      </div>
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <WhyUs />
        <FirstSteelFrame />
        <AboutUs />
        <Services />
        <Features />
        <SustainabilityBanner />
        <Process />
        <Comparison />
        <Projects />
        <Testimonial />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/wmu" element={<WMU />} />
        <Route path="/wmu-cero" element={<WmuCero />} />
        <Route path="/wmu-cero-2" element={<WmuCero2 />} />
        <Route path="/wmu-campo" element={<WmuCampo />} />
        <Route path="/wmu-aldea" element={<WmuAldea />} />
        <Route path="/wmu-sauce" element={<WmuSauce />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/sostenibilidad" element={<Sostenibilidad />} />
        <Route path="/servicios" element={<Servicios />} />
      </Routes>
    </Suspense>
  )
}
