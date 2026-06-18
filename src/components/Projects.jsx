import useInView from '../hooks/useInView'

const cards = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfGjTBGXLZul7JDDhMPm4TV9aa6_aL2x6tZr9D6gtAaopbwPBit3UYmbairxD2je7mmahjCnruzzc9SF9IMfrTsvbG2gs5KM9HedoFoFY3F4--zJjnCRQ-kecuWdSCSWKO5_wKmC1KDnCBRtFWjNnpphyPQD7gg49olMZZhOB8P56noVjkQ6RCzVA0CZFJ2vO1dKDzCL8ArQhEgilN96cT0Z1EJZeC6uCFGQZRmV2F9M6f7TmU24hRrR0UA4ZPLnce5EpVgI5i90Y',
    title: 'Viviendas Unifamiliares',
    desc: 'Hogares diseñados para la vida moderna con eficiencia energética superior.',
    tag: 'Residencial',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdcelHpdK4iWgrUiE_nx9kVXOzey5xHdMcR_jlsqYs4wMvNUOTCjzfMFxo7jLGOvzjor6SQiEEiddPaX7nI2kFfmHokEQKmQsXn7ZjZvrJd1dk8rgWKFq0cA2BB1oN1n3Jc4csumpdxENxpzmSv_pFcYHsXmPWvbUxLmOzIkWbDOYkvUDVqDNrz4ZjHoMOviA-5qzbQPfVHJEXJjQshv2glO9yt2cusmU5e3Ca6m7jzVBk3Pl2Y4nwWMNzNgQ0hl2T4vgptiV9Ycg',
    title: 'Oficinas y Comercial',
    desc: 'Espacios de trabajo dinámicos con grandes luces y plantas libres.',
    tag: 'Comercial',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnfYeybM1c8heLYZ0HjVTmbjBsSvmOJO04_y0BX3Uw1giMzV3kSyKb5VsRuImWyWQVDr0nVWZ20dvXhEb0iFsae0CM8wdS-UpUrP04bodgz81-qm2VcIBmY79uVvA51G4VZoMBkVIPhvVY7cEzrRtO0MYZOImF9vsdXzx67BAi5d7pBsnKTHSRlobSr--ZikqjAKR8ebqAya5WcasTv7Nhne3fAxwfILNYddO7eLDFzI3wmS0eRCSXYRl4Byc9ZEthIHMggFSY1ko',
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
            <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Portfolio</p>
            <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight">Tipologías de Obra</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm">
            Soluciones versátiles para cada necesidad de espacio y funcionalidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {cards.map(({ img, title, desc, tag }) => (
            <div
              key={title}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-surface-container-low hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 animate-on-scroll ${visible ? 'visible' : ''}`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
