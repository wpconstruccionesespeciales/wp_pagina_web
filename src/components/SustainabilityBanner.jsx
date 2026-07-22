import useInView from '../hooks/useInView'

export default function SustainabilityBanner() {
  const [ref, visible] = useInView()

  return (
    <section className="relative py-10 md:py-12 overflow-hidden bg-gradient-to-br from-[#f9f9f8] via-[#f1f3f1] to-[#e7ebe7] border-y border-[#15251b]/[0.06] group/banner" ref={ref}>
      {/* Custom Styles for Blueprint Micro-animations & Interactive Hovers (Light Theme) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-line-light {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float-slow-light {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.35; }
          50% { transform: translateY(-8px) rotate(1deg) scale(1.02); opacity: 0.75; }
        }
        @keyframes float-reverse-light {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.35; }
          50% { transform: translateY(8px) rotate(-1.5deg) scale(1.02); opacity: 0.75; }
        }
        @keyframes spin-dashed-light {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-dot-light {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.4); opacity: 0.95; }
        }
        .animate-shimmer-light {
          animation: shimmer-line-light 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-float-svg-left-light {
          animation: float-slow-light 12s ease-in-out infinite;
        }
        .animate-float-svg-right-light {
          animation: float-reverse-light 14s ease-in-out infinite;
        }
        .animate-spin-dash-light {
          animation: spin-dashed-light 25s linear infinite;
        }
        .animate-pulse-rivet-light {
          animation: pulse-dot-light 2.5s ease-in-out infinite;
        }
      `}} />

      {/* Atmospheric Soft Light Green Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(61,140,90,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(61,140,90,0.03)_0%,transparent_40%)] pointer-events-none" />

      {/* Technical Drafting Grid (Subtle Green) */}
      <div className="absolute inset-0 border-y border-[#2a7a42]/[0.02]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(42,122,66,0.18) 80px, rgba(42,122,66,0.18) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(42,122,66,0.18) 80px, rgba(42,122,66,0.18) 81px)' }} />
      </div>

      {/* Shimmering Refraction Line Borders (Soft Green) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a7a42]/10 to-transparent overflow-hidden">
        <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#2a7a42]/15 to-transparent animate-shimmer-light" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a7a42]/10 to-transparent overflow-hidden">
        <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#2a7a42]/15 to-transparent animate-shimmer-light" style={{ animationDelay: '4s' }} />
      </div>

      {/* Drafting Crosshairs & Coordinate Axes for aesthetic depth */}
      <div className="absolute top-6 left-[18%] w-3 h-3 border-t border-l border-[#2a7a42]/15 pointer-events-none opacity-40 select-none hidden md:block" />
      <div className="absolute bottom-6 left-[18%] w-3 h-3 border-b border-l border-[#2a7a42]/15 pointer-events-none opacity-40 select-none hidden md:block" />
      <div className="absolute top-6 right-[18%] w-3 h-3 border-t border-r border-[#2a7a42]/15 pointer-events-none opacity-40 select-none hidden md:block" />
      <div className="absolute bottom-6 right-[18%] w-3 h-3 border-b border-r border-[#2a7a42]/15 pointer-events-none opacity-40 select-none hidden md:block" />
      
      {/* Tiny scatter math indicators */}
      <div className="absolute top-[18%] left-[45%] opacity-20 pointer-events-none font-mono text-[7px] text-[#2a7a42] font-black hidden lg:block select-none">+</div>
      <div className="absolute bottom-[22%] left-[32%] opacity-20 pointer-events-none font-mono text-[7px] text-[#2a7a42] font-black hidden lg:block select-none">+</div>
      <div className="absolute top-[28%] right-[40%] opacity-20 pointer-events-none font-mono text-[7px] text-[#2a7a42] font-black hidden lg:block select-none">+</div>

      {/* ARCHITECTURAL STEEL FRAME BLUEPRINTS (Glowing drafting lines - Positioned on far sides) */}
      {/* Left SVG: X-Bracing Frame */}
      <div className="absolute left-[1.5%] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none select-none animate-float-svg-left-light group-hover/banner:scale-105 group-hover/banner:opacity-90 transition-all duration-700 z-0">
        <svg width="230" height="150" viewBox="0 0 230 150" fill="none">
          {/* Reference grid */}
          <rect x="10" y="20" width="200" height="110" stroke="rgba(42, 122, 66, 0.05)" strokeWidth="0.8" strokeDasharray="3 3" />
          
          {/* PGC Stud Profiles (Montantes) */}
          <rect x="25" y="20" width="12" height="110" fill="rgba(42, 122, 66, 0.01)" stroke="rgba(42, 122, 66, 0.18)" strokeWidth="1" />
          <rect x="183" y="20" width="12" height="110" fill="rgba(42, 122, 66, 0.01)" stroke="rgba(42, 122, 66, 0.18)" strokeWidth="1" />
          <rect x="104" y="20" width="12" height="110" fill="rgba(42, 122, 66, 0.005)" stroke="rgba(42, 122, 66, 0.18)" strokeWidth="1" />
          
          {/* PGU Track Profiles (Soleras) */}
          <rect x="25" y="10" width="170" height="10" fill="rgba(42, 122, 66, 0.01)" stroke="rgba(42, 122, 66, 0.18)" strokeWidth="1" />
          <rect x="25" y="130" width="170" height="10" fill="rgba(42, 122, 66, 0.01)" stroke="rgba(42, 122, 66, 0.18)" strokeWidth="1" />
          
          {/* X-Bracing Straps */}
          <line x1="25" y1="20" x2="195" y2="130" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <line x1="195" y1="20" x2="25" y2="130" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          
          {/* Nodes (Green rivets with tiny crosshairs) */}
          <circle cx="31" cy="15" r="1.5" fill="#2a7a42" className="animate-pulse-rivet-light" />
          <line x1="29" y1="15" x2="33" y2="15" stroke="rgba(42, 122, 66, 0.5)" strokeWidth="0.5" />
          <line x1="31" y1="13" x2="31" y2="17" stroke="rgba(42, 122, 66, 0.5)" strokeWidth="0.5" />

          <circle cx="189" cy="15" r="1.5" fill="#2a7a42" />
          
          <circle cx="31" cy="135" r="1.5" fill="#2a7a42" />
          
          <circle cx="189" cy="135" r="1.5" fill="#2a7a42" className="animate-pulse-rivet-light" style={{ animationDelay: '1s' }} />
          <line x1="187" y1="135" x2="191" y2="135" stroke="rgba(42, 122, 66, 0.5)" strokeWidth="0.5" />
          <line x1="189" y1="133" x2="189" y2="137" stroke="rgba(42, 122, 66, 0.5)" strokeWidth="0.5" />

          <circle cx="110" cy="75" r="2" fill="#2a7a42" className="animate-pulse-rivet-light" style={{ animationDelay: '0.5s' }} />
          
          {/* Dimension Line */}
          <line x1="25" y1="145" x2="195" y2="145" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <line x1="25" y1="141" x2="25" y2="149" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <line x1="195" y1="141" x2="195" y2="149" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <text x="110" y="142" fill="rgba(42, 122, 66, 0.45)" fontSize="6.5" fontFamily="Space Grotesk" textAnchor="middle">e = 400mm (MODULO STRUCT)</text>
          
          {/* Engineering Welding Callout Symbol */}
          <path d="M 110 75 L 126 62 L 148 62" stroke="rgba(42, 122, 66, 0.3)" strokeWidth="0.8" fill="none" />
          <polygon points="110,75 114,71 113,76" fill="rgba(42, 122, 66, 0.4)" />
          <text x="128" y="58" fill="rgba(42, 122, 66, 0.5)" fontSize="5.5" fontFamily="Space Grotesk">a = 3 (TIG JOINT)</text>

          {/* Structural notations */}
          <text x="42" y="45" fill="rgba(42, 122, 66, 0.5)" fontSize="6.5" fontFamily="Space Grotesk">PGC 100x0.9</text>
          <text x="140" y="105" fill="rgba(42, 122, 66, 0.4)" fontSize="5.5" fontFamily="Space Grotesk" letterSpacing="1">X-BRACING STRAP</text>
        </svg>
      </div>

      {/* Right SVG: PGC Profile cross-section */}
      <div className="absolute right-[1.5%] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none select-none animate-float-svg-right-light group-hover/banner:scale-105 group-hover/banner:opacity-90 transition-all duration-700 z-0">
        <svg width="190" height="150" viewBox="0 0 190 150" fill="none">
          {/* Steel cross section PGC */}
          <path d="M 115 25 L 55 25 A 5 5 0 0 0 50 30 L 50 120 A 5 5 0 0 0 55 125 L 115 125 L 115 113 L 62 113 A 3 3 0 0 1 59 110 L 59 40 A 3 3 0 0 1 62 37 L 115 37 Z" fill="rgba(42, 122, 66, 0.02)" stroke="rgba(42, 122, 66, 0.35)" strokeWidth="1.2" />
          
          {/* Lips */}
          <path d="M 115 25 L 115 45 L 107 45 L 107 37" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <path d="M 115 125 L 115 105 L 107 105 L 107 113" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          
          {/* Alma - A */}
          <line x1="30" y1="30" x2="30" y2="120" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <path d="M 27 33 L 30 30 L 33 33 M 27 117 L 30 120 L 33 117" stroke="rgba(42, 122, 66, 0.3)" strokeWidth="0.8" />
          <text x="21" y="78" fill="rgba(42, 122, 66, 0.5)" fontSize="7" fontFamily="Space Grotesk" textAnchor="middle" transform="rotate(-90 21 78)">A = 100 mm</text>
          
          {/* Ala - B */}
          <line x1="50" y1="14" x2="115" y2="14" stroke="rgba(42, 122, 66, 0.22)" strokeWidth="0.8" />
          <path d="M 53 11 L 50 14 L 53 17 M 112 11 L 115 14 L 112 17" stroke="rgba(42, 122, 66, 0.3)" strokeWidth="0.8" />
          <text x="82" y="9" fill="rgba(42, 122, 66, 0.5)" fontSize="7" fontFamily="Space Grotesk" textAnchor="middle">B = 40 mm</text>
          
          {/* Angle Arc Dimension */}
          <path d="M 50 32 A 8 8 0 0 1 58 40" stroke="rgba(42, 122, 66, 0.45)" strokeWidth="0.8" fill="none" />
          <text x="61" y="32" fill="rgba(42, 122, 66, 0.65)" fontSize="5.5" fontFamily="Space Grotesk">90° ± 0.5°</text>

          {/* Intrinsic Radius callout */}
          <line x1="50" y1="30" x2="38" y2="18" stroke="rgba(42, 122, 66, 0.35)" strokeWidth="0.6" />
          <circle cx="50" cy="30" r="1" fill="rgba(42, 122, 66, 0.8)" />
          <text x="36" y="14" fill="rgba(42, 122, 66, 0.55)" fontSize="5" fontFamily="Space Grotesk" textAnchor="end">r = 3.0mm</text>

          {/* Technical blueprint specs */}
          <text x="78" y="72" fill="rgba(42, 122, 66, 0.18)" fontSize="8.5" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle">PGC PROFILE</text>
          <text x="78" y="84" fill="rgba(42, 122, 66, 0.5)" fontSize="6" fontFamily="Space Grotesk" textAnchor="middle">t = 0.90 mm (Z275)</text>
          <text x="125" y="38" fill="rgba(42, 122, 66, 0.45)" fontSize="6.5" fontFamily="Space Grotesk">C = 12 mm</text>

          {/* Bottom engineering standards label */}
          <text x="78" y="142" fill="rgba(42, 122, 66, 0.35)" fontSize="5" fontFamily="Space Grotesk" textAnchor="middle">* TOLERANCIAS SEGÚN EN 10162</text>
        </svg>
      </div>

      {/* AUTHENTIC DRAFTING PLOT/BLUEPRINT STAMP BOX (Rótulo de Plano) */}
      <div className="absolute bottom-2 right-6 hidden lg:block opacity-[0.6] select-none pointer-events-none border border-[#2a7a42]/15 bg-white/70 backdrop-blur-sm text-[#2a7a42]/70 font-mono text-[6.5px] tracking-wide leading-none p-1.5 rounded shadow-sm z-10">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="border-r border-[#2a7a42]/15 pr-2">PROY: <span className="font-bold">STEEL-CORE / DIV</span></div>
          <div>REV: <span className="font-bold">B.03</span></div>
          <div className="border-r border-[#2a7a42]/15 pr-2">ESCALA: <span className="font-bold">1:12</span></div>
          <div>SIST: <span className="font-bold">LIGHT GAUGE STEEL</span></div>
          <div className="border-r border-[#2a7a42]/15 pr-2">MAT: <span className="font-bold">GALV STEEL Z275</span></div>
          <div>AUTOR: <span className="font-bold">WP TECH</span></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 animate-on-scroll from-right-full ${visible ? 'visible' : ''}`}>
          
          {/* Left Block: Icon & Main Message */}
          <div className="flex items-center gap-5 sm:gap-6 w-full lg:w-auto">
            {/* Spinning & Pulsing Green Icon Box */}
            <div className="relative flex-shrink-0 group">
              {/* Dashed outer ring that spins slowly */}
              <div className="absolute -inset-2 rounded-2xl border border-dashed border-[#2a7a42]/30 animate-spin-dash-light pointer-events-none" />
              {/* Inner glowing pulse ring */}
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-br from-[#2a7a42]/15 to-[#1e5530]/8 blur-sm opacity-80 group-hover:scale-110 transition-transform duration-500" />
              
              {/* The Core Emblem */}
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a7a42]/20 via-[#2a7a42]/8 to-white flex items-center justify-center border border-[#2a7a42]/20 group-hover:border-[#2a7a42]/40 backdrop-blur-md shadow-sm transition-all duration-500">
                <span className="material-symbols-outlined text-[#2a7a42] text-2xl group-hover:scale-110 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
            </div>

            {/* Title & Eyebrow */}
            <div className="relative flex-grow">
              {/* Vertically split indicator */}
              <div className="absolute -left-4 top-1.5 bottom-1.5 w-[2px] bg-gradient-to-b from-transparent via-[#2a7a42]/30 to-transparent hidden sm:block" />
              <p className="text-[#2a7a42] text-[11px] font-black tracking-[0.3em] uppercase mb-1.5">Criterios Ambientales</p>
              <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug text-primary">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#5cb876] to-[#2a7a42]">Steel Frame:</span>{' '}
                <span className="text-on-surface-variant/90 font-medium">decisiones de material, montaje y envolvente</span>
              </h2>
            </div>
          </div>

          {/* Right Block: High-fidelity Glassmorphic Stats & Outlined-to-Solid CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto z-10">
            
            {/* Stats panel in high end Glassmorphism */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full sm:w-auto">
              
              {/* Stat 1 */}
              <div className="group flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-white/60 border border-[#2a7a42]/12 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:bg-white/80 hover:border-primary hover:shadow-[0_4px_20px_rgba(42,122,66,0.08)] hover:-translate-y-0.5 transition-all duration-500">
                <span className="text-[#2a7a42] text-xl md:text-2xl font-black font-headline tracking-tight group-hover:scale-105 transition-transform duration-300">CNC</span>
                <span className="text-on-surface-variant/60 text-[9px] font-bold uppercase tracking-wider text-center mt-0.5 group-hover:text-primary transition-colors duration-300">corte planificado</span>
              </div>
              
              {/* Stat 2 */}
              <div className="group flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-white/60 border border-[#2a7a42]/12 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:bg-white/80 hover:border-primary hover:shadow-[0_4px_20px_rgba(42,122,66,0.08)] hover:-translate-y-0.5 transition-all duration-500">
                <span className="text-[#2a7a42] text-xl md:text-2xl font-black font-headline tracking-tight group-hover:scale-105 transition-transform duration-300">ACERO</span>
                <span className="text-on-surface-variant/60 text-[9px] font-bold uppercase tracking-wider text-center mt-0.5 group-hover:text-primary transition-colors duration-300">material recuperable</span>
              </div>
              
              {/* Stat 3 */}
              <div className="group flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-white/60 border border-[#2a7a42]/12 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:bg-white/80 hover:border-primary hover:shadow-[0_4px_20px_rgba(42,122,66,0.08)] hover:-translate-y-0.5 transition-all duration-500">
                <span className="text-[#2a7a42] text-xl md:text-2xl font-black font-headline tracking-tight group-hover:scale-105 transition-transform duration-300">CAPAS</span>
                <span className="text-on-surface-variant/60 text-[9px] font-bold uppercase tracking-wider text-center mt-0.5 group-hover:text-primary transition-colors duration-300">envolvente adaptable</span>
              </div>
              
            </div>

            {/* "Conocer más" Premium Outlined to Solid Button */}
            <a
              href="/sostenibilidad"
              className="group flex items-center justify-center gap-3 bg-[#2a7a42]/8 hover:bg-[#2a7a42] border border-[#2a7a42]/15 hover:border-[#2a7a42] px-6 py-3.5 rounded-xl transition-all duration-500 backdrop-blur-md shadow-sm hover:shadow-[0_4px_22px_rgba(42,122,66,0.18)] hover:-translate-y-0.5 text-center"
            >
              <span className="text-[#2a7a42] group-hover:text-white font-bold text-sm tracking-wide transition-colors duration-500">Conocer más</span>
              <span className="material-symbols-outlined text-[#2a7a42] group-hover:text-white text-lg group-hover:translate-x-1.5 transition-all duration-500">arrow_forward</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  )
}
