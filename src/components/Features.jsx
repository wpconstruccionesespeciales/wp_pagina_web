import useInView from '../hooks/useInView'

const features = [
  {
    icon: 'speed',
    title: 'Montaje en Seco',
    desc: 'La secuencia evita tiempos de fraguado propios de la obra húmeda y se planifica según el alcance.',
    stat: 'SECO',
    statLabel: 'secuencia coordinada',
  },
  {
    icon: 'weight',
    title: 'Estructura Ligera',
    desc: 'Su menor carga propia puede ser útil en ampliaciones, después de evaluar estructura, suelo y fundaciones.',
    stat: 'ACERO',
    statLabel: 'menor carga propia',
  },
  {
    icon: 'shield_with_heart',
    title: 'Resistencia Calculada',
    desc: 'La respuesta estructural se define mediante cálculo según cargas, normativa y emplazamiento.',
    stat: 'CÁLCULO',
    statLabel: 'según proyecto',
  },
]

export default function Features() {
  const [ref, visible] = useInView()

  return (
    <section className="relative overflow-hidden py-28 bg-white px-6 lg:px-10" ref={ref}>
      <div className="bg-geo-ring bg-geo-ring-left" />
      <div className="bg-geo-rect bg-geo-rect-right" />
      <div className="bg-geo-dots bg-geo-dots-soft bg-geo-dots-features" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Beneficios Clave</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-mask-reveal-wrapper">
              <span className="text-mask-reveal-line">Ventajas del Steel Frame</span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {features.map(({ icon, title, desc, stat, statLabel }) => (
            <div
              key={title}
              className={`group text-center p-10 rounded-2xl bg-surface-container-low hover:bg-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 cursor-default animate-on-scroll ${visible ? 'visible' : ''}`}
            >
              <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-500">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl transition-colors duration-500">{icon}</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-3 group-hover:text-white transition-colors duration-500">{title}</h4>
              <p className="text-on-surface-variant group-hover:text-white/60 leading-relaxed mb-6 transition-colors duration-500">{desc}</p>
              <div className="pt-4 border-t border-outline-variant/30 group-hover:border-white/15 transition-colors duration-500">
                <span className="text-3xl font-black font-headline text-primary group-hover:text-white transition-colors duration-500">{stat}</span>
                <span className="block text-xs text-on-surface-variant group-hover:text-white/50 uppercase tracking-widest mt-1 transition-colors duration-500">{statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
