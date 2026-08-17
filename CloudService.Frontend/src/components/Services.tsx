'use client';

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
    title: 'Điện toán đám mây',
    subtitle: 'Cloud Compute',
    desc: 'Cung cấp sức mạnh tính toán linh hoạt và hiệu suất cao. Bao gồm máy chủ ảo, máy chủ vật lý và tự động mở rộng.',
    features: ['Máy chủ ảo (VPS)', 'Máy chủ chuyên dụng (Bare-metal)', 'Tự động mở rộng (Auto-scaling)'],
    color: '#3b82f6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4c-2.5 3-4 6.3-4 10s1.5 7 4 10M14 4c2.5 3 4 6.3 4 10s-1.5 7-4 10M4 14h20" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Lưu trữ khối & Đối tượng',
    subtitle: 'Block & Object Storage',
    desc: 'Lưu trữ an toàn, mở rộng vô hạn với hiệu suất I/O vượt trội. Tương thích chuẩn API S3 và sao lưu tự động.',
    features: ['Lưu trữ khối (Block Storage)', 'Lưu trữ đối tượng (S3 API)', 'Sao lưu dữ liệu tự động'],
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
    title: 'Cơ sở dữ liệu quản lý',
    subtitle: 'Managed Databases',
    desc: 'Cơ sở dữ liệu đám mây hoàn toàn được quản lý, tối ưu hóa hiệu suất và tự động dự phòng.',
    features: ['PostgreSQL & MySQL', 'Redis Caching', 'Tự động sao lưu & Phục hồi'],
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
    title: 'Mạng & Phân phối',
    subtitle: 'Networking & CDN',
    desc: 'Mạng lưới tốc độ cao, độ trễ thấp toàn cầu. Cân bằng tải, mạng riêng ảo và mạng lưới phân phối nội dung.',
    features: ['CDN Toàn cầu (180+ PoP)', 'Cân bằng tải (Load Balancer)', 'Mạng riêng ảo (VPC)'],
    color: '#10b981',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 4V24M4 9L24 19M24 9L4 19" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
      </svg>
    ),
    title: 'Dịch vụ Kubernetes',
    subtitle: 'Kubernetes Engine',
    desc: 'Triển khai, quản lý và mở rộng các ứng dụng container hóa thông qua cụm K8s được quản lý hoàn toàn.',
    features: ['Cụm K8s sẵn sàng cho Production', 'Tự phục hồi Node', 'Tích hợp CI/CD mượt mà'],
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
    title: 'Bảo mật & Chứng nhận',
    subtitle: 'Security & Compliance',
    desc: 'Giải pháp an ninh đám mây toàn diện, bảo vệ khỏi các cuộc tấn công DDoS và tuân thủ các chuẩn bảo mật quốc tế.',
    features: ['Bảo vệ chống DDoS 20 Tbps', 'Tường lửa ứng dụng web (WAF)', 'Tuân thủ SOC2 & ISO 27001'],
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
            HẠ TẦNG
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-container mb-4">
            Tất cả những gì hệ thống của bạn cần,<br />
            <span className="gradient-text">tại cùng một nơi</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Từ máy chủ vật lý đến Kubernetes — NovaCloud cung cấp toàn bộ công nghệ hạ tầng cho các đội ngũ phát triển hiện đại.
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
                transform: hoveredIndex === i ? 'scale(1.02)' : 'scale(1)',
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
              <h3 className="text-lg font-bold text-primary-container mb-2">{service.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{service.desc}</p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-on-surface-variant">
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
