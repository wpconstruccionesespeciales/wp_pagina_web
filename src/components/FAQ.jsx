import { useState } from 'react'
import useInView from '../hooks/useInView'

const items = [
  {
    q: '¿Cuál es el tiempo de obra promedio?',
    a: 'Una vivienda tipo de 100m² puede estar terminada en aproximadamente 4 a 6 meses, dependiendo de la complejidad del diseño y las terminaciones elegidas.',
    icon: 'schedule',
  },
  {
    q: '¿Ofrecen llave en mano?',
    a: 'Sí, nos encargamos de todo el proceso: desde el diseño arquitectónico inicial, cálculo estructural, hasta la ejecución final y entrega de llaves.',
    icon: 'key',
  },
  {
    q: '¿Cómo es el asesoramiento inicial?',
    a: 'Realizamos una primera entrevista técnica para entender sus necesidades, presupuesto y terreno. Luego procedemos a un anteproyecto con cotización detallada.',
    icon: 'support_agent',
  },
  {
    q: '¿El Steel Frame es resistente al fuego?',
    a: 'Sí. Utilizamos placas ignífugas y materiales con clasificación REI que cumplen con todas las normativas de seguridad contra incendios vigentes.',
    icon: 'local_fire_department',
  },
  {
    q: '¿Qué garantía ofrecen sobre la estructura?',
    a: 'Ofrecemos una garantía estructural de 10 años, respaldada por certificaciones internacionales y controles de calidad en cada etapa del proyecto.',
    icon: 'verified_user',
  },
]

function AccordionItem({ q, a, icon, isOpen, onClick }) {
  return (
    <div
      className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isOpen ? 'bg-primary shadow-lg shadow-primary/10' : 'bg-surface-container-low hover:bg-surface-container-high'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-5 lg:p-6 select-none">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-white/15' : 'bg-primary/8'
        }`}>
          <span className={`material-symbols-outlined text-xl transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-primary'
          }`}>{icon}</span>
        </div>
        <span className={`flex-1 font-bold text-base lg:text-lg transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-on-surface'
        }`}>{q}</span>
        <span className={`material-symbols-outlined text-xl flex-shrink-0 transition-all duration-400 ${
          isOpen ? 'text-white/70 rotate-180' : 'text-on-surface-variant'
        }`}>
          expand_more
        </span>
      </div>

      {/* Animated content with grid trick */}
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className={`px-5 lg:px-6 pb-5 lg:pb-6 pl-[4.5rem] transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className={`leading-relaxed ${isOpen ? 'text-white/70' : 'text-on-surface-variant'}`}>{a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [ref, visible] = useInView()
  const [openIndex, setOpenIndex] = useState(-1)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  }

  return (
    <section className="py-28 bg-white px-6 lg:px-10" ref={ref}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-16 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">FAQ</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-on-surface-variant text-lg mt-4">Todo lo que necesitás saber antes de dar el primer paso.</p>
        </div>
        <div className="space-y-3 stagger-children">
          {items.map(({ q, a, icon }, i) => (
            <div key={q} className={`animate-on-scroll ${visible ? 'visible' : ''}`}>
              <AccordionItem
                q={q}
                a={a}
                icon={icon}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
