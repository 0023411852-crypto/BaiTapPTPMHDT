'use client';

import { useState } from 'react'
import Link from 'next/link'

type Billing = 'monthly' | 'annual'

const plans = [
  {
    name: 'Starter',
    tag: null,
    monthlyPrice: 29,
    annualPrice: 23,
    desc: 'Dành cho nhà phát triển độc lập và các dự án nhỏ mới bắt đầu.',
    setupFee: 0,
    color: '#64748b',
    specs: [
      '2 vCPU',
      '4 GB RAM',
      '80 GB NVMe Storage',
      '3 TB Bandwidth',
    ],
    features: [
      '1 IPv4 + /64 IPv6',
      'Community support',
      '99.9% uptime SLA',
    ],
    cta: 'Bắt đầu ngay',
    highlight: false,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NovaCloud-Starter&color=1e293b&bgcolor=e2e8f0'
  },
  {
    name: 'Pro',
    tag: 'Phổ biến nhất',
    monthlyPrice: 89,
    annualPrice: 71,
    setupFee: 10,
    desc: 'Dành cho các startup đang phát triển và đội ngũ kỹ thuật cần mở rộng quy mô.',
    color: '#3b82f6',
    specs: [
      '8 vCPU',
      '16 GB RAM',
      '320 GB NVMe Storage',
      '10 TB Bandwidth',
    ],
    features: [
      '2 IPv4 + /48 IPv6',
      'Priority support (4h)',
      '99.95% uptime SLA',
      'Daily snapshots',
    ],
    cta: 'Mua Ngay',
    highlight: true,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NovaCloud-Pro&color=1e40af&bgcolor=bfdbfe'
  },
  {
    name: 'Enterprise',
    tag: null,
    monthlyPrice: 299,
    annualPrice: 239,
    setupFee: 50,
    desc: 'Dành cho các nền tảng quy mô lớn cần tài nguyên chuyên dụng và SLA.',
    color: '#6366f1',
    specs: [
      '32 vCPU',
      '64 GB RAM',
      '2 TB NVMe RAID Storage',
      'Unmetered Bandwidth',
    ],
    features: [
      '5 IPv4 + /32 IPv6',
      'Dedicated SRE (1h SLA)',
      '99.99% uptime SLA',
      'Custom private network',
    ],
    cta: 'Liên hệ kinh doanh',
    highlight: false,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NovaCloud-Enterprise&color=3730a3&bgcolor=c7d2fe'
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <section id="pricing" className="relative py-28 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 border border-indigo-400/20 bg-indigo-400/5">
            BẢNG GIÁ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Đơn giản, minh bạch<br />
            <span className="gradient-text">bảng giá</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Không có phí ẩn. Không có hóa đơn bất ngờ. Tăng giảm quy mô bất cứ lúc nào.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex relative items-center glass rounded-xl p-1">
            {/* Sliding background */}
            <div
              className="absolute top-1 bottom-1 w-[144px] rounded-lg transition-transform duration-300 ease-out z-0"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                boxShadow: '0 0 15px rgba(99,102,241,0.4)',
                transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
              }}
            />
            {(['monthly', 'annual'] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="w-[144px] py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 relative z-10 flex items-center justify-center gap-1.5"
                style={{
                  color: billing === b ? 'white' : '#94a3b8',
                }}
              >
                {b === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                {b === 'annual' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-mono border border-green-500/30">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-7 transition-all duration-300 flex flex-col h-full"
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 100%)'
                  : 'rgba(10,22,40,0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${plan.highlight ? 'rgba(59,130,246,0.4)' : 'rgba(99,179,255,0.1)'}`,
                boxShadow: plan.highlight ? '0 0 40px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.4)' : 'none',
                transform: hoveredPlan === plan.name ? 'scale(1.03)' : 'scale(1)',
                zIndex: hoveredPlan === plan.name ? 20 : 10,
              }}
            >
              {/* Popular badge */}
              {plan.tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-semibold text-white btn-glow">
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-slate-500 mb-1.5 text-sm">/tháng</span>
                </div>
                {billing === 'annual' && (
                  <div className="text-xs text-green-400 font-mono mt-0.5 mb-1.5">
                    Thanh toán ${plan.annualPrice * 12}/năm — tiết kiệm ${(plan.monthlyPrice - plan.annualPrice) * 12}/năm
                  </div>
                )}
                {plan.setupFee > 0 ? (
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    + Phí khởi tạo: ${plan.setupFee} (Một lần)
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    Miễn phí khởi tạo
                  </div>
                )}
              </div>

              {/* Specs */}
              <div className="mb-4 bg-slate-900/40 rounded-xl p-4 border border-slate-700/50">
                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Cấu hình</div>
                <ul className="space-y-2">
                  {plan.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-white font-medium">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: plan.color }} />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="mb-6 flex-1">
                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Tiện ích kèm theo</div>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" style={{ color: plan.color }}>
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
                        <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* QR Code integration */}
              <div className="mb-6 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-700/50 bg-[#050c1a]">
                <span className="text-xs text-slate-500 mb-2">Quét mã QR để đặt qua Mobile</span>
                <div className="p-1.5 bg-white rounded-lg">
                  <img src={plan.qrCode} alt={`QR Code ${plan.name}`} className="w-20 h-20" />
                </div>
              </div>

              <Link
                href="/order"
                className="block text-center w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={
                  plan.highlight
                    ? { background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: 'white', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(99,179,255,0.15)' }
                }
                onMouseEnter={e => {
                  if (!plan.highlight) {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'
                  }
                }}
                onMouseLeave={e => {
                  if (!plan.highlight) {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-slate-600 mt-8 font-mono">
          Tất cả các gói đều bao gồm chống DDoS, giám sát hạ tầng 24/7 và hoàn tiền trong vòng 14 ngày.
        </p>
      </div>
    </section>
  )
}
