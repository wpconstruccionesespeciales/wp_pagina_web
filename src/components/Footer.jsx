import { Link } from 'react-router-dom'
import wpWhite from '../assets/wpblanco.webp'

export default function Footer({ showCTA = true }) {
  return (
    <footer className="bg-primary text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top CTA banner */}
        {showCTA && (
          <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-2">¿Listo para construir el futuro?</h3>
              <p className="text-white/50">Contactanos hoy y recibí una cotización sin compromiso.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              Solicitar Cotización
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-12 mb-16">
          <div className="w-full lg:max-w-[280px]">
            <div className="flex items-center gap-3 mb-6">
              <img src={wpWhite} alt="WP Construcciones Especiales" className="h-15 w-auto" />
            </div>
            <p className="text-white/40 leading-relaxed mb-8 text-sm">
              Líderes en construcción industrializada de alta precisión. Innovando el futuro del acero desde el año 2005.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/WPConstruccionesEspeciales"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/8 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-2.8 0-5 2.2-5 5v2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/wpconstruccionesespeciales/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/8 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/80">Navegación</h5>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Servicios', href: '/servicios' },
                { label: 'Steel Frame Paraná', href: '/steel-frame-parana' },
                { label: 'Arquitectura Modular', href: '/wmu' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-white/40 hover:text-white transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/80">Legal</h5>
            <ul className="space-y-3">
              {['Política de Privacidad', 'Términos de Servicio', 'Reporte de Sostenibilidad'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Política de Privacidad' ? '/privacidad' : item === 'Términos de Servicio' ? '/terminos' : '/sostenibilidad'} className="text-white/40 hover:text-white transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/80">Atención</h5>
            <ul className="space-y-4">
              {[
                { icon: 'schedule', text: 'Lunes a Viernes 8:00 - 16:00' },
                { icon: 'phone', text: '+54 9 3435 05-6918' },
                { icon: 'mail', text: 'wpsascentral@gmail.com' },
                { icon: 'location_on', text: 'Entre Ríos, Paraná, Argentina' },
              ].map(({ icon, text }) => (
                <li key={icon} className="flex items-center gap-3 text-white/40 text-sm">
                  <span className="material-symbols-outlined text-white/30 text-lg">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/25 text-xs">
          <p>© 2026 WP Construcciones Especiales.</p>
          <p>Hecho con precisión milimétrica.</p>
        </div>
      </div>
    </footer>
  )
}