'use client';

import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'Mia Svensson',
    role: 'CTO',
    company: 'Helion Systems',
    avatar: 'MS',
    avatarColor: '#3b82f6',
    quote: "Chúng tôi đã chuyển 140 microservice sang NovaCloud trong 3 tuần. Độ trễ giảm 40% và chi phí hạ tầng giảm 30%. Đội ngũ SRE thực sự xuất sắc — họ đã phát hiện lỗi định tuyến BGP trước khi chúng tôi kịp nhận ra.",
    rating: 5,
    metric: 'Giảm 40% độ trễ',
  },
  {
    name: 'Tomáš Novák',
    role: 'Head of Infrastructure',
    company: 'Kraken Analytics',
    avatar: 'TN',
    avatarColor: '#6366f1',
    quote: "Dịch vụ Kubernetes đã tiết kiệm cho nhóm tôi hàng tuần làm việc. Tự động phục hồi node, nâng cấp chỉ với 1 click và tích hợp sẵn Prometheus. Chúng tôi giảm từ 3 kỹ sư vận hành k8s xuống còn 1 — để họ có thời gian xây dựng tính năng mới.",
    rating: 5,
    metric: 'Giảm 66% nhân sự vận hành',
  },
  {
    name: 'Priya Krishnamurthy',
    role: 'VP Engineering',
    company: 'Verdant Finance',
    avatar: 'PK',
    avatarColor: '#10b981',
    quote: "Tuân thủ là rào cản lớn nhất của chúng tôi. Gói Enterprise của NovaCloud cung cấp báo cáo SOC 2 Type II ngay khi cần, kiểm soát lưu trữ dữ liệu GDPR và nhật ký kiểm toán vô cùng dễ hiểu. 18 tháng không có sự cố vi phạm nào.",
    rating: 5,
    metric: '18 tháng không sự cố vi phạm',
  },
  {
    name: 'Arjun Patel',
    role: 'Lead DevOps',
    company: 'Volta Games',
    avatar: 'AP',
    avatarColor: '#f59e0b',
    quote: "Chúng tôi chạy máy chủ cho 2 triệu người chơi mỗi ngày. Hệ thống chống DDoS của NovaCloud đã xử lý cuộc tấn công 400 Gbps mà không người chơi nào nhận ra. Chúng tôi từng dùng 3 nhà cung cấp khác. Không ai sánh kịp.",
    rating: 5,
    metric: 'Hấp thụ tấn công 400 Gbps một cách vô hình',
  },
  {
    name: 'Léa Fontaine',
    role: 'Founder & CEO',
    company: 'Luminary AI',
    avatar: 'LF',
    avatarColor: '#22d3ee',
    quote: "Tính toán GPU cho AI inference với mức giá không tưởng. Cụm máy chủ A100 vật lý chúng tôi thuê có giá thấp hơn 45% so với các đối thủ đám mây khác, và thời gian khởi động lạnh giảm từ 8 giây xuống dưới 900ms.",
    rating: 5,
    metric: 'Giảm 45% chi phí so với các đám mây lớn',
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
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-container mb-4">
            Được tin dùng bởi các đội ngũ<br />
            <span className="gradient-text">không chấp nhận gián đoạn</span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div
          className="relative rounded-3xl p-8 md:p-12 mb-8 transition-all duration-500"
          style={{
            background: 'var(--surface-container-low)',
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

          <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light mb-8">
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
                <div className="font-semibold text-primary-container">{active.name}</div>
                <div className="text-sm text-on-surface-variant">{active.role} · {active.company}</div>
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
                background: i === activeIndex ? `${t.avatarColor}20` : 'var(--surface-container-low)',
                border: `1px solid ${i === activeIndex ? t.avatarColor + '40' : 'rgba(99,179,255,0.08)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: `${t.avatarColor}30` }}>
                  {t.avatar[0]}
                </div>
                <span className="text-xs font-medium text-primary-container truncate">{t.name}</span>
              </div>
              <div className="text-xs text-on-surface-variant truncate">{t.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
