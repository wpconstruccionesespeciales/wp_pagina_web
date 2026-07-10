import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import wpDark from '../assets/WP.png'
import wpWhite from '../assets/wpblanco.webp'
import gaudiIcon from '../assets/WMU-Gaudi.webp'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const next = window.scrollY > 40
      setScrolled((current) => current === next ? current : next)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const location = useLocation()
  const isHome = location.pathname === '/'

  const links = [
    { href: isHome ? '#prensa' : '/#prensa', label: 'Prensa', external: !isHome },
    { href: '/nosotros', label: 'Nosotros', router: true },
    { href: '/servicios', label: 'Servicios', router: true },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        (scrolled || !isHome)
          ? 'bg-white shadow-sm border-b border-black/5 py-1'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="flex items-center px-6 lg:px-10 max-w-7xl mx-auto py-2 relative">

        {/* Nav links — izquierda */}
        <div className="hidden lg:flex items-center gap-2 font-headline tracking-tight flex-1">
          {links.map(({ href, label, router }) => {
            const cls = `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              (scrolled || !isHome)
                ? 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`
            return router
              ? <Link key={href} to={href} className={cls}>{label}</Link>
              : <a key={href} href={href} className={cls}>{label}</a>
          })}
        </div>

        {/* Logo WP — centro absoluto */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center flex-shrink-0" style={{ height: '72px' }}>
          <img
            src={wpWhite}
            alt="WP Construcciones Especiales"
            style={{ height: '72px', width: 'auto' }}
            width="256"
            height="72"
            decoding="async"
            className={`object-contain transition-opacity duration-500 ${(scrolled || !isHome) ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src={wpDark}
            alt="WP Construcciones Especiales"
            style={{ height: '72px', width: 'auto' }}
            width="256"
            height="72"
            decoding="async"
            className={`object-contain absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-500 ${(scrolled || !isHome) ? 'opacity-100' : 'opacity-0'}`}
          />
        </Link>

        {/* WMU — derecha */}
        <div className="hidden sm:flex items-center gap-0 flex-1 justify-end">
          <Link
            to="/wmu"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={gaudiIcon}
              alt="WMU Arquitectura Modular"
              style={{ height: '72px', width: 'auto' }}
              width="72"
              height="72"
              decoding="async"
              className="object-contain"
            />
            <span className={`font-headline font-bold text-sm transition-colors duration-500 ${
              (scrolled || !isHome) ? 'text-primary' : 'text-white'
            }`}>
              Arquitectura Modular
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden ml-4 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              (scrolled || !isHome) ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile-only hamburger (when sm hidden) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`sm:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/96 backdrop-blur-2xl shadow-xl border-t border-black/5 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="p-5 space-y-1">
          {links.map(({ href, label, router }) => {
            const cls = "block py-3 px-4 text-on-surface font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
            return router
              ? <Link key={href} to={href} onClick={() => setMobileOpen(false)} className={cls}>{label}</Link>
              : <a key={href} href={href} onClick={() => setMobileOpen(false)} className={cls}>{label}</a>
          })}
          <Link
            to="/wmu"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 mt-3 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <img src={gaudiIcon} alt="WMU" width="40" height="40" decoding="async" style={{ height: '40px', width: 'auto' }} className="object-contain" />
            <span className="font-headline font-bold text-primary">Arquitectura Modular</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
