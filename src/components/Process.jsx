import useInView from '../hooks/useInView'

const steps = [
  {
    num: '01',
    icon: 'chat',
    title: 'Consulta Inicial',
    desc: 'Analizamos tu terreno, necesidades y presupuesto en una entrevista técnica personalizada.',
  },
  {
    num: '02',
    icon: 'draw',
    title: 'Diseño & Ingeniería',
    desc: 'Modelamos tu proyecto en 3D para que veas cómo quedará antes de construir.',
  },
  {
    num: '03',
    icon: 'precision_manufacturing',
    title: 'Fabricación',
    desc: 'Cada perfil es cortado y perforado con precisión milimétrica en nuestras instalaciones.',
  },
  {
    num: '04',
    icon: 'construction',
    title: 'Montaje & Entrega',
    desc: 'Ensamblaje en sitio con equipos especializados. Obra limpia, rápida y sin sorpresas.',
  },
]

export default function Process() {
  const [ref, visible] = useInView()

  return (
    <section className="relative overflow-hidden py-28 bg-white px-6 lg:px-10" id="process" ref={ref}>
      <div className="bg-geo-arch bg-geo-arch-right" />
      <div className="bg-geo-dots bg-geo-dots-left" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Cómo Trabajamos</p>
          <h2 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight text-primary">Nuestro Proceso</h2>
          <p className="text-on-surface-variant text-lg mt-5 max-w-lg mx-auto">De la idea al proyecto terminado, en cuatro pasos claros y transparentes.</p>
        </div>

        {/* Timeline */}
        <div className="relative stagger-children">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[12%] right-[12%] h-px bg-outline-variant/40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map(({ num, icon, title, desc }) => (
              <div
                key={num}
                className={`relative text-center group animate-on-scroll ${visible ? 'visible' : ''}`}
              >
                {/* Number + Icon circle */}
                <div className="relative inline-flex flex-col items-center mb-8">
                  <div className="w-[6.5rem] h-[6.5rem] rounded-full bg-surface-container-low border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/15 transition-all duration-500 relative z-10">
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-colors duration-500">{icon}</span>
                  </div>
                  <span className="absolute -bottom-3 bg-primary text-white text-[11px] font-black tracking-widest px-3 py-0.5 rounded-full z-20 font-headline">{num}</span>
                </div>

                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-[260px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
