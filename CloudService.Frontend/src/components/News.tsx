'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

// DTO from API
interface NewsArticleDto {
  id: string;
  title: string;
  content: string;
  authorName: string;
  isPublished: boolean;
  createdAt: string;
}

// Hàm hỗ trợ tạo ảnh/màu ngẫu nhiên do API chưa có
const getFallbackData = (index: number) => {
  const fallbacks = [
    { category: 'Cập nhật sản phẩm', categoryColor: '#3b82f6', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format' },
    { category: 'Hạ tầng', categoryColor: '#22d3ee', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format' },
    { category: 'Bảo mật', categoryColor: '#10b981', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop&auto=format' },
    { category: 'Hướng dẫn', categoryColor: '#f59e0b', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop&auto=format' },
    { category: 'Khuyến mãi', categoryColor: '#ef4444', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop&auto=format' },
  ];
  return fallbacks[index % fallbacks.length];
};

export default function News() {
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:5154/api/NewsArticles?PageNumber=1&PageSize=3&onlyPublished=true');
        if (res.ok) {
          const data = await res.json();
          setArticles(data.items || []);
        }
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  return (
    <section id="news" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-400/20 bg-blue-400/5">
              TIN TỨC MỚI NHẤT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-container">
              Từ blog <span className="gradient-text">NovaCloud</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 group flex-shrink-0"
          >
            Xem tất cả bài viết
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Grid — 3 column layout */}
        {loading ? (
           <div className="flex justify-center py-12">
             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant bg-surface-container rounded-2xl">
            Chưa có bài viết nào được xuất bản.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              const fallback = getFallbackData(index);
              const dateObj = new Date(article.createdAt);
              const dateStr = `${dateObj.getDate()} Tháng ${dateObj.getMonth() + 1}, ${dateObj.getFullYear()}`;
              
              return (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col"
                  style={{
                    background: 'var(--surface-container-low)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(99,179,255,0.12)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${fallback.categoryColor}40`
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${fallback.categoryColor}15`
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,179,255,0.12)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'none'
                  }}
                >
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    <img src={fallback.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,12,26,0.8) 0%, transparent 50%)' }} />
                    <span
                      className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: `${fallback.categoryColor}20`, color: fallback.categoryColor, border: `1px solid ${fallback.categoryColor}40` }}
                    >
                      {fallback.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-on-surface-variant font-mono mb-3">{dateStr}</div>
                    <h3 className="text-lg font-bold text-primary-container mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2" title={article.title}>
                      {article.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                      Đọc thêm
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 14 14">
                        <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
