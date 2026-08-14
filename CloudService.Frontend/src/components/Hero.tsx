import { useState, useEffect, useRef } from 'react'

const stats = [
  { value: '99.99%', label: 'Thời gian HĐ (SLA)' },
  { value: '180+', label: 'Cụm máy chủ toàn cầu' },
  { value: '2.4M', label: 'Máy chủ quản lý' },
  { value: '<1ms', label: 'Độ trễ trung bình' },
]

// Floating particle data (static so it doesn't re-randomize)
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 11) % 100,
  y: (i * 53.7 + 7) % 100,
  size: 1 + (i % 3) * 0.7,
  dur: 6 + (i % 5) * 1.8,
  delay: -(i * 0.7),
  opacity: 0.12 + (i % 4) * 0.07,
}))

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 })
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger fade-in-up on mount
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const blobX = mousePos.x * 0.3 + 20
  const blobY = mousePos.y * 0.25 + 10

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden"
      style={{ background: '#050c1a' }}
    >
      {/* ── Background layer ────────────────────────────── */}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(59,130,246,0.18) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Parallax gradient blobs */}
      <div
        className="absolute pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${blobX - 25}%`,
          top: `${blobY - 20}%`,
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.22) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none transition-all duration-[1400ms] ease-out"
        style={{
          left: `${100 - blobX * 0.5}%`,
          top: `${blobY * 0.6 + 20}%`,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '65%',
          width: '400px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size * 2}px`,
              height: `${p.size * 2}px`,
              background: p.id % 3 === 0 ? '#22d3ee' : p.id % 3 === 1 ? '#3b82f6' : '#6366f1',
              opacity: p.opacity,
              animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── 3D Cloud Server SVG illustration ──────────── */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{ right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '460px', opacity: 0.75 }}
      >
        <CloudServerScene />
      </div>
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{ left: '-30px', bottom: '18%', width: '240px', opacity: 0.45 }}
      >
        <MiniNodeCard />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge — fade-in-up delay 0 */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass text-xs font-mono text-cyan-400 border border-cyan-400/20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: '0ms',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Hạ tầng Đám mây Doanh nghiệp · Tự động mở rộng bằng AI
        </div>

        {/* Headline — fade-in-up delay 120ms */}
        <h1
          className="text-5xl md:text-[68px] font-bold leading-[1.05] tracking-tight mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '120ms',
          }}
        >
          <span className="text-white">Triển khai</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(120deg, #60a5fa 0%, #22d3ee 40%, #818cf8 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            hạ tầng
          </span>
          <br />
          <span className="text-white">chỉ trong vài giây.</span>
        </h1>

        {/* Subline — fade-in-up delay 240ms */}
        <p
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '240ms',
          }}
        >
          NovaCloud mang lại hiệu năng tối đa, phân phối toàn cầu và Kubernetes chỉ với một cú nhấp chuột — tất cả được quản lý từ một bảng điều khiển duy nhất.
        </p>

        {/* CTAs — fade-in-up delay 360ms */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '360ms',
          }}
        >
          {/* Primary CTA */}
          <a
            href="#pricing"
            className="btn-glow px-8 py-3.5 text-base font-semibold text-white rounded-xl inline-flex items-center justify-center gap-2 group"
          >
            Xem Bảng Giá
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Ghost CTA */}
          <a
            href="#"
            className="px-8 py-3.5 text-base font-medium text-slate-300 hover:text-white rounded-xl border border-white/12 hover:border-white/28 hover:bg-white/5 transition-all duration-200 inline-flex items-center justify-center gap-2 group"
          >
            <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" viewBox="0 0 16 16">
              <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M5 7H8M5 9.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Đọc Tài liệu
          </a>
        </div>

        {/* Stats — fade-in-up delay 500ms */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '500ms',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 group hover:border-blue-500/30 transition-all duration-300"
              style={{ cursor: 'default' }}
            >
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050c1a)' }}
      />
    </section>
  )
}

