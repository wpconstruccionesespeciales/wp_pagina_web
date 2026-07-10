import useInView from '../hooks/useInView'

const cards = [
  {
    img: '/wp/20230731_155812.jpg',
    title: 'Viviendas Unifamiliares',
    desc: 'Hogares diseñados para la vida moderna con eficiencia energética superior.',
    tag: 'Residencial',
  },
  {
    img: '/wp/20210729_104340.jpg',
    title: 'Oficinas y Comercial',
    desc: 'Espacios de trabajo dinámicos con grandes luces y plantas libres.',
    tag: 'Comercial',
  },
  {
    img: '/wp/20210916_133931 (1).jpg',
    title: 'Ampliaciones',
    desc: 'Crecimiento vertical u horizontal sin peso excesivo para estructuras existentes.',
    tag: 'Expansión',
  },
]

export default function Projects() {
  const [ref, visible] = useInView()

  return (
    <section className="py-28 bg-white px-6 lg:px-10" id="projects" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Trabajos</p>
            <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight">Lo que hacemos</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm">
            Soluciones versátiles para cada necesidad de espacio y funcionalidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {cards.map(({ img, title, desc, tag }) => (
            <a
              key={title}
              href="/servicios"
              className={`group block cursor-pointer rounded-2xl overflow-hidden bg-surface-container-low hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 animate-on-scroll ${visible ? 'visible' : ''}`}
            >
              <div className="overflow-hidden aspect-[4/3] relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={img}
                  alt={title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary text-xs font-bold">
                  {tag}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all duration-300">
                  Ver detalles
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className={`mt-12 flex justify-center animate-on-scroll ${visible ? 'visible' : ''}`}>
          <a
            href="/servicios"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary px-7 py-3 text-sm font-bold text-white shadow-[0_18px_40px_-22px_rgba(16,72,105,0.9)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_22px_48px_-22px_rgba(16,72,105,1)]"
          >
            Qué más hacemos
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
