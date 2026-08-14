import { useState } from 'react'

type Billing = 'monthly' | 'annual'

const plans = [
  {
    name: 'Starter',
    tag: null,
    monthlyPrice: 29,
    annualPrice: 23,
    desc: 'For indie developers and small projects getting off the ground.',
    color: '#64748b',
    features: [
      '2 vCPU / 4 GB RAM',
      '80 GB NVMe SSD',
      '3 TB bandwidth',
      '1 IPv4 + /64 IPv6',
      'Community support',
      '99.9% uptime SLA',
      'Basic DDoS protection',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    tag: 'Most Popular',
    monthlyPrice: 89,
    annualPrice: 71,
    desc: 'For growing startups and engineering teams needing reliable scale.',
    color: '#3b82f6',
    features: [
      '8 vCPU / 16 GB RAM',
      '320 GB NVMe SSD',
      '10 TB bandwidth',
      '2 IPv4 + /48 IPv6',
      'Priority support (4h)',
      '99.95% uptime SLA',
      'Advanced DDoS + WAF',
      'Private VLAN',
      'Daily snapshots',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    tag: null,
    monthlyPrice: 299,
    annualPrice: 239,
    desc: 'For large-scale platforms requiring dedicated resources and SLAs.',
    color: '#6366f1',
    features: [
      '32 vCPU / 64 GB RAM',
      '2 TB NVMe RAID',
      'Unmetered bandwidth',
      '5 IPv4 + /32 IPv6',
      'Dedicated SRE (1h SLA)',
      '99.99% uptime SLA',
      'Enterprise DDoS scrubbing',
      'Custom private network',
      'Compliance reporting',
      'Multi-region failover',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')

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
            PRICING
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, transparent<br />
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            No hidden fees. No surprise bills. Scale up or down at any time.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center glass rounded-xl p-1 gap-1">
            {(['monthly', 'annual'] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  background: billing === b ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'transparent',
                  color: billing === b ? 'white' : '#94a3b8',
                  boxShadow: billing === b ? '0 0 15px rgba(99,102,241,0.4)' : 'none',
                }}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual'}
                {b === 'annual' && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-mono">-20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-7 transition-all duration-300 flex flex-col"
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 100%)'
                  : 'rgba(10,22,40,0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${plan.highlight ? 'rgba(59,130,246,0.4)' : 'rgba(99,179,255,0.1)'}`,
                boxShadow: plan.highlight ? '0 0 40px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.4)' : 'none',
                transform: plan.highlight ? 'scale(1.03)' : 'scale(1)',
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

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-slate-500 mb-1.5 text-sm">/mo</span>
                </div>
                {billing === 'annual' && (
                  <div className="text-xs text-green-400 font-mono mt-0.5">
                    Billed ${plan.annualPrice * 12}/yr — save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
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

              <button
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
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
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-slate-600 mt-8 font-mono">
          All plans include DDoS protection, 24/7 infrastructure monitoring, and a 14-day money-back guarantee.
        </p>
      </div>
    </section>
  )
}