/* ── 3D Cloud Server Illustration ─────────────────────── */
function CloudServerScene() {
  return (
    <svg viewBox="0 0 460 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float w-full">
      <defs>
        <linearGradient id="faceTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f2040" />
        </linearGradient>
        <linearGradient id="faceRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#060f1e" />
        </linearGradient>
        <linearGradient id="faceFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#112238" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="edgeGlowV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Main server box (isometric) ── */}
      {/* Top face */}
      <polygon points="130,140 300,80 430,160 260,220" fill="url(#faceTop)" />
      <polygon points="130,140 300,80 430,160 260,220" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />

      {/* Front face */}
      <polygon points="130,140 130,310 260,390 260,220" fill="url(#faceFront)" />
      <polygon points="130,140 130,310 260,390 260,220" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

      {/* Right face */}
      <polygon points="260,220 260,390 430,310 430,160" fill="url(#faceRight)" />
      <polygon points="260,220 260,390 430,310 430,160" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />

      {/* Edge glows */}
      <line x1="130" y1="140" x2="430" y2="160" stroke="url(#edgeGlow)" strokeWidth="1.5" />
      <line x1="130" y1="140" x2="130" y2="310" stroke="url(#edgeGlowV)" strokeWidth="1" />
      <line x1="260" y1="220" x2="260" y2="390" stroke="url(#edgeGlowV)" strokeWidth="1" />

      {/* ── Server rack slots on front face ── */}
      {[0, 1, 2, 3, 4].map((i) => {
        const baseY = 185 + i * 32
        const slant = i * 3.5
        return (
          <g key={i}>
            <polygon
              points={`${142 + slant},${baseY} ${248 + slant},${baseY + 15} ${248 + slant},${baseY + 25} ${142 + slant},${baseY + 10}`}
              fill="rgba(59,130,246,0.06)"
              stroke="rgba(59,130,246,0.2)"
              strokeWidth="0.6"
            />
            {/* LED indicator */}
            <circle
              cx={152 + slant}
              cy={baseY + 7}
              r="2.5"
              fill={i === 1 ? '#f59e0b' : i === 3 ? '#ef4444' : '#22d3ee'}
              filter="url(#glow)"
              opacity="0.9"
            />
            {/* Slot lines */}
            <line x1={162 + slant} y1={baseY + 5} x2={238 + slant} y2={baseY + 18} stroke="rgba(99,179,255,0.12)" strokeWidth="0.5" />
            <line x1={162 + slant} y1={baseY + 8} x2={220 + slant} y2={baseY + 19} stroke="rgba(99,179,255,0.08)" strokeWidth="0.5" />
          </g>
        )
      })}

      {/* ── Second server box (smaller, behind) ── */}
      <polygon points="60,200 200,150 300,210 160,260" fill="rgba(15,32,64,0.6)" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.35" />
      <polygon points="60,200 60,320 160,380 160,260" fill="rgba(8,18,40,0.6)" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.25" />
      <polygon points="160,260 160,380 300,320 300,210" fill="rgba(5,12,28,0.5)" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.2" />

      {[0, 1, 2].map((i) => {
        const by = 225 + i * 28
        const sl = i * 2.5
        return (
          <g key={i} opacity="0.7">
            <polygon
              points={`${72 + sl},${by} ${150 + sl},${by + 12} ${150 + sl},${by + 20} ${72 + sl},${by + 8}`}
              fill="rgba(99,102,241,0.07)"
              stroke="rgba(99,102,241,0.2)"
              strokeWidth="0.5"
            />
            <circle cx={82 + sl} cy={by + 6} r="2" fill="#22d3ee" filter="url(#glow)" opacity="0.7" />
          </g>
        )
      })}

      {/* ── Floating data orbs ── */}
      {/* Large orb top right */}
      <circle cx="380" cy="90" r="32" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.3" />
      <circle cx="380" cy="90" r="22" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.5" />
      <circle cx="380" cy="90" r="8" fill="rgba(59,130,246,0.4)" filter="url(#glowStrong)" />
      {/* Orbit ring */}
      <ellipse cx="380" cy="90" rx="38" ry="12" fill="none" stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="4 3" />

      {/* Medium orb left */}
      <circle cx="80" cy="150" r="20" fill="none" stroke="#6366f1" strokeWidth="0.7" strokeOpacity="0.3" />
      <circle cx="80" cy="150" r="12" fill="rgba(99,102,241,0.1)" />
      <circle cx="80" cy="150" r="5" fill="rgba(99,102,241,0.6)" filter="url(#glow)" />

      {/* Small orb bottom */}
      <circle cx="320" cy="420" r="14" fill="none" stroke="#22d3ee" strokeWidth="0.7" strokeOpacity="0.3" />
      <circle cx="320" cy="420" r="5" fill="rgba(34,211,238,0.5)" filter="url(#glow)" />

      {/* ── Connection lines between orbs and server ── */}
      <line x1="352" y1="110" x2="300" y2="140" stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="5 4" />
      <line x1="95" y1="160" x2="130" y2="185" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="5 4" />
      <line x1="306" y1="410" x2="280" y2="370" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 4" />

      {/* ── Upload / download arrow indicators ── */}
      <g opacity="0.5" filter="url(#glow)">
        <line x1="420" y1="240" x2="420" y2="285" stroke="#22d3ee" strokeWidth="1.2" />
        <polyline points="415,248 420,240 425,248" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <g opacity="0.4" filter="url(#glow)">
        <line x1="410" y1="270" x2="410" y2="315" stroke="#3b82f6" strokeWidth="1.2" />
        <polyline points="405,308 410,315 415,308" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── Ground shadow ── */}
      <ellipse cx="290" cy="440" rx="170" ry="24" fill="rgba(59,130,246,0.06)" />
    </svg>
  )
}

