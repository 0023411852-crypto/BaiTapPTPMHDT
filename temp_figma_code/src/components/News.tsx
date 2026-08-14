const articles = [
  {
    category: 'Product Update',
    categoryColor: '#3b82f6',
    date: 'Aug 12, 2026',
    title: 'NovaCloud Launches AI Autoscaling Engine with Predictive Load Forecasting',
    excerpt: 'Our new ML-powered autoscaling engine analyzes 90 days of traffic patterns to predict load spikes before they happen, scaling resources proactively instead of reactively.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
    featured: true,
  },
  {
    category: 'Infrastructure',
    categoryColor: '#22d3ee',
    date: 'Aug 8, 2026',
    title: 'New PoPs in São Paulo, Lagos, and Jakarta — 183 Locations Worldwide',
    excerpt: 'Expanding our global CDN footprint to serve the fastest-growing internet markets with sub-20ms latency.',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format',
    featured: false,
  },
  {
    category: 'Security',
    categoryColor: '#10b981',
    date: 'Jul 29, 2026',
    title: 'NovaCloud Achieves SOC 2 Type II + ISO 27001 Dual Certification',
    excerpt: 'Enterprise customers can now download our compliance reports directly from the dashboard, with automated evidence collection for their own audits.',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop&auto=format',
    featured: false,
  },
  {
    category: 'Engineering',
    categoryColor: '#6366f1',
    date: 'Jul 15, 2026',
    title: 'How We Engineered 99.999% Uptime: Inside Our Multi-Region Architecture',
    excerpt: 'A deep dive into the consensus protocol, failure detection heuristics, and automatic failover system that powers our five-nines SLA.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop&auto=format',
    featured: false,
  },
]

export default function News() {
  return (
    <section id="news" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-400/20 bg-blue-400/5">
              LATEST NEWS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              From the <span className="gradient-text">NovaCloud blog</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 group flex-shrink-0"
          >
            View all articles
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Grid — featured article on left, 3 smaller on right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured */}
          {articles.filter(a => a.featured).map((article) => (
            <a
              key={article.title}
              href="#"
              className="lg:col-span-3 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col"
              style={{
                background: 'rgba(10,22,40,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(99,179,255,0.12)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.35)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.1)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,179,255,0.12)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div className="relative h-52 bg-slate-800 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,12,26,0.8) 0%, transparent 50%)' }} />
                <span
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${article.categoryColor}20`, color: article.categoryColor, border: `1px solid ${article.categoryColor}40` }}
                >
                  {article.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs text-slate-500 font-mono mb-3">{article.date} · {article.readTime}</div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-sm font-medium">
                  Read more
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 14 14">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}

          {/* Smaller articles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {articles.filter(a => !a.featured).map((article) => (
              <a
                key={article.title}
                href="#"
                className="rounded-2xl overflow-hidden flex group transition-all duration-300 flex-1"
                style={{
                  background: 'rgba(10,22,40,0.7)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(99,179,255,0.12)',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${article.categoryColor}40`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${article.categoryColor}10`
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,179,255,0.12)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div className="w-24 flex-shrink-0 bg-slate-800 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold" style={{ color: article.categoryColor }}>{article.category}</span>
                      <span className="text-slate-700">·</span>
                      <span className="text-xs text-slate-600 font-mono">{article.readTime}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">{article.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
