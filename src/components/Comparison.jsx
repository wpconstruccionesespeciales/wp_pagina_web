import useInView from '../hooks/useInView'

const rows = [
  { feature: 'Secuencia de obra', steel: 'Montaje en seco', trad: 'Incluye etapas húmedas', icon: 'schedule' },
  { feature: 'Gestión de material', steel: 'Corte planificado', trad: 'Según sistema', icon: 'delete' },
  { feature: 'Aislación térmica', steel: 'Envolvente por capas', trad: 'Según composición', icon: 'thermostat' },
  { feature: 'Coordinación', steel: 'Modelo + CNC', trad: 'Replanteo en obra', icon: 'straighten' },
  { feature: 'Mantenimiento', steel: 'Según envolvente', trad: 'Según materiales', icon: 'build' },
]

export default function Comparison() {
  const [ref, visible] = useInView()

  return (
    <section className="relative overflow-hidden py-28 bg-surface-container-low px-6 lg:px-10" id="comparison" ref={ref}>
      <div className="bg-geo-slab bg-geo-slab-center" />
      <div className="bg-geo-corners bg-geo-corners-left" />
      <div className="bg-geo-dots bg-geo-dots-comparison" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className={`text-center mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Comparativa</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-mask-reveal-wrapper">
              <span className="text-mask-reveal-line">Steel Frame vs. Tradicional</span>
            </span>
          </h2>
          <p className="text-on-surface-variant text-lg mt-4 max-w-md mx-auto">Una lectura cualitativa de procesos; el resultado final depende del proyecto y su ejecución.</p>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm overflow-hidden animate-on-scroll scale-in ${visible ? 'visible' : ''}`}>
          {/* Header */}
          <div className="grid grid-cols-12 bg-primary text-white p-3 sm:p-5 lg:p-6">
            <div className="col-span-4 lg:col-span-5 font-headline font-bold text-[10px] sm:text-sm lg:text-base leading-tight">Característica</div>
            <div className="col-span-4 lg:col-span-4 font-headline font-bold text-[10px] sm:text-sm lg:text-base leading-tight flex items-center gap-1 sm:gap-2">
              <span className="material-symbols-outlined text-white/55 text-lg hidden sm:inline">view_column</span>
              Steel Frame
            </div>
            <div className="col-span-4 lg:col-span-3 font-headline font-bold text-[10px] sm:text-sm lg:text-base leading-tight text-white/75 flex items-center gap-1 sm:gap-2">
              <span className="material-symbols-outlined text-white/55 text-lg hidden sm:inline">view_column</span>
              Tradicional
            </div>
          </div>

          {/* Rows */}
          {rows.map(({ feature, steel, trad, icon }, i) => (
            <div
              key={feature}
              className={`grid grid-cols-12 p-5 lg:p-6 items-center hover:bg-primary/[0.02] transition-colors duration-300 ${
                i < rows.length - 1 ? 'border-b border-surface-container-high' : ''
              }`}
            >
              <div className="col-span-4 lg:col-span-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-xl hidden sm:inline">{icon}</span>
                <span className="font-bold text-[11px] sm:text-sm lg:text-base leading-tight break-words">{feature}</span>
              </div>
              <div className="col-span-4 lg:col-span-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant/55 text-base flex-shrink-0 hidden sm:inline">horizontal_rule</span>
                <span className="text-on-surface font-medium text-[11px] sm:text-sm lg:text-base leading-tight break-words">{steel}</span>
              </div>
              <div className="col-span-4 lg:col-span-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant/55 text-base flex-shrink-0 hidden sm:inline">horizontal_rule</span>
                <span className="text-on-surface font-medium text-[11px] sm:text-sm lg:text-base leading-tight break-words">{trad}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