/* ── Mini floating node card ─────────────────────────── */
function MiniNodeCard() {
  return (
    <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'float 8s ease-in-out -3s infinite' }}>
      <rect x="1" y="1" width="238" height="118" rx="14" fill="rgba(10,22,40,0.75)"
        stroke="rgba(99,179,255,0.18)" strokeWidth="1" />
      {/* Backdrop blur shimmer */}
      <rect x="1" y="1" width="238" height="118" rx="14" fill="url(#shimmerGrad)" opacity="0.04" />
      <defs>
        <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Header */}
      <circle cx="22" cy="22" r="7" fill="rgba(59,130,246,0.2)" />
      <circle cx="22" cy="22" r="3.5" fill="#3b82f6" />
      <rect x="36" y="17" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
      <rect x="36" y="25" width="40" height="3.5" rx="1.75" fill="rgba(255,255,255,0.07)" />

      {/* Status badge */}
      <rect x="170" y="14" width="54" height="17" rx="8" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
      <circle cx="180" cy="22.5" r="2.5" fill="#10b981" />
      <rect x="186" y="19.5" width="28" height="6" rx="3" fill="rgba(16,185,129,0.5)" />

      {/* Metrics row */}
      {[
        { x: 14, label: 'CPU', val: '18%', w: 32, color: '#3b82f6' },
        { x: 80, label: 'RAM', val: '6.2G', w: 52, color: '#6366f1' },
        { x: 150, label: 'NET', val: '↑2.1', w: 24, color: '#22d3ee' },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y="52" width="64" height="38" rx="7" fill="rgba(99,179,255,0.04)" stroke="rgba(99,179,255,0.1)" strokeWidth="0.7" />
          <rect x={m.x + 6} y="57" width="20" height="3.5" rx="1.75" fill="rgba(255,255,255,0.1)" />
          <rect x={m.x + 6} y="68" width={m.w} height="4.5" rx="2.25" fill={m.color} opacity="0.7" />
          <rect x={m.x + 6} y="76" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
        </g>
      ))}

      {/* Bottom region bar */}
      <rect x="14" y="100" width="212" height="4" rx="2" fill="rgba(99,179,255,0.06)" />
      <rect x="14" y="100" width="96" height="4" rx="2" fill="rgba(59,130,246,0.4)" />
    </svg>
  )
}
