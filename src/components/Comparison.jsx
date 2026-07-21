import useInView from '../hooks/useInView'

const rows = [
  { feature: 'Tiempo de obra', steel: 'Ultra rápido (Meses)', trad: 'Lento (Años)', icon: 'schedule' },
  { feature: 'Residuos', steel: 'Obra limpia (90% menos)', trad: 'Alto volumen de escombros', icon: 'delete' },
  { feature: 'Aislación Térmica', steel: 'Excelente (70% ahorro)', trad: 'Deficiente', icon: 'thermostat' },
  { feature: 'Precisión', steel: 'Ingeniería milimétrica', trad: 'Variable / Artesanal', icon: 'straighten' },
  { feature: 'Mantenimiento', steel: 'Mínimo / Sin grietas', trad: 'Frecuente / Humedades', icon: 'build' },
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
          <p className="text-on-surface-variant text-lg mt-4 max-w-md mx-auto">Datos reales que demuestran la superioridad del sistema constructivo en seco.</p>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm overflow-hidden animate-on-scroll scale-in ${visible ? 'visible' : ''}`}>
          {/* Header */}
          <div className="grid grid-cols-12 bg-primary text-white p-5 lg:p-6">
            <div className="col-span-4 lg:col-span-5 font-headline font-bold text-sm lg:text-base">Característica</div>
            <div className="col-span-4 lg:col-span-4 font-headline font-bold text-sm lg:text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Steel Frame
            </div>
            <div className="col-span-4 lg:col-span-3 font-headline font-bold text-sm lg:text-base text-white/60">Tradicional</div>
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
                <span className="font-bold text-sm lg:text-base">{feature}</span>
              </div>
              <div className="col-span-4 lg:col-span-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-lg flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-primary font-medium text-sm lg:text-base">{steel}</span>
              </div>
              <div className="col-span-4 lg:col-span-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400 text-lg flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                <span className="text-on-surface-variant text-sm lg:text-base">{trad}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
