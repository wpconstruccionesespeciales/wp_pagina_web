import useInView from '../hooks/useInView'

export default function WhyUs() {
  const [ref, visible] = useInView()

  return (
    <section className="relative overflow-hidden py-28 bg-surface px-6 lg:px-10" ref={ref}>
      <div className="bg-geo-ring bg-geo-ring-right" />
      <div className="bg-geo-arch bg-geo-arch-left" />
      <div className="bg-geo-dots bg-geo-dots-soft bg-geo-dots-whyus" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main card */}
          <div className={`md:col-span-8 bg-surface-container-low rounded-2xl p-10 lg:p-14 flex flex-col justify-between animate-on-scroll from-left ${visible ? 'visible' : ''}`}>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Nuestras Ventajas</p>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
                <span className="text-mask-reveal-wrapper">
                  <span className="text-mask-reveal-line">¿Por qué elegir Steel Frame?</span>
                </span>
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                Trabajamos con una metodología que coordina diseño, cálculo, fabricación y montaje según las necesidades de cada proyecto.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {[
                { icon: 'architecture', title: 'Personalización', desc: 'Diseños a medida sin límites estructurales.' },
                { icon: 'universal_currency_alt', title: 'Financiación', desc: 'Planes adaptados a la escala de tu inversión.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="group flex gap-4 p-4 rounded-xl hover:bg-white/60 transition-colors duration-300 cursor-default">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors">{icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation card */}
          <div className={`md:col-span-4 bg-primary text-white rounded-2xl p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden animate-on-scroll from-right ${visible ? 'visible' : ''}`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <span className="material-symbols-outlined text-primary-fixed-dim text-6xl mb-6 block relative z-10">precision_manufacturing</span>
            <h3 className="font-headline text-3xl font-bold mb-4 relative z-10">Innovación</h3>
            <p className="text-white/60 text-lg leading-relaxed relative z-10">
              Modelado y control numérico para coordinar el corte, la perforación y el ensamblaje de los perfiles.
            </p>
            <div className="mt-8 relative z-10">
              <a href="#process" className="inline-flex items-center gap-2 text-primary-fixed-dim font-bold text-sm hover:gap-3 transition-all duration-300">
                Ver Proceso
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Full-width versatility banner */}
          <div className={`md:col-span-12 bg-primary rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden animate-on-scroll from-right-full ${visible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-white/3 rounded-full translate-y-1/2 pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                <span className="material-symbols-outlined text-primary-fixed-dim text-3xl">hub</span>
              </div>
              <div>
                <span className="font-headline font-bold text-xl lg:text-2xl block text-white">Soluciones integrales para cada proyecto</span>
                <span className="text-sm text-white/55">Viviendas · Edificios · Industrias · Clínicas · Reformas y más</span>
              </div>
            </div>
            <a href="/servicios" className="relative z-10 group inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-5 py-3 rounded-xl hover:bg-primary-fixed transition-all duration-300 flex-shrink-0 shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-xl">
              Ver todos los servicios
              <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
