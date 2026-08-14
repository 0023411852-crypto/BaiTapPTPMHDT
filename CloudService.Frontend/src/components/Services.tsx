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
    title: 'Web Hosting',
    subtitle: 'Shared & Dedicated Hosting',
    desc: 'Lưu trữ website tốc độ cao với bảng điều khiển cPanel/DirectAdmin, tối ưu riêng cho WordPress và ứng dụng PHP.',
    features: ['SSD NVMe siêu tốc', 'Backup tự động mỗi ngày', 'Hỗ trợ SSL miễn phí'],
    color: '#22d3ee',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 12h12M8 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Đăng ký Tên Miền',
    subtitle: 'Domain Registration',
    desc: 'Tìm kiếm và đăng ký tên miền quốc tế (.com, .net) và tên miền quốc gia (.vn) với hệ thống quản lý DNS siêu tốc.',
    features: ['Hàng trăm đuôi mở rộng', 'Quản lý bản ghi DNS thông minh', 'Bảo mật Whois ẩn danh'],
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 8l10 6 10-6M4 8v12a2 2 0 002 2h16a2 2 0 002-2V8M4 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Email Doanh Nghiệp',
    subtitle: 'Business Email',
    desc: 'Hệ thống email theo tên miền riêng chuyên nghiệp, tăng độ uy tín với khách hàng, tích hợp lọc thư rác AI.',
    features: ['Giao diện Webmail hiện đại', 'Chống Spam & Virus 99.9%', 'Đồng bộ Outlook, Gmail'],
    color: '#ec4899',
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
        <path d="M4 14C4 8.477 8.477 4 14 4s10 4.477 10 10-4.477 10-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 20l3-3m0 0l3 3m-3-3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Bảo mật & Chứng nhận',
    subtitle: 'Security & Compliance',
    desc: 'Giải pháp an ninh đám mây toàn diện, bảo vệ khỏi các cuộc tấn công DDoS và tuân thủ các chuẩn bảo mật quốc tế.',
    features: ['Bảo vệ chống DDoS 20 Tbps', 'Tường lửa ứng dụng web (WAF)', 'Chứng chỉ SSL Sectigo/DigiCert'],
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
            HẠ TẦNG VÀ DỊCH VỤ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tất cả những gì hệ thống của bạn cần,<br />
            <span className="gradient-text">tại cùng một nơi</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Từ máy chủ ảo VPS, Hosting, Tên miền đến hệ thống bảo mật SSL chống DDoS — NovaCloud cung cấp trọn gói giải pháp doanh nghiệp.
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
