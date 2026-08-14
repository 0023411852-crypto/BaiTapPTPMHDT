import { useState } from 'react'

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12H12M8 16H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Dedicated Servers',
    subtitle: 'Bare-metal performance',
    desc: 'Single-tenant bare-metal servers with full hardware control. No noisy neighbors. Guaranteed CPU, RAM, and NVMe IOPS.',
    features: ['Up to 96-core AMD EPYC', 'DDR5 ECC RAM', 'NVMe RAID 0/1/10', '10 Gbps dedicated uplink'],
    color: '#3b82f6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4c-2.5 3-4 6.3-4 10s1.5 7 4 10M14 4c2.5 3 4 6.3 4 10s-1.5 7-4 10M4 14h20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Global CDN',
    subtitle: '180+ edge locations',
    desc: 'Lightning-fast static and dynamic content delivery with intelligent routing, real-time analytics, and edge compute.',
    features: ['180+ Points of Presence', 'Anycast DNS routing', 'HTTP/3 & QUIC support', 'Real-time traffic analytics'],
    color: '#22d3ee',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="10" width="20" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 10V8C9 5.791 10.791 4 13 4h2c2.209 0 4 1.791 4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="16" r="2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
    title: 'VPS Cloud',
    subtitle: 'Auto-scaling compute',
    desc: 'KVM-virtualized instances that scale vertically and horizontally in real time. Pay for what you use, nothing more.',
    features: ['1–96 vCPU on demand', 'Hourly billing', 'Snapshot & clone', 'Private VLAN networking'],
    color: '#6366f1',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 12V8C6 5.791 7.791 4 10 4h8c2.209 0 4 1.791 4 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="3" y="12" width="22" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="18" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="14" cy="18" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="19" cy="18" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: 'Object Storage',
    subtitle: 'S3-compatible at scale',
    desc: 'Infinitely scalable object storage with S3 API compatibility, multi-region replication, and built-in CDN acceleration.',
    features: ['S3-compatible API', 'Multi-region replication', '99.999999999% durability', 'Lifecycle management'],
    color: '#10b981',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 4V24M4 9L24 19M24 9L4 19" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
      </svg>
    ),
    title: 'Kubernetes Engine',
    subtitle: 'Managed K8s clusters',
    desc: 'Production-ready Kubernetes clusters with auto-healing nodes, managed upgrades, and deep observability integration.',
    features: ['1-click cluster deploy', 'Auto node healing', 'Helm chart marketplace', 'Prometheus + Grafana'],
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14C4 8.477 8.477 4 14 4s10 4.477 10 10-4.477 10-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 20l3-3m0 0l3 3m-3-3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'DDoS Protection',
    subtitle: '20 Tbps mitigation',
    desc: 'Always-on DDoS mitigation with 20 Tbps scrubbing capacity, volumetric attack filtering, and zero-second failover.',
    features: ['20 Tbps scrubbing', 'Layer 3/4/7 filtering', 'Always-on protection', 'Real-time attack reports'],
    color: '#ef4444',
  },
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-400/20 bg-blue-400/5">
            INFRASTRUCTURE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything your stack needs,<br />
            <span className="gradient-text">under one roof</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From bare-metal to Kubernetes — NovaCloud provides the full infrastructure stack for modern engineering teams.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300 group"
              style={{
                background: hoveredIndex === i
                  ? `linear-gradient(135deg, rgba(${hexToRgb(service.color)}, 0.08) 0%, rgba(10,22,40,0.9) 100%)`
                  : 'rgba(10,22,40,0.6)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${hoveredIndex === i ? service.color + '40' : 'rgba(99,179,255,0.1)'}`,
                boxShadow: hoveredIndex === i ? `0 0 30px ${service.color}20, 0 8px 30px rgba(0,0,0,0.3)` : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  color: service.color,
                  background: `${service.color}18`,
                  boxShadow: hoveredIndex === i ? `0 0 20px ${service.color}30` : 'none',
                }}
              >
                {service.icon}
              </div>

              <div className="text-xs font-mono text-slate-500 mb-1">{service.subtitle}</div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.desc}</p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: service.color }} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
                style={{ color: service.color }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
