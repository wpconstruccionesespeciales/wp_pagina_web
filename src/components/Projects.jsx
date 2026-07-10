import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const cards = [
  {
    img: '/wp/project-vivienda.webp',
    title: 'Viviendas Unifamiliares',
    desc: 'Hogares diseñados para la vida moderna con eficiencia energética superior.',
    tag: 'Residencial',
  },
  {
    img: '/wp/project-comercial.webp',
    title: 'Oficinas y Comercial',
    desc: 'Espacios de trabajo dinámicos con grandes luces y plantas libres.',
    tag: 'Comercial',
  },
  {
    img: '/wp/project-ampliacion.webp',
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
            <Link
              key={title}
              to="/servicios"
              className={`group block rounded-2xl overflow-hidden bg-surface-container-low hover:shadow-xl hover:shadow-primary/5 motion-safe:hover:-translate-y-2 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 animate-on-scroll ${visible ? 'visible' : ''}`}
            >
              <div className="overflow-hidden aspect-[4/3] relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={img}
                  alt={title}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
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
            </Link>
          ))}
        </div>
        <div className={`mt-12 flex justify-center animate-on-scroll ${visible ? 'visible' : ''}`}>
          <Link
            to="/servicios"
            className="group inline-flex items-center gap-4 rounded-2xl border border-primary/15 bg-white px-5 py-3.5 text-sm font-bold text-primary shadow-[0_14px_34px_-24px_rgba(21,37,27,0.7)] transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/30 hover:shadow-[0_18px_38px_-22px_rgba(21,37,27,0.55)] motion-safe:hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            Qué más hacemos
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-0.5">
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
