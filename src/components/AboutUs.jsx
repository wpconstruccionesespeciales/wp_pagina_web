import useInView from '../hooks/useInView'
import useCounter from '../hooks/useCounter'

export default function AboutUs() {
  const [ref, visible] = useInView()
  const years = useCounter(21, visible)

  return (
    <section className="relative py-28 bg-white overflow-hidden" id="about" ref={ref}>
      <div className="bg-geo-rect bg-geo-rect-left" />
      <div className="bg-geo-dots bg-geo-dots-right" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Image */}
        <div className={`relative animate-on-scroll from-left ${visible ? 'visible' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              className="w-full aspect-[4/5] object-cover"
              src="/wp/IMG_9133-sin-personas.jpg"
              alt="Estructura de steel frame en montaje rodeada de vegetación"
            />
          </div>
          {/* Floating counter */}
          <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-primary rounded-2xl p-8 lg:p-10 text-white shadow-2xl shadow-primary/30">
            <div className="text-5xl lg:text-6xl font-black font-headline leading-none">{years}+</div>
            <div className="text-sm uppercase tracking-widest text-white/60 mt-2">Años de<br />Excelencia</div>
          </div>
          {/* Decorative */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
        </div>

        {/* Text */}
        <div className={`animate-on-scroll from-right ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Sobre Nosotros</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-8">
            <span className="gradient-text">Precisión técnica</span>
            <br />desde el año 2005
          </h2>
          <div className="space-y-5 text-lg text-on-surface-variant leading-relaxed">
            <p>
              Nuestra historia está forjada en la búsqueda constante de la perfección arquitectónica. WP Construcciones Especiales nació con la visión de transformar el paisaje urbano mediante sistemas constructivos ligeros y sostenibles.
            </p>
            <p>
              Nos enfocamos en la sostenibilidad no como una tendencia, sino como una responsabilidad técnica. Cada viga instalada es un compromiso con el futuro del hábitat humano.
            </p>
          </div>
          <div className="pt-8 mt-8 grid grid-cols-2 gap-6 border-t border-outline-variant/50">
            {[
              { label: 'Filosofía', value: 'Sostenibilidad Consciente', icon: 'eco' },
              { label: 'Método', value: 'Ingeniería Milimétrica', icon: 'straighten' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex gap-3">
                <div className="w-10 h-10 bg-primary/8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1">{label}</p>
                  <p className="font-bold text-primary text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
