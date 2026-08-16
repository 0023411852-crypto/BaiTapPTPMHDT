'use client';
import React, { useEffect, useState } from 'react';

export default function NewsManager() {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5154/api/NewsArticles?PageNumber=1&PageSize=50', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNews(data.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8 relative z-10 mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Quản lý Tin tức</h2>
          <p className="text-slate-400">Quản lý các bài viết, thông báo và tin tức hệ thống.</p>
        </div>
        <button 
          onClick={() => setShowEditor(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-[18px]">edit_document</span>
          + Viết bài mới
        </button>
      </div>

      <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden relative z-10 shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-slate-400">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#0a1628]/50 border-b border-[rgba(99,179,255,0.12)] text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-medium">Tiêu đề</th>
                  <th className="py-4 px-6 font-medium">Tác giả</th>
                  <th className="py-4 px-6 font-medium">Trạng thái</th>
                  <th className="py-4 px-6 font-medium">Ngày tạo</th>
                  <th className="py-4 px-6 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(99,179,255,0.12)] text-sm">
                {news.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400">Chưa có bài viết nào</td></tr>
                ) : (
                  news.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[16px] text-blue-400">{item.title}</div>
                        <div className="text-slate-400 truncate w-64 mt-1">{item.summary || '...'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{item.authorName || 'Admin'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Đã đăng
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="px-6 py-4 border-t border-[rgba(99,179,255,0.12)] flex justify-between items-center bg-[#0a1628]/30">
          <span className="text-sm text-slate-400">Hiển thị danh sách tin tức</span>
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-50 bg-[#02050A]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in duration-200">
          <div className="h-16 border-b border-[rgba(99,179,255,0.12)] flex items-center justify-between px-8 bg-[#0a1628]">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowEditor(false)} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="text-xl font-bold text-white">Viết bài mới</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg text-sm border border-[rgba(99,179,255,0.2)] text-white hover:bg-white/5">Lưu nháp</button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-lg text-sm font-semibold text-white">Xuất bản</button>
            </div>
          </div>
          <div className="flex-1 p-8 max-w-[900px] w-full mx-auto relative">
            <input type="text" placeholder="Nhập tiêu đề..." className="w-full bg-transparent border-none text-[40px] font-bold text-white focus:ring-0 outline-none" />
            <textarea className="w-full min-h-[500px] bg-transparent border-none text-lg text-white mt-8 focus:ring-0 outline-none" placeholder="Nội dung..."></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
