'use client';
import React, { useState } from 'react';

// Fake Data for UI showcase
const initialArticles = [
  {
    id: '1',
    title: 'NovaCloud ra mắt Engine tự động mở rộng AI tích hợp dự báo tải',
    category: 'Cập nhật sản phẩm',
    date: '12 Tháng 8, 2026',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Giải pháp mới giúp doanh nghiệp tự động scale tài nguyên máy chủ...',
    content: '<p>Nội dung chi tiết...</p>'
  },
  {
    id: '2',
    title: 'Các điểm PoP mới tại São Paulo, Lagos, và Jakarta — 183 điểm toàn cầu',
    category: 'Hạ tầng',
    date: '8 Tháng 8, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format',
    excerpt: 'Mở rộng hạ tầng mạng toàn cầu, giảm độ trễ và tăng tốc kết nối...',
    content: '<p>Nội dung chi tiết...</p>'
  }
];

export default function NewsManager() {
  const [articles, setArticles] = useState(initialArticles);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const defaultForm = {
    title: '',
    category: 'Cập nhật sản phẩm',
    image: '',
    excerpt: '',
    content: ''
  };

  const [form, setForm] = useState(defaultForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const handleOpenEdit = (article: any) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      category: article.category,
      image: article.image,
      excerpt: article.excerpt,
      content: article.content
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setArticles(articles.filter(a => a.id !== id));
      alert('Đã xóa bài viết thành công (Dữ liệu tạm)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setArticles(articles.map(a => a.id === editingId ? { ...a, ...form, date: a.date } : a));
      alert('Đã cập nhật bài viết (Dữ liệu tạm)');
    } else {
      const newArticle = {
        id: Math.random().toString(36).substr(2, 9),
        ...form,
        date: new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      setArticles([newArticle, ...articles]);
      alert('Đã thêm bài viết mới (Dữ liệu tạm)');
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold tracking-tight mb-2">Quản lý Tin tức</h2>
          <p className="text-gray-500">Đăng tải và quản lý các bài viết trên trang Blog/Tin tức.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white text-sm font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          Thêm Bài viết
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
        <div className="overflow-x-auto relative z-10 p-6 min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Ảnh</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">Chưa có bài viết nào.</td></tr>
              )}
              {articles.map(article => (
                <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={article.image} alt="Cover" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 line-clamp-1">{article.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1 mt-0.5">{article.excerpt}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm whitespace-nowrap">
                    {article.date}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Sửa" onClick={() => handleOpenEdit(article)}>
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Xóa" onClick={() => handleDelete(article.id)}>
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="w-full max-w-3xl max-h-full overflow-y-auto bg-white border border-gray-200 rounded-xl relative z-10 shadow-lg custom-scrollbar flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-20">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Cập nhật Bài viết' : 'Thêm Bài viết mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form id="news-form" onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Nhập tiêu đề bài viết..." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                  <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500">
                    <option value="Cập nhật sản phẩm">Cập nhật sản phẩm</option>
                    <option value="Hạ tầng">Hạ tầng</option>
                    <option value="Bảo mật">Bảo mật</option>
                    <option value="Hướng dẫn">Hướng dẫn</option>
                    <option value="Khuyến mãi">Khuyến mãi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh bìa (URL) *</label>
                  <input required type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt (Mô tả ngắn) *</label>
                <textarea required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" rows={2} placeholder="Sẽ hiển thị ở trang danh sách tin tức..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết (HTML) *</label>
                <textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500 font-mono text-sm" rows={8} placeholder="<p>Nhập nội dung HTML ở đây...</p>"></textarea>
                <p className="text-xs text-gray-500 mt-1">Hỗ trợ các thẻ HTML cơ bản (p, h2, ul, li, strong...).</p>
              </div>
            </form>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-20">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Hủy
              </button>
              <button type="submit" form="news-form" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium shadow-sm transition-colors">
                {editingId ? 'Cập nhật' : 'Đăng bài'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
