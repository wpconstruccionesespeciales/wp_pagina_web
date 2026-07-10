import { motion as Motion } from 'framer-motion'

function AnimatedText({ text, className, highlightWords = [] }) {
  const words = text.split(' ')
  return (
    <Motion.h2 className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(h => word.toLowerCase().includes(h.toLowerCase()))
        return (
          <Motion.span
            key={i}
            className={`inline-block mr-[0.28em] ${isHighlight ? 'text-primary-fixed' : ''}`}
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: {
                opacity: 1, y: 0, filter: 'blur(0px)',
                transition: { duration: 0.45, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            {word}
          </Motion.span>
        )
      })}
    </Motion.h2>
  )
}

function BuildingBlueprint() {
  const colCenters = [60, 138, 216, 294, 372]
  const floors = [475, 380, 285, 190]
  const roofY = 105
  const ridgeY = 55

  return (
    <Motion.svg
      viewBox="0 0 520 620"
      className="w-full h-auto drop-shadow-2xl"
      fill="none"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <pattern id="isogrid" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.04" />
        </pattern>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 0 4 L 4 0" stroke="currentColor" strokeWidth="0.4" opacity="0.08" />
        </pattern>
        <pattern id="earth" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 0 3 L 6 3" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          <path d="M 3 0 L 3 6" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
        </pattern>
        <linearGradient id="bgGlow" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.02" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <filter id="neon">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="520" height="620" fill="url(#isogrid)" className="text-primary-fixed" />
      <rect x="35" y="100" width="355" height="435" rx="3" fill="url(#bgGlow)" className="text-primary-fixed" />

      <rect x="20" y="530" width="385" height="20" rx="1" fill="url(#earth)" className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="535" x2="405" y2="535" className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.2" />

      <rect x="40" y="518" width="345" height="12" rx="1.5" className="text-primary-fixed-dim" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="42" y="522" width="341" height="4" rx="1" fill="url(#hatch)" className="text-primary-fixed-dim" />
      {colCenters.map(cx => (
        <rect key={`f-${cx}`} x={cx - 4} y="518" width="8" height="18" rx="1" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="0.8" className="text-primary-fixed-dim" />
      ))}

      {colCenters.map((cx, ci) => {
        const isHighlight = ci === 2
        return (
          <g key={`col-${cx}`}>
            <rect x={cx - 5} y={roofY} width="10" height={518 - roofY} fill="currentColor" rx="1" opacity="0.15" className="text-primary-fixed" />
            <g filter={isHighlight ? 'url(#neon)' : undefined}>
              <rect x={cx - 5} y={roofY} width="3" height={518 - roofY} fill="currentColor" rx="0.5" className={isHighlight ? 'text-[#e8f5e9]' : 'text-primary-fixed'} />
              <rect x={cx + 2} y={roofY} width="3" height={518 - roofY} fill="currentColor" rx="0.5" className={isHighlight ? 'text-[#e8f5e9]' : 'text-primary-fixed'} />
            </g>
            <line x1={cx - 1} y1={roofY} x2={cx - 1} y2={518} stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" className="text-primary-fixed" opacity="0.3" />
            {[475, 380, 285, 190, 105].map(fy => (
              <g key={`fl-${fy}`}>
                <rect x={cx - 7} y={fy - 5} width="14" height="3" rx="0.5" fill="currentColor" className={isHighlight ? 'text-[#e8f5e9]' : 'text-primary-fixed'} opacity={isHighlight ? 0.9 : 0.6} />
                <rect x={cx - 7} y={fy + 2} width="14" height="3" rx="0.5" fill="currentColor" className={isHighlight ? 'text-[#e8f5e9]' : 'text-primary-fixed'} opacity={isHighlight ? 0.9 : 0.6} />
              </g>
            ))}
          </g>
        )
      })}

      {floors.map(fy => (
        <g key={`beam-${fy}`}>
          <line x1="60" y1={fy} x2="372" y2={fy} className="text-primary-fixed" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="60" y={fy - 2} width="312" height="6" rx="1" fill="url(#hatch)" className="text-primary-fixed" opacity="0.15" />
          <line x1="60" y1={fy + 6} x2="372" y2={fy + 6} className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        </g>
      ))}

      {floors.map(fy =>
        colCenters.slice(0, -1).map((cx, i) => (
          <g key={`g-${cx}-${fy}`}>
            <rect x={cx + 10} y={fy - 7} width={colCenters[i + 1] - cx - 20} height="14" rx="1.5" fill="currentColor" fillOpacity="0.06" className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
            {[cx + 20, colCenters[i + 1] - 20].map(bx => (
              <circle key={`bl-${bx}`} cx={bx} cy={fy} r="1.5" fill="currentColor" className="text-primary-fixed-dim" opacity="0.4" />
            ))}
          </g>
        ))
      )}

      <g className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        {[0, 2].map(bi => (
          <g key={`xb-${bi}`}>
            <line x1={colCenters[bi]} y1={floors[0]} x2={colCenters[bi + 1]} y2={floors[1]} />
            <line x1={colCenters[bi + 1]} y1={floors[0]} x2={colCenters[bi]} y2={floors[1]} />
            <line x1={colCenters[bi]} y1={floors[2]} x2={colCenters[bi + 1]} y2={floors[3]} />
            <line x1={colCenters[bi + 1]} y1={floors[2]} x2={colCenters[bi]} y2={floors[3]} />
          </g>
        ))}
        <line x1={colCenters[2]} y1={floors[1]} x2={colCenters[3]} y2={floors[2]} />
        <line x1={colCenters[3]} y1={floors[1]} x2={colCenters[2]} y2={floors[2]} />
        <line x1={colCenters[3]} y1={floors[0]} x2={colCenters[4]} y2={floors[1]} />
        <line x1={colCenters[4]} y1={floors[0]} x2={colCenters[3]} y2={floors[1]} />
      </g>

      <g className="text-primary-fixed" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <line x1="60" y1={roofY} x2="372" y2={roofY} strokeWidth="4.5" />
        <line x1="216" y1={ridgeY} x2="216" y2={roofY} strokeWidth="4.5" filter="url(#neon)" className="text-[#e8f5e9]" />
        <line x1="60" y1={roofY} x2="216" y2={ridgeY} strokeWidth="3.5" />
        <line x1="216" y1={ridgeY} x2="372" y2={roofY} strokeWidth="3.5" />
        <g className="text-primary-fixed-dim" strokeOpacity="0.35" strokeWidth="1">
          <line x1="100" y1={ridgeY + 18} x2="216" y2={ridgeY + 6} />
          <line x1="140" y1={ridgeY + 14} x2="216" y2={ridgeY + 3} />
          <line x1="292" y1={ridgeY + 14} x2="216" y2={ridgeY + 3} />
          <line x1="332" y1={ridgeY + 18} x2="216" y2={ridgeY + 6} />
        </g>
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.18">
        {colCenters.map((cx, i) => (
          <line key={`gl-${i}`} x1={cx} y1={ridgeY - 15} x2={cx} y2={540} />
        ))}
      </g>

      <g className="text-primary-fixed-dim">
        {[
          { x: 60, label: '1' }, { x: 138, label: '2' }, { x: 216, label: '3' },
          { x: 294, label: '4' }, { x: 372, label: '5' }
        ].map(({ x, label }) => (
          <g key={`ax-${label}`}>
            <circle cx={x} cy={ridgeY - 22} r="7" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
            <text x={x} y={ridgeY - 19} fill="currentColor" fontSize="7" fontFamily="Manrope, sans-serif" fontWeight="700" textAnchor="middle" opacity="0.4">{label}</text>
          </g>
        ))}
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor">
        <line x1="25" y1="518" x2="15" y2="518" strokeWidth="0.8" />
        <line x1="25" y1="105" x2="15" y2="105" strokeWidth="0.8" />
        <line x1="20" y1="518" x2="20" y2="105" strokeWidth="0.6" strokeDasharray="2 2" />
        <polyline points="18,513 23,518 18,523" strokeWidth="0.6" fill="none" />
        <polyline points="18,100 23,105 18,110" strokeWidth="0.6" fill="none" />
        {floors.map((fy, i) => (
          <g key={`vl-${i}`}>
            <line x1="28" y1={fy} x2="18" y2={fy} strokeWidth="0.6" />
            <line x1="23" y1={fy} x2="23" y2="518" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.15" />
            <text x="16" y={fy + 2} fill="currentColor" fontSize="6.5" fontFamily="Manrope, sans-serif" fontWeight="600" textAnchor="end" opacity="0.4">+{((i + 1) * 3).toFixed(1)}</text>
          </g>
        ))}
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor">
        <line x1="385" y1="518" x2="395" y2="518" strokeWidth="0.8" />
        <line x1="385" y1="105" x2="395" y2="105" strokeWidth="0.8" />
        <line x1="390" y1="518" x2="390" y2="105" strokeWidth="0.6" strokeDasharray="2 2" />
        <polyline points="392,513 387,518 392,523" strokeWidth="0.6" fill="none" />
        <polyline points="392,100 387,105 392,110" strokeWidth="0.6" fill="none" />
        {floors.map((fy, i) => (
          <g key={`vr-${i}`}>
            <line x1="382" y1={fy} x2="395" y2={fy} strokeWidth="0.6" />
            <text x="397" y={fy + 2} fill="currentColor" fontSize="6.5" fontFamily="Manrope, sans-serif" fontWeight="600" textAnchor="start" opacity="0.4">N+{((i + 1) * 3).toFixed(1)}</text>
          </g>
        ))}
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor">
        <line x1="60" y1="542" x2="60" y2="552" strokeWidth="0.8" />
        <line x1="372" y1="542" x2="372" y2="552" strokeWidth="0.8" />
        <line x1="60" y1="547" x2="372" y2="547" strokeWidth="0.6" />
        <polyline points="65,544 60,549 65,554" strokeWidth="0.6" fill="none" />
        <polyline points="367,544 372,549 367,554" strokeWidth="0.6" fill="none" />
        {colCenters.slice(0, -1).map((cx, i) => (
          <g key={`hd-${i}`}>
            <line x1={cx} y1="544" x2={cx} y2="550" strokeWidth="0.5" />
            <text x={(cx + colCenters[i + 1]) / 2} y="552" fill="currentColor" fontSize="6" fontFamily="Manrope, sans-serif" fontWeight="600" textAnchor="middle" opacity="0.35">{colCenters[i + 1] - cx}</text>
          </g>
        ))}
        <text x="216" y="559" fill="currentColor" fontSize="8" fontFamily="Manrope, sans-serif" fontWeight="600" textAnchor="middle" opacity="0.35" letterSpacing="0.1">24.00</text>
      </g>

      <g className="text-primary-fixed-dim" transform="translate(245, 575)">
        <rect x="0" y="0" width="20" height="4" fill="currentColor" opacity="0.3" />
        <rect x="20" y="0" width="20" height="4" fill="currentColor" opacity="0.12" />
        <rect x="40" y="0" width="20" height="4" fill="currentColor" opacity="0.3" />
        <rect x="60" y="0" width="20" height="4" fill="currentColor" opacity="0.12" />
        <text x="0" y="12" fill="currentColor" fontSize="5" fontFamily="Manrope, sans-serif" textAnchor="middle" opacity="0.35">0</text>
        <text x="20" y="12" fill="currentColor" fontSize="5" fontFamily="Manrope, sans-serif" textAnchor="middle" opacity="0.35">2</text>
        <text x="40" y="12" fill="currentColor" fontSize="5" fontFamily="Manrope, sans-serif" textAnchor="middle" opacity="0.35">4</text>
        <text x="60" y="12" fill="currentColor" fontSize="5" fontFamily="Manrope, sans-serif" textAnchor="middle" opacity="0.35">6</text>
        <text x="82" y="4" fill="currentColor" fontSize="4.5" fontFamily="Manrope, sans-serif" opacity="0.25">m</text>
      </g>

      <g className="text-primary-fixed-dim" fill="currentColor" transform="translate(460, 60)" opacity="0.3">
        <polygon points="0,-12 3,-4 8,-8 4,0 12,0 4,0 8,8 3,4 0,12 -3,4 -8,8 -4,0 -12,0 -4,0 -8,-8 -3,-4" />
        <text x="0" y="4" fill="currentColor" fontSize="3.5" fontFamily="Manrope, sans-serif" textAnchor="middle" fontWeight="700">N</text>
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor">
        <rect x="335" y="585" width="160" height="28" rx="1.5" strokeWidth="0.8" fill="currentColor" fillOpacity="0.04" />
        <line x1="335" y1="598" x2="495" y2="598" strokeWidth="0.4" opacity="0.3" />
        <text x="345" y="594" fill="currentColor" fontSize="5.5" fontFamily="Space Grotesk, sans-serif" fontWeight="700" opacity="0.6">STEEL CORE · WP</text>
        <text x="345" y="607" fill="currentColor" fontSize="4.5" fontFamily="Manrope, sans-serif" opacity="0.3">VISTA ELEVACIÓN · ESC 1:100</text>
        <text x="475" y="594" fill="currentColor" fontSize="4.5" fontFamily="Manrope, sans-serif" textAnchor="end" opacity="0.25">01-2025</text>
        <text x="475" y="607" fill="currentColor" fontSize="4.5" fontFamily="Manrope, sans-serif" textAnchor="end" opacity="0.25">REV A</text>
      </g>

      <g className="text-primary-fixed-dim" stroke="currentColor" strokeWidth="0.5" opacity="0.08">
        <rect x="10" y="10" width="500" height="600" rx="3" />
        <rect x="13" y="13" width="494" height="594" rx="2" />
        <rect x="24" y="24" width="472" height="572" rx="1.5" />
      </g>
    </Motion.svg>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { x: '10%', y: '15%', s: 3, d: 0, dur: 4 },
        { x: '88%', y: '20%', s: 2, d: 0.6, dur: 5 },
        { x: '92%', y: '75%', s: 4, d: 1.4, dur: 3.5 },
        { x: '6%', y: '82%', s: 2, d: 0.3, dur: 4.5 },
        { x: '95%', y: '45%', s: 2.5, d: 2.2, dur: 6 },
        { x: '4%', y: '50%', s: 1.5, d: 3, dur: 5.5 },
        { x: '50%', y: '8%', s: 3, d: 1, dur: 4 },
        { x: '55%', y: '92%', s: 2, d: 2.6, dur: 3.8 },
        { x: '75%', y: '35%', s: 1.8, d: 1.8, dur: 5.2 },
        { x: '25%', y: '65%', s: 2.2, d: 0.9, dur: 4.8 },
        { x: '15%', y: '35%', s: 1.5, d: 3.5, dur: 6.5 },
        { x: '70%', y: '55%', s: 2.8, d: 2, dur: 3.2 },
      ].map((d, i) => (
        <Motion.div
          key={i}
          className="absolute rounded-full bg-primary-fixed-dim"
          style={{ left: d.x, top: d.y, width: d.s, height: d.s }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0, d.s > 2.5 ? 0.6 : 0.4, 0], scale: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: d.dur,
            delay: d.d,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 1]
          }}
        />
      ))}
      {/* Small cluster dots */}
      {[
        { x: '20%', y: '25%' }, { x: '22%', y: '23%' }, { x: '24%', y: '26%' },
        { x: '78%', y: '70%' }, { x: '80%', y: '72%' }, { x: '76%', y: '74%' },
      ].map((d, i) => (
        <Motion.div
          key={`c-${i}`}
          className="absolute rounded-full bg-primary-fixed-dim"
          style={{ left: d.x, top: d.y, width: 1.2, height: 1.2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.3, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const statItems = [
  { value: '2005', label: 'Fundación en Paraná', icon: 'calendar_month' },
  { value: '2014', label: '1er edificio Steel Frame de la región', icon: 'apartment' },
  { value: '+20', label: 'Años de trayectoria', icon: 'auto_graph' }
]

export default function FirstSteelFrame() {
  return (
    <section className="relative bg-[#0e1a12] overflow-hidden py-8 lg:py-10">
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px'
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '26rem', height: '26rem',
            left: '-8%', top: '10%',
            background: 'radial-gradient(circle, rgba(184,203,188,0.10) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '22rem', height: '22rem',
            right: '-5%', bottom: '5%',
            background: 'radial-gradient(circle, rgba(212,231,216,0.07) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-fixed-dim/15 to-transparent" />

      <Particles />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <Motion.span
          className="font-headline font-black text-[clamp(8rem,25vw,20rem)] leading-none"
          style={{
            color: 'rgba(184,203,188,0.035)',
            transform: 'translateX(15%)',
            letterSpacing: '-0.06em'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          2014
        </Motion.span>
      </div>

      {/* Corner decorative bracket - top right */}
      <div className="absolute top-3 right-3 pointer-events-none z-20">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary-fixed-dim/15">
          <path d="M20 0H0V4H16V20H20V0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 pointer-events-none z-20 rotate-180">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary-fixed-dim/15">
          <path d="M20 0H0V4H16V20H20V0Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-center">

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-px bg-gradient-to-r from-primary-fixed-dim/60 to-transparent" />
              <span className="text-primary-fixed-dim/60 text-[0.55rem] font-bold tracking-[0.25em] uppercase">
                2005 &bull; Pioneros en Paraná
              </span>
            </Motion.div>

            <div className="relative">
              <AnimatedText
                text="Fuimos los primeros en levantar un edificio con Steel Frame en la región"
                className="font-headline text-2xl sm:text-3xl lg:text-[2.4rem] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-5"
                highlightWords={['primeros', 'Steel', 'Frame']}
              />
              {/* Subtle underline accent */}
              <Motion.div
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary-fixed-dim/20 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <Motion.p
              className="text-white/40 text-sm lg:text-[0.95rem] leading-relaxed max-w-md mb-6 font-light"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              En 2014 marcamos un hito: construimos el primer edificio de la
              región realizado íntegramente en Steel Frame, en Paraná. Desde
              entonces, lideramos la innovación en construcción en altura con
              acero galvanizado.
            </Motion.p>

            <Motion.div
              className="flex flex-wrap gap-x-5 gap-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {statItems.map((stat, i) => (
                <Motion.div
                  key={stat.label}
                  className="group cursor-default"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1, y: 0,
                      transition: { duration: 0.5, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed/10 border border-primary-fixed-dim/15 flex items-center justify-center group-hover:bg-primary-fixed/20 group-hover:border-primary-fixed-dim/30 group-hover:shadow-[0_0_12px_rgba(184,203,188,0.1)] transition-all duration-500">
                      <span className="material-symbols-outlined text-primary-fixed-dim text-lg">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-black font-headline text-primary-fixed tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[0.5rem] text-white/25 tracking-[0.18em] uppercase font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative corner brackets around the blueprint */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-primary-fixed-dim/20 rounded-tl pointer-events-none z-20" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-primary-fixed-dim/20 rounded-tr pointer-events-none z-20" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-primary-fixed-dim/20 rounded-bl pointer-events-none z-20" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-primary-fixed-dim/20 rounded-br pointer-events-none z-20" />
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary-fixed-dim/5 pointer-events-none z-20" />

            <div className="absolute -inset-4 bg-gradient-to-t from-[#0e1a12] via-transparent to-transparent pointer-events-none z-10" />
            <BuildingBlueprint />
          </Motion.div>

        </div>
      </div>
    </section>
  )
}
