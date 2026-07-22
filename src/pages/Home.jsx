import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import WhyUs from '../components/WhyUs'
import FirstSteelFrame from '../components/FirstSteelFrame'
import AboutUs from '../components/AboutUs'
import Services from '../components/Services'
import Features from '../components/Features'
import SustainabilityBanner from '../components/SustainabilityBanner'
import Process from '../components/Process'
import Comparison from '../components/Comparison'
import Projects from '../components/Projects'
import Testimonial from '../components/Testimonial'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import SEO from '../components/SEO'
import wpLogo from '../assets/WP.png'
import { BUSINESS, BUSINESS_ID, canonicalUrl } from '../config/site'

export default function Home() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    "name": BUSINESS.name,
    "url": canonicalUrl('/'),
    "logo": canonicalUrl(wpLogo),
    "image": canonicalUrl('/wmu/wmu-financing.webp'),
    "description": "Estudio de Paraná dedicado a arquitectura, ingeniería de detalle, construcción en Steel Frame y soluciones modulares desde 2005.",
    "telephone": BUSINESS.phoneE164,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS.locality,
      "addressRegion": BUSINESS.region,
      "postalCode": "3100",
      "addressCountry": BUSINESS.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -31.73333,
      "longitude": -60.529806
    },
    "areaServed": [
      { "@type": "State", "name": "Entre Ríos" },
      { "@type": "State", "name": "Santa Fe" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "sameAs": Object.values(BUSINESS.social),
    "knowsAbout": [
      "Steel Framing",
      "Construcción en Seco",
      "Arquitectura Modular",
      "Viviendas Industrializadas",
      "Cálculo de Ingeniería de Detalle",
      "Módulos Habitacionales Llave en Mano"
    ]
  }

  return (
    <div className="relative overflow-hidden bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <SEO
        title="WP Construcciones Especiales"
        description="Arquitectura, ingeniería de detalle y construcción en Steel Frame desde Paraná. Conocé servicios, aplicaciones y criterios para desarrollar cada proyecto."
        keywords="steel frame, construccion en seco, arquitectura modular, casas modulares, wp construcciones, steel core, argentina, parana entre rios"
      />
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
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
