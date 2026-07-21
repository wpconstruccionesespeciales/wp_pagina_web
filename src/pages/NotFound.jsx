import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f9f9f8] text-[#191c1c] font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden flex flex-col justify-between">
      <SEO 
        title="Página no encontrada (404) | WP Construcciones Especiales"
        description="Dirección fuera de escuadra. Lo sentimos, la página que buscas no existe o ha sido trasladada."
        robots="noindex, nofollow"
      />
      <NavBar />

      <main className="relative flex-grow flex items-center pt-28 pb-16 z-10">
        {/* Subtle grid background on the left side */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] lg:opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #173b2e, #173b2e 40px, transparent 40px, transparent 80px), repeating-linear-gradient(0deg, #173b2e, #173b2e 40px, transparent 40px, transparent 80px)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - 404 Status */}
            <div className="lg:col-span-5 flex flex-col text-left">
              {/* Engineering/Construction theme badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#173b2e]/10 border border-[#173b2e]/15 text-[#173b2e] text-[11px] font-extrabold tracking-widest uppercase mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35C36B] animate-ping" />
                Error de Replanteo
              </div>

              {/* Huge stylized 404 */}
              <div className="relative mb-6 select-none">
                <span className="font-headline text-[10rem] md:text-[12rem] font-black text-[#173b2e]/10 leading-none tracking-tighter">
                  404
                </span>
                <span className="absolute bottom-2 left-0 font-headline text-5xl md:text-6xl font-black text-[#173b2e] leading-none tracking-tight">
                  Oops.
                </span>
              </div>

              {/* Title */}
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#173b2e] leading-tight mb-4">
                Dirección fuera de escuadra
              </h1>

              {/* Description */}
              <p className="text-[#20352c]/75 text-base md:text-lg leading-relaxed mb-8">
                La página que está buscando no existe, ha sido movida o está bajo un proceso de remodelación estructural. Utilice el plano de navegación de la derecha para retomar el rumbo.
              </p>

              {/* Technical disclaimer */}
              <div className="p-4 rounded-xl bg-white border border-[#e6efe9] flex items-start gap-3.5 max-w-sm">
                <span className="material-symbols-outlined text-[#35C36B] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <div>
                  <h4 className="text-xs font-bold text-[#173b2e] uppercase tracking-wider mb-0.5">Nota Técnica</h4>
                  <p className="text-xs text-[#20352c]/70 leading-relaxed">Código de error HTTP 404. La solicitud fue completada pero el recurso no pudo ser replanteado en el servidor.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Navigation Cards */}
            <div className="lg:col-span-7 flex flex-col">
              <h2 className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#20352c]/65 mb-8">
                Plano de Navegación Recomendado
              </h2>

              <div className="space-y-6">
                {/* Card 1 - WP Construcciones */}
                <Link
                  to="/"
                  className="group block p-6 sm:p-8 rounded-2xl bg-white border border-[#e6efe9] shadow-sm hover:shadow-md hover:border-[#35C36B]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#173b2e]/8 text-[#173b2e] flex items-center justify-center flex-shrink-0 group-hover:bg-[#35C36B] group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>home_work</span>
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-headline text-lg sm:text-xl font-bold text-[#173b2e]">
                          WP · Construcciones Especiales
                        </h3>
                        <span className="material-symbols-outlined text-xl text-[#35C36B] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">arrow_forward</span>
                      </div>
                      <p className="text-sm text-[#20352c]/70 leading-relaxed">
                        Volvé a la página principal para recorrer nuestros servicios de Steel Frame, conocer aplicaciones del sistema y encontrar las vías de contacto para tu proyecto.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Steel Frame', 'Obras a Medida', 'Ingeniería', 'Contacto'].map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#f3f7f4] text-[#173b2e]/80 border border-[#e6efe9]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Card 2 - WMU Modular */}
                <Link
                  to="/wmu"
                  className="group block p-6 sm:p-8 rounded-2xl bg-white border border-[#e6efe9] shadow-sm hover:shadow-md hover:border-[#35C36B]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-[#35C36B]/8 text-[#35C36B] flex items-center justify-center flex-shrink-0 group-hover:bg-[#35C36B] group-hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>widgets</span>
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-headline text-lg sm:text-xl font-bold text-[#173b2e]">
                          WMU · Arquitectura Modular
                        </h3>
                        <span className="material-symbols-outlined text-xl text-[#35C36B] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">arrow_forward</span>
                      </div>
                      <p className="text-sm text-[#20352c]/70 leading-relaxed">
                        Explorá los modelos WMU disponibles, consultá su información técnica y conocé las opciones de configuración y contacto de la propuesta modular.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Arquitectura Modular', 'Modelos WMU', 'Configuración', 'Información Técnica'].map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#f3f7f4] text-[#173b2e]/80 border border-[#e6efe9]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer showCTA={false} />
    </div>
  )
}
