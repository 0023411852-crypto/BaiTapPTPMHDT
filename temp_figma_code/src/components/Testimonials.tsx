import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'Mia Svensson',
    role: 'CTO',
    company: 'Helion Systems',
    avatar: 'MS',
    avatarColor: '#3b82f6',
    quote: "We migrated 140 microservices to NovaCloud in three weeks. The latency dropped by 40% and our infra bills dropped by 30%. The SRE team is exceptional — they caught a BGP routing issue before we even noticed it.",
    rating: 5,
    metric: '40% latency reduction',
  },
  {
    name: 'Tomáš Novák',
    role: 'Head of Infrastructure',
    company: 'Kraken Analytics',
    avatar: 'TN',
    avatarColor: '#6366f1',
    quote: "The Kubernetes engine saved my team weeks of ops work. Auto-healing nodes, one-click upgrades, and the Prometheus integration is native. We went from 3 engineers managing k8s to one — and they have time to build features now.",
    rating: 5,
    metric: '66% ops headcount freed',
  },
  {
    name: 'Priya Krishnamurthy',
    role: 'VP Engineering',
    company: 'Verdant Finance',
    avatar: 'PK',
    avatarColor: '#10b981',
    quote: "Compliance was our biggest blocker. NovaCloud's enterprise tier gives us SOC 2 Type II reports on demand, GDPR data residency controls, and audit logs that actually make sense. Zero compliance incidents in 18 months.",
    rating: 5,
    metric: '18 months zero compliance incidents',
  },
  {
    name: 'Arjun Patel',
    role: 'Lead DevOps',
    company: 'Volta Games',
    avatar: 'AP',
    avatarColor: '#f59e0b',
    quote: "We run live multiplayer servers for 2M daily players. NovaCloud's DDoS scrubbing handled a 400 Gbps volumetric attack without a single player noticing. We've been with three other providers. None come close.",
    rating: 5,
    metric: '400 Gbps attack absorbed invisibly',
  },
  {
    name: 'Léa Fontaine',
    role: 'Founder & CEO',
    company: 'Luminary AI',
    avatar: 'LF',
    avatarColor: '#22d3ee',
    quote: "GPU compute for AI inference at a price that doesn't make me cry. The bare-metal A100 cluster we rent costs 45% less than the equivalent on the other major clouds, and our cold-start times went from 8 seconds to under 900ms.",
    rating: 5,
    metric: '45% cost reduction vs. hyperscalers',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goTo = (i: number) => {
    setActiveIndex(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
    startInterval()
  }

  const active = testimonials[activeIndex]

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5">
            SOCIAL PROOF
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by teams that<br />
            <span className="gradient-text">can't afford downtime</span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div
          className="relative rounded-3xl p-8 md:p-12 mb-8 transition-all duration-500"
          style={{
            background: 'rgba(10,22,40,0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${active.avatarColor}30`,
            boxShadow: `0 0 60px ${active.avatarColor}10, 0 20px 60px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Quote icon */}
          <div className="mb-6 opacity-30" style={{ color: active.avatarColor }}>
            <svg width="48" height="36" viewBox="0 0 48 36" fill="currentColor">
              <path d="M0 36V22.8C0 10.2 7.2 2.4 21.6 0l2.4 4.8C16.8 6.4 13.2 10 12 16h10.8V36H0Zm25.2 0V22.8C25.2 10.2 32.4 2.4 46.8 0l1.2 4.8C41 6.4 37.4 10 36 16h10.8V36H25.2Z"/>
            </svg>
          </div>

          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light mb-8">
            "{active.quote}"
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: `${active.avatarColor}30`, border: `2px solid ${active.avatarColor}50` }}
              >
                {active.avatar}
              </div>
              <div>
                <div className="font-semibold text-white">{active.name}</div>
                <div className="text-sm text-slate-500">{active.role} · {active.company}</div>
              </div>
            </div>

            {/* Metric badge */}
            <div
              className="px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: `${active.avatarColor}15`, color: active.avatarColor, border: `1px solid ${active.avatarColor}30` }}
            >
              {active.metric}
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 flex gap-1">
            {Array.from({ length: active.rating }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                background: i === activeIndex ? active.avatarColor : 'rgba(99,179,255,0.2)',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mini cards row */}
        <div className="hidden md:grid grid-cols-5 gap-3 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-xl p-3 text-left transition-all duration-200"
              style={{
                background: i === activeIndex ? `${t.avatarColor}10` : 'rgba(10,22,40,0.4)',
                border: `1px solid ${i === activeIndex ? t.avatarColor + '40' : 'rgba(99,179,255,0.08)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: `${t.avatarColor}30` }}>
                  {t.avatar[0]}
                </div>
                <span className="text-xs font-medium text-slate-300 truncate">{t.name}</span>
              </div>
              <div className="text-xs text-slate-600 truncate">{t.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
