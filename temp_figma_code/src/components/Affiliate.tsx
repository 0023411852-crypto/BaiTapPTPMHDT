const tiers = [
  {
    name: 'Ambassador',
    commission: '20%',
    threshold: '$0',
    color: '#64748b',
    perks: ['Dashboard access', 'Marketing kit', 'Monthly payouts', 'Email support'],
  },
  {
    name: 'Partner',
    commission: '30%',
    threshold: '$1,000 MRR',
    color: '#3b82f6',
    highlight: true,
    perks: ['Priority payouts', 'Co-branded landing pages', 'Dedicated partner manager', 'Joint webinars'],
  },
  {
    name: 'Elite',
    commission: '40%',
    threshold: '$10,000 MRR',
    color: '#f59e0b',
    perks: ['White-label options', 'Custom commission tiers', 'Revenue share on upsells', 'Executive introductions'],
  },
]

const steps = [
  { n: '01', title: 'Apply in 2 minutes', desc: 'Fill out a short form. No approval wait time for Ambassador tier.' },
  { n: '02', title: 'Share your link', desc: 'Get a unique referral link and access to our full marketing asset library.' },
  { n: '03', title: 'Earn recurring revenue', desc: 'Commission is paid on every billing cycle — not just the first month.' },
  { n: '04', title: 'Scale up your tier', desc: 'Hit MRR thresholds to unlock higher rates and partner perks automatically.' },
]

export default function Affiliate() {
  return (
    <section id="affiliate" className="relative py-28 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 border border-indigo-400/20 bg-indigo-400/5">
            AFFILIATE PROGRAM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Earn up to <span className="gradient-text-gold">40% recurring</span><br />
            commission — forever
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Refer customers and earn a percentage of everything they pay — every month, for as long as they stay.
            No caps. No expiry dates.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl p-6 group hover:border-indigo-500/30 transition-all duration-300"
              style={{
                background: 'rgba(10,22,40,0.6)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(99,179,255,0.1)',
              }}
            >
              <div className="text-4xl font-bold font-mono mb-4 gradient-text opacity-40 group-hover:opacity-70 transition-opacity">
                {step.n}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl p-7 relative transition-all duration-300"
              style={{
                background: tier.highlight ? `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(10,22,40,0.9))` : 'rgba(10,22,40,0.6)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${tier.highlight ? 'rgba(59,130,246,0.35)' : 'rgba(99,179,255,0.1)'}`,
                boxShadow: tier.highlight ? '0 0 40px rgba(59,130,246,0.12)' : 'none',
                transform: tier.highlight ? 'translateY(-4px)' : 'none',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-mono mb-1" style={{ color: tier.color }}>{tier.name}</div>
                  <div className="text-5xl font-bold" style={{ color: tier.color }}>{tier.commission}</div>
                  <div className="text-xs text-slate-500 mt-1">per referral cycle</div>
                </div>
                {tier.threshold !== '$0' && (
                  <div className="text-xs font-mono px-2.5 py-1 rounded-lg" style={{ background: `${tier.color}15`, color: tier.color }}>
                    From {tier.threshold}
                  </div>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7L6 10L11 4" stroke={tier.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
        >
          <h3 className="text-3xl font-bold text-white mb-3">Ready to start earning?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join 4,200+ affiliates already earning with NovaCloud. Get your referral link in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="btn-glow px-8 py-3.5 text-base font-semibold text-white rounded-xl">
              Join the Program
            </a>
            <a
              href="#"
              className="px-8 py-3.5 text-base font-medium text-slate-300 hover:text-white rounded-xl border border-white/10 hover:border-white/25 transition-all"
            >
              View Affiliate Terms
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
