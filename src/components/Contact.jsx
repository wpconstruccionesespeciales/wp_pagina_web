import { useState } from 'react'
import useInView from '../hooks/useInView'
import { BUSINESS } from '../config/site'

function FloatingInput({ label, type = 'text', name }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          active
            ? 'text-[10px] -top-2 font-bold tracking-widest uppercase text-primary'
            : 'top-3 text-on-surface-variant text-base'
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border-0 border-b-2 py-3 px-0 bg-transparent outline-none transition-colors duration-300 ${
          focused ? 'border-primary' : 'border-outline-variant/60'
        }`}
      />
    </div>
  )
}

function FloatingTextarea({ label, name }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          active
            ? 'text-[10px] -top-2 font-bold tracking-widest uppercase text-primary'
            : 'top-3 text-on-surface-variant text-base'
        }`}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={`w-full border-0 border-b-2 py-3 px-0 bg-transparent resize-none outline-none transition-colors duration-300 ${
          focused ? 'border-primary' : 'border-outline-variant/60'
        }`}
      />
    </div>
  )
}

export default function Contact() {
  const [ref, visible] = useInView()

  return (
    <section className="py-28 bg-surface-container-low px-6 lg:px-10" id="contact" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div className={`animate-on-scroll from-left ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Contacto</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-6">
            <span className="text-mask-reveal-wrapper">
              <span className="text-mask-reveal-line">Iniciá tu proyecto</span>
            </span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
            Contanos las características de tu proyecto. El equipo revisará la información para coordinar el seguimiento de la consulta.
          </p>

          <div className="space-y-6">
            {[
              { icon: 'location_on', text: `${BUSINESS.region}, ${BUSINESS.locality}, Argentina`, label: 'Ubicación' },
              { icon: 'phone_in_talk', text: BUSINESS.phoneDisplay, label: 'Teléfono', href: BUSINESS.telHref },
              { icon: 'mail', text: BUSINESS.email, label: 'Email', href: BUSINESS.mailtoHref },
              { icon: 'schedule', text: 'Lunes a Viernes 8:00 - 16:00', label: 'Horario' },
            ].map(({ icon, text, label, href }) => (
              <div key={icon} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary text-xl group-hover:text-white transition-colors duration-300">{icon}</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest">{label}</p>
                  {href ? (
                    <a href={href} className="text-on-surface font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm transition-colors">{text}</a>
                  ) : (
                    <p className="text-on-surface font-medium">{text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className={`animate-on-scroll from-right ${visible ? 'visible' : ''}`}>
          <form className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 space-y-8">
            <FloatingInput label="Nombre Completo" name="name" />
            <FloatingInput label="Email Corporativo" type="email" name="email" />
            <FloatingInput label="Teléfono" type="tel" name="phone" />
            <FloatingTextarea label="Mensaje / Detalles del Proyecto" name="message" />
            <button
              type="submit"
              className="group w-full bg-primary text-white py-4 font-bold rounded-xl hover:bg-primary-container hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Enviá tu solicitud
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="text-xs text-on-surface-variant text-center">
              Al enviar, aceptás nuestra política de privacidad. La consulta será revisada por el equipo de WP.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
