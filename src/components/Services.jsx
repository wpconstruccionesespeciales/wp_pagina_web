import useInView from '../hooks/useInView'

const services = [
  {
    img: '/wp/service-especial.webp',
    title: 'Construcciones Especiales',
    label: 'Solución a medida',
    desc: 'Soluciones desarrolladas a medida para resolver geometrías, usos y condicionantes que requieren un estudio técnico específico.',
    tags: ['Acero según cálculo', 'A medida', 'Ingeniería'],
    stat: 'Alta complejidad',
    cta: 'Consultar Proyecto',
  },
  {
    img: '/wp/Secuencia 01_1.jpg',
    title: 'Arquitectura Modular',
    label: 'Sistema industrializado',
    desc: 'Componentes coordinados desde el diseño para ordenar la fabricación, el traslado y el montaje de cada módulo.',
    tags: ['Prefabricación', 'Modular', 'Montaje'],
    stat: 'Entrega optimizada',
    cta: 'Ver Catálogo',
  },
]

export default function Services() {
  const [ref, visible] = useInView()

  return (
    <section className="relative overflow-hidden py-24 bg-surface-container-low px-6 lg:px-10" id="services" ref={ref}>
      <div className="bg-geo-slab bg-geo-slab-left" />
      <div className="bg-geo-corners bg-geo-corners-right" />
      <div className="bg-geo-dots bg-geo-dots-dense bg-geo-dots-services" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`services-header mb-12 lg:mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-on-surface-variant mb-4">Soluciones Estructurales</p>
            <h2 className="font-headline text-4xl lg:text-[2.8rem] font-bold text-primary tracking-[-0.03em] mb-4">
              <span className="text-mask-reveal-wrapper">
                <span className="text-mask-reveal-line">Dos enfoques, un mismo compromiso con tu proyecto</span>
              </span>
            </h2>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-xl">
              Una primera vista de nuestras dos líneas de trabajo: soluciones especiales y arquitectura modular, ambas adaptadas a cada proyecto.
            </p>
          </div>
          <div className="services-header__aside">
            <span className="services-header__kicker">Método WP</span>
            <p>Planeamiento técnico, fabricación controlada y una ejecución pensada para reducir incertidumbre en obra.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-children">
          {services.map(({ img, title, label, desc, stat, cta }) => (
            <div
              key={title}
              className={`group services-card relative overflow-hidden min-h-[440px] lg:min-h-[460px] animate-on-scroll scale-in ${visible ? 'visible' : ''}`}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 image-clip-reveal"
                src={img}
                alt={title}
                width="1400"
                height="1050"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 services-card__image-overlay" />
              <div className="absolute inset-x-0 top-0 h-32 services-card__top-fade" />
              <div className="absolute inset-x-0 bottom-0 h-[70%] services-card__bottom-fade" />
              <div className="services-card__wire" />
              <div className="services-card__dots" />

<div className="absolute inset-0 p-6 lg:p-7 flex flex-col justify-between text-white">
                <div className="flex items-start justify-between gap-4">
                  <span className="services-card__label">{label}</span>
                  <div className="services-card__stat">
                    <span className="services-card__stat-line" />
                    {stat}
                  </div>
                </div>

                <div className="services-card__content">
                  <h3 className="font-headline text-[1.9rem] lg:text-[2.05rem] font-bold mb-3 leading-tight max-w-md">{title}</h3>
                  <p className="text-white/72 mb-6 max-w-md leading-relaxed text-[0.98rem]">{desc}</p>
                  <a
                    href={title === 'Arquitectura Modular' ? '/wmu' : '/servicios'}
                    className="services-card__cta"
                  >
                    {cta}
                    <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
