'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface NewsArticleDto {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  thumbnailUrl: string;
  excerpt: string;
  authorName: string;
  isPublished: boolean;
  createdAt: string;
}

const getCategoryColor = (category: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('sản phẩm') || cat.includes('product')) return '#3b82f6';
  if (cat.includes('hạ tầng') || cat.includes('infra')) return '#22d3ee';
  if (cat.includes('bảo mật') || cat.includes('security')) return '#10b981';
  if (cat.includes('hướng dẫn') || cat.includes('guide')) return '#f59e0b';
  if (cat.includes('khuyến mãi') || cat.includes('promo')) return '#ef4444';
  return '#8b5cf6'; // Default color (purple)
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/NewsArticles?PageNumber=${page}&PageSize=${pageSize}&onlyPublished=true`);
        if (res.ok) {
          const data = await res.json();
          // Lọc dữ liệu client-side nếu API không hỗ trợ query string Category
          let fetchedItems = data.items || [];
          if (filterCategory) {
            fetchedItems = fetchedItems.filter((a: NewsArticleDto) => (a.category || '').toLowerCase().includes(filterCategory.toLowerCase()));
          }
          if (searchQuery) {
            fetchedItems = fetchedItems.filter((a: NewsArticleDto) => (a.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || (a.content || '').toLowerCase().includes(searchQuery.toLowerCase()));
          }
          setArticles(fetchedItems);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [page, filterCategory, searchQuery]);

  return (
    <>
      <Navbar />
      <div className="bg-background pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-container">Tin tức & Blog</h1>
            <p className="text-xl text-slate-600">Cập nhật những thông tin mới nhất từ NovaCloud</p>
          </div>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 pl-12 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select 
          className="bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 shadow-sm"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          <option value="sản phẩm">Cập nhật sản phẩm</option>
          <option value="hạ tầng">Hạ tầng</option>
          <option value="bảo mật">Bảo mật</option>
          <option value="hướng dẫn">Hướng dẫn</option>
          <option value="khuyến mãi">Khuyến mãi</option>
        </select>
      </div>

      {/* Grid — 3 column layout */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-surface-container rounded-2xl max-w-7xl mx-auto">
          <p className="text-on-surface-variant text-lg">Chưa có bài viết nào phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article) => {
            const categoryColor = getCategoryColor(article.category);
            const dateObj = new Date(article.createdAt);
            const dateStr = `${dateObj.getDate()} Tháng ${dateObj.getMonth() + 1}, ${dateObj.getFullYear()}`;
            
            // Generate excerpt safely
            const stripHtml = (html: string) => {
              const tmp = document.createElement("DIV");
              tmp.innerHTML = html;
              return tmp.textContent || tmp.innerText || "";
            };
            const displayExcerpt = article.excerpt || (article.content ? stripHtml(article.content).substring(0, 100) + '...' : '');
            
            return (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {article.thumbnailUrl && (
                    <img 
                      src={article.thumbnailUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {article.category && (
                    <span
                      className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md"
                      style={{ background: 'rgba(255,255,255,0.9)', color: getCategoryColor(article.category) }}
                    >
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-gray-500 font-mono mb-3">{dateStr}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2" title={article.title}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {displayExcerpt}
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
