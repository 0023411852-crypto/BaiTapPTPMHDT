const articles = [
  {
    category: 'Cập nhật sản phẩm',
    categoryColor: '#3b82f6',
    date: '12 Tháng 8, 2026',
    title: 'NovaCloud ra mắt Engine tự động mở rộng AI tích hợp dự báo tải',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
  },
  {
    category: 'Hạ tầng',
    categoryColor: '#22d3ee',
    date: '8 Tháng 8, 2026',
    title: 'Các điểm PoP mới tại São Paulo, Lagos, và Jakarta — 183 điểm toàn cầu',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format',
  },
  {
    category: 'Bảo mật',
    categoryColor: '#10b981',
    date: '29 Tháng 7, 2026',
    title: 'NovaCloud đạt chứng nhận kép SOC 2 Type II và ISO 27001',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop&auto=format',
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
              TIN TỨC MỚI NHẤT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Từ blog <span className="gradient-text">NovaCloud</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 group flex-shrink-0"
          >
            Xem tất cả bài viết
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Grid — 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.title}
              href="#"
              className="rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col"
              style={{
                background: 'rgba(10,22,40,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(99,179,255,0.12)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${article.categoryColor}40`
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${article.categoryColor}15`
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,179,255,0.12)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
              }}
            >
              <div className="relative h-48 bg-slate-800 overflow-hidden">
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
                <div className="text-xs text-slate-500 font-mono mb-3">{article.date}</div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center gap-1.5 text-blue-400 text-sm font-medium">
                  Đọc thêm
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 14 14">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
