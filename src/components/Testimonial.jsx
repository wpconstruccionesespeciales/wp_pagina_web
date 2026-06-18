import { useState } from 'react'
import useInView from '../hooks/useInView'

const videos = [
  {
    id: 'NDqpdEcsJb4',
    title: 'Steel Frame Premium',
  },
  {
    id: '3oQQF8ltFMI',
    title: 'Proceso de Construcción',
  },
  {
    id: 'X1UoRbwOkU4',
    title: 'Sistema Modular',
  },
  {
    id: '8ob8MJEE_gg',
    title: 'Innovación Técnica',
  },
  {
    id: 'JWl5O1SJbBs',
    title: 'Obra Limpia y Eficiente',
  },
]

export default function Prensa() {
  const [ref, visible] = useInView()
  const [active, setActive] = useState(0)

  return (
    <section className="py-28 bg-surface-container-low overflow-hidden" id="prensa" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14 animate-on-scroll ${visible ? 'visible' : ''}`}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Prensa</p>
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary tracking-tight">Nuestra labor en los medios</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm lg:text-right">
            Cobertura mediática que respalda nuestra trayectoria y compromiso con la excelencia constructiva.
          </p>
        </div>

        {/* Main video + thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Featured video */}
          <div className={`lg:col-span-3 animate-on-scroll from-left ${visible ? 'visible' : ''}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-primary/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videos[active].id}?rel=0`}
                title={videos[active].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <h3 className="font-headline text-xl font-bold mt-4">{videos[active].title}</h3>
          </div>

          {/* Thumbnail grid */}
          <div className={`lg:col-span-2 grid grid-cols-3 lg:grid-cols-2 gap-3 animate-on-scroll from-right ${visible ? 'visible' : ''}`}>
            {videos.map((video, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                  i === active
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  className="w-full aspect-video object-cover"
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_circle
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-white text-xs font-bold line-clamp-1">{video.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
