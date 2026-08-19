'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API_BASE_URL } from '@/utils/api'

type Billing = 'monthly' | 'annual'

// Mock data removed due to backend integration requirements
// Mảng plans tĩnh đã bị xóa để ép Frontend lấy dữ liệu thực tế từ API.

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [apiPlans, setApiPlans] = useState<any[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ServicePlans?PageNumber=1&PageSize=10`, {
          signal: AbortSignal.timeout(5000)
        });
        const data = await res.json();
        if (res.ok && data.data) {
          const mappedPlans = data.data.map((p: any, index: number) => {
            const monthlyPriceObj = p.prices?.find((pr: any) => pr.billingCycle === 1);
            const annualPriceObj = p.prices?.find((pr: any) => pr.billingCycle === 12);

            // Parse specifications as JSON (backend stores as JSON format)
            let specsList: string[] = [];
            try {
              const specsObj = p.specifications ? JSON.parse(p.specifications) : {};
              specsList = Object.entries(specsObj).map(([key, value]) => `${key}: ${value}`);
            } catch {
              specsList = ['Thông số mặc định'];
            }

            return {
              name: p.name,
              desc: p.description || 'Gói dịch vụ mặc định',
              specs: specsList,
              qrCode: p.qrCodeBase64 || null,
              id: p.id,
              
              monthlyPriceId: monthlyPriceObj?.id || null,
              annualPriceId: annualPriceObj?.id || null,
              
              monthlyPrice: monthlyPriceObj?.price || 0,
              annualPrice: annualPriceObj?.price || 0,
              setupFee: monthlyPriceObj?.setupFee || annualPriceObj?.setupFee || 0,
              
              highlight: index === 1,
              tag: index === 1 ? 'Phổ biến' : null,
              color: index === 1 ? '#3b82f6' : '#64748b',
              cta: 'Mua Ngay'
            };
          });
          setApiPlans(mappedPlans);
        }
      } catch(e) {
        console.error('Lỗi khi fetch gói cước:', e);
      }
    };
    fetchPlans();
  }, []);

  const displayPlans = apiPlans;

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
          <h2 className="text-4xl md:text-5xl font-bold text-primary-container mb-4">
            Đơn giản, minh bạch<br />
            <span className="gradient-text">bảng giá</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-8">
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
          {displayPlans.map((plan) => (
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
                <h3 className="text-lg font-bold text-primary-container mb-1">{plan.name}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed min-h-[40px]">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-primary-container">
                    ${billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-on-surface-variant mb-1.5 text-sm">/tháng</span>
                </div>
                {plan.monthlyPrice === 0 && plan.annualPrice === 0 && (
                  <div className="text-xs text-red-400 font-mono mt-0.5 mb-1.5 bg-red-400/10 p-2 rounded">
                    ⚠️ API chưa cấp giá thật
                  </div>
                )}
                {billing === 'annual' && plan.annualPrice > 0 && (
                  <div className="text-xs text-green-400 font-mono mt-0.5 mb-1.5">
                    Thanh toán ${plan.annualPrice * 12}/năm — tiết kiệm ${(plan.monthlyPrice - plan.annualPrice) * 12}/năm
                  </div>
                )}
                {plan.setupFee > 0 ? (
                  <div className="text-xs text-on-surface-variant font-mono mt-1">
                    + Phí khởi tạo: ${plan.setupFee} (Một lần)
                  </div>
                ) : (
                  <div className="text-xs text-on-surface-variant font-mono mt-1">
                    Miễn phí khởi tạo
                  </div>
                )}
              </div>

              {/* Specs */}
              <div className="mb-4 bg-slate-900/40 rounded-xl p-4 border border-slate-700/50">
                <div className="text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">Cấu hình</div>
                <ul className="space-y-2">
                  {plan.specs.map((spec: string) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-primary-container font-medium">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: plan.color }} />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* QR Code */}
              {plan.qrCode && (
                <div className="mb-4 flex justify-center">
                  <img src={plan.qrCode} alt={`QR Code for ${plan.name}`} className="w-24 h-24 rounded-lg border border-slate-700/50" />
                </div>
              )}

              <Link
                href={`/checkout?planId=${plan.id || ''}&priceId=${(billing === 'monthly' ? plan.monthlyPriceId : plan.annualPriceId) || ''}&billing=${billing}`}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-center block"
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
        <p className="text-center text-sm text-on-surface-variant mt-8 font-mono">
          Tất cả các gói đều bao gồm chống DDoS, giám sát hạ tầng 24/7 và hoàn tiền trong vòng 14 ngày.
        </p>
      </div>
    </section>
  )
}
