import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let article = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/NewsArticles/${resolvedParams.id}`, { cache: 'no-store' });
    if (res.ok) {
      article = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch article', err);
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="bg-background pt-24 pb-20 min-h-screen flex items-center justify-center">
          <p>Không tìm thấy bài viết.</p>
        </div>
        <Footer />
      </>
    );
  }

  const categoryColor = '#3b82f6'; // Có thể implement getCategoryColor tương tự trang list

  return (
    <>
      <Navbar />
      <div className="bg-background pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
        <Link href="/news" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <span 
            className="inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-4"
            style={{ background: `${categoryColor}15`, color: categoryColor, border: `1px solid ${categoryColor}40` }}
          >
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Đăng ngày: {new Date(article.createdAt).toLocaleDateString('vi-VN')}
          </div>
        </div>

        {/* Article Image */}
        {article.thumbnailUrl && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-gray-200 shadow-sm">
            <img src={article.thumbnailUrl} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-slate prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Share & Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">#AI</span>
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">#CloudVPS</span>
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">#AutoScaling</span>
          </div>
          <div className="flex gap-3 items-center text-gray-500">
            Chia sẻ bài viết:
            <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-800 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
