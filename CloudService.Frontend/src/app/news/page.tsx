import React from 'react';
import Link from 'next/link';

const allArticles = [
  {
    id: '1',
    category: 'Cập nhật sản phẩm',
    categoryColor: '#3b82f6',
    date: '12 Tháng 8, 2026',
    title: 'NovaCloud ra mắt Engine tự động mở rộng AI tích hợp dự báo tải',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Giải pháp mới giúp doanh nghiệp tự động scale tài nguyên máy chủ dựa trên nhu cầu thực tế với sự hỗ trợ của AI dự báo.',
  },
  {
    id: '2',
    category: 'Hạ tầng',
    categoryColor: '#22d3ee',
    date: '8 Tháng 8, 2026',
    title: 'Các điểm PoP mới tại São Paulo, Lagos, và Jakarta — 183 điểm toàn cầu',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Mở rộng hạ tầng mạng toàn cầu, giảm độ trễ và tăng tốc kết nối cho khách hàng ở các khu vực Nam Mỹ, Châu Phi và Đông Nam Á.',
  },
  {
    id: '3',
    category: 'Bảo mật',
    categoryColor: '#10b981',
    date: '29 Tháng 7, 2026',
    title: 'NovaCloud đạt chứng nhận kép SOC 2 Type II và ISO 27001',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Chúng tôi tự hào công bố đã vượt qua các bài kiểm tra bảo mật khắt khe nhất để đạt chuẩn quốc tế về an toàn thông tin.',
  },
  {
    id: '4',
    category: 'Hướng dẫn',
    categoryColor: '#f59e0b',
    date: '15 Tháng 7, 2026',
    title: 'Cách thiết lập Kubernetes Cluster trên nền tảng NovaCloud chỉ với 5 phút',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Bài viết hướng dẫn chi tiết từng bước để triển khai cụm K8s với các tool có sẵn trên NovaCloud.',
  },
  {
    id: '5',
    category: 'Khuyến mãi',
    categoryColor: '#ef4444',
    date: '01 Tháng 7, 2026',
    title: 'Chương trình ưu đãi tháng 7: Tặng thêm 50% thời hạn khi gia hạn VPS',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Áp dụng cho tất cả khách hàng đang sử dụng dịch vụ Cloud VPS NVMe của NovaCloud trong tháng này.',
  },
  {
    id: '6',
    category: 'Cập nhật sản phẩm',
    categoryColor: '#3b82f6',
    date: '20 Tháng 6, 2026',
    title: 'Ra mắt tính năng Backup tự động miễn phí cho mọi gói Hosting',
    image: 'https://images.unsplash.com/photo-1614064641913-6b71a2eaae37?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Bảo vệ dữ liệu website của bạn an toàn hơn với bản sao lưu tự động hàng ngày hoàn toàn miễn phí.',
  }
];

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Tin tức & Blog</h1>
        <p className="text-xl text-slate-400">Cập nhật những thông tin mới nhất từ NovaCloud</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            className="w-full bg-[#0a1628] border border-[rgba(99,179,255,0.2)] rounded-xl py-3 px-4 pl-12 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select className="bg-[#0a1628] border border-[rgba(99,179,255,0.2)] rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-blue-500">
          <option value="">Tất cả danh mục</option>
          <option value="product">Cập nhật sản phẩm</option>
          <option value="infra">Hạ tầng</option>
          <option value="security">Bảo mật</option>
          <option value="guide">Hướng dẫn</option>
          <option value="promo">Khuyến mãi</option>
        </select>
      </div>

      {/* Grid — 3 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {allArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
            className="rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col"
            style={{
              background: 'rgba(10,22,40,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(99,179,255,0.12)',
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
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-4 flex items-center gap-1.5 text-blue-400 text-sm font-medium border-t border-[rgba(99,179,255,0.1)]">
                Đọc bài viết
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 14 14">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        <button className="w-10 h-10 rounded-lg bg-[#0a1628] border border-[rgba(99,179,255,0.2)] text-slate-400 flex items-center justify-center hover:text-white hover:border-blue-500 transition-colors">
          &lt;
        </button>
        <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
          1
        </button>
        <button className="w-10 h-10 rounded-lg bg-[#0a1628] border border-[rgba(99,179,255,0.2)] text-slate-400 flex items-center justify-center hover:text-white hover:border-blue-500 transition-colors">
          2
        </button>
        <button className="w-10 h-10 rounded-lg bg-[#0a1628] border border-[rgba(99,179,255,0.2)] text-slate-400 flex items-center justify-center hover:text-white hover:border-blue-500 transition-colors">
          3
        </button>
        <button className="w-10 h-10 rounded-lg bg-[#0a1628] border border-[rgba(99,179,255,0.2)] text-slate-400 flex items-center justify-center hover:text-white hover:border-blue-500 transition-colors">
          &gt;
        </button>
      </div>
    </div>
  );
}
