'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface NewsArticleDto {
  id: string;
  title: string;
  content: string;
  authorName: string;
  isPublished: boolean;
  createdAt: string;
}

const getFallbackData = (index: number) => {
  const fallbacks = [
    { category: 'Cập nhật sản phẩm', categoryColor: '#3b82f6', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format', excerpt: 'Giải pháp mới giúp doanh nghiệp tối ưu hóa nguồn lực.' },
    { category: 'Hạ tầng', categoryColor: '#22d3ee', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format', excerpt: 'Mở rộng hạ tầng mạng toàn cầu, giảm độ trễ và tăng tốc kết nối.' },
    { category: 'Bảo mật', categoryColor: '#10b981', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop&auto=format', excerpt: 'Bảo vệ dữ liệu khách hàng với tiêu chuẩn quốc tế.' },
    { category: 'Hướng dẫn', categoryColor: '#f59e0b', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop&auto=format', excerpt: 'Từng bước triển khai dự án nhanh chóng trên nền tảng của chúng tôi.' },
    { category: 'Khuyến mãi', categoryColor: '#ef4444', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop&auto=format', excerpt: 'Chương trình tri ân khách hàng đặc biệt trong tháng.' },
    { category: 'Cập nhật sản phẩm', categoryColor: '#3b82f6', image: 'https://images.unsplash.com/photo-1614064641913-6b71a2eaae37?w=600&h=340&fit=crop&auto=format', excerpt: 'Tính năng mới vừa được bổ sung vào hệ sinh thái của NovaCloud.' }
  ];
  return fallbacks[index % fallbacks.length];
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5154/api/NewsArticles?PageNumber=${page}&PageSize=${pageSize}&onlyPublished=true`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data.items || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="bg-background pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-container">Tin tức & Blog</h1>
            <p className="text-xl text-slate-600">Cập nhật những thông tin mới nhất từ NimbusCloud</p>
          </div>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 pl-12 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select className="bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 shadow-sm">
          <option value="">Tất cả danh mục</option>
          <option value="product">Cập nhật sản phẩm</option>
          <option value="infra">Hạ tầng</option>
          <option value="security">Bảo mật</option>
          <option value="guide">Hướng dẫn</option>
          <option value="promo">Khuyến mãi</option>
        </select>
      </div>

      {/* Grid — 3 column layout */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-surface-container rounded-2xl max-w-7xl mx-auto">
          <p className="text-on-surface-variant text-lg">Chưa có bài viết nào được xuất bản.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => {
            const fallback = getFallbackData(index);
            const dateObj = new Date(article.createdAt);
            const dateStr = `${dateObj.getDate()} Tháng ${dateObj.getMonth() + 1}, ${dateObj.getFullYear()}`;
            
            // Generate excerpt if not provided by backend
            const stripHtml = (html: string) => {
              const tmp = document.createElement("DIV");
              tmp.innerHTML = html;
              return tmp.textContent || tmp.innerText || "";
            };
            const excerpt = article.content ? stripHtml(article.content).substring(0, 100) + '...' : fallback.excerpt;
            
            return (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img src={fallback.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span
                    className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md"
                    style={{ background: 'rgba(255,255,255,0.9)', color: fallback.categoryColor }}
                  >
                    {fallback.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-gray-500 font-mono mb-3">{dateStr}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2" title={article.title}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-1.5 text-blue-600 text-sm font-medium border-t border-gray-100">
                    Đọc bài viết
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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button 
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                page === p 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors'
              }`}
            >
              {p}
            </button>
          ))}
          
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      )}
      </div>
      </div>
      <Footer />
    </>
  );
}
