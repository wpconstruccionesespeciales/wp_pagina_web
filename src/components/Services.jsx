import useInView from '../hooks/useInView'

const services = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYdd8Y8bNMQsVs_UGsSnMOjsPyVcMoyHhIlnNGJm7Pxx_684U9Lc5hvrX9YryGRNVNsIkkpqdcGQy-e0_fM_kAsCADy5eHB5wnoypiLWv0dIr3nWfirszhvc0TmAfgUnMn0WCG9cfwukYKjsIfQ9FppTtvE8Hz6DZB0R0o-nZdDA0My_MTMuddFzJ4Kjf62G__WQ0-2YNd02xBaC9tgT06xhZeowQu2cHe8vN0nYb-8W8zMeA-6PVmmQJPWYZX8uEYHOMH2xQSPP0',
    title: 'Construcciones Especiales',
    label: 'Solución a medida',
    desc: 'Proyectos únicos que desafían los límites de la construcción tradicional con estructuras de acero de alta resistencia.',
    tags: ['A-36 Steel', 'LEED Ready', 'Custom'],
    stat: 'Alta complejidad',
    cta: 'Consultar Proyecto',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWTiJX1Wnzh0nXXIA1n_5V4VWwhoky2_U3w2fkn34XgOKeqAKvOfjgKkYDS5lrLab2ln4Lue6xcIeNIRq4-7elFny4MYSyHwJKPA5iWBxdRpc9nlpWZPyIwg05Fcy6mbNIeCHcMvLZrkgqpL6D9B4Zhk4IUg-Kzvgyt_8t-yoJRxlbyRVKK0hPv9nRhSAQUP4UI9smeXcfaI1RbPx-3nxVxDQTQ0wRQu8PAKrXl_wrd-zEakJmHVPM6kCIJgmPaUvYTNfhU7V5G9k',
    title: 'Arquitectura Modular',
    label: 'Sistema industrializado',
    desc: 'Eficiencia industrializada para una ejecución rápida, limpia y con estándares de calidad superiores.',
    tags: ['Prefab', 'Modular', 'Fast Build'],
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
              Dos enfoques, un mismo compromiso con tu proyecto
            </h2>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-xl">
              Diseñamos sistemas constructivos que combinan ingeniería, velocidad de ejecución y una estética contemporánea adaptada a cada proyecto.
            </p>
          </div>
          <div className="services-header__aside">
            <span className="services-header__kicker">Método WP</span>
            <p>Planeamiento técnico, fabricación controlada y una ejecución pensada para reducir incertidumbre en obra.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-children">
          {services.map(({ img, title, label, desc, tags, stat, cta }) => (
            <div
              key={title}
              className={`group services-card relative overflow-hidden min-h-[440px] lg:min-h-[460px] animate-on-scroll scale-in ${visible ? 'visible' : ''}`}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={img}
                alt={title}
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
                    href="#contact"
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
