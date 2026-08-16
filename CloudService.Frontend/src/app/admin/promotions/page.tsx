import React, { useState, useEffect } from 'react';

export default function PromotionsManager() {
  const [showModal, setShowModal] = useState(false);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5154/api/Promotions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('API /api/Promotions chưa được implement ở Backend.');
        const data = await res.json();
        setPromotions(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Quản lý Khuyến mãi</h2>
          <p className="text-slate-400">Quản lý các mã giảm giá và chương trình ưu đãi.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-5 rounded-lg flex items-center gap-2 font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm khuyến mãi
        </button>
      </header>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input 
            type="text" 
            className="w-full bg-[#0f1d35]/80 border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500" 
            placeholder="Tìm kiếm theo mã code, tên gói..." 
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-[#0f1d35]/80 border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 appearance-none outline-none">
            <option>Tất cả trạng thái</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="bg-[#0f1d35]/80 border border-[rgba(99,179,255,0.12)] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors text-slate-400">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Lọc
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(99,179,255,0.12)] bg-[#0a1628]/50">
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">Mã code</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">Gói áp dụng</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">% giảm</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">Ngày bắt đầu</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">Ngày kết thúc</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider">Trạng thái</th>
                <th className="py-4 px-6 font-mono text-xs text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">Đang tải dữ liệu...</td>
                </tr>
              )}
              
              {!isLoading && error && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-red-400">Lỗi: {error}</td>
                </tr>
              )}

              {!isLoading && !error && promotions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">Không có dữ liệu khuyến mãi.</td>
                </tr>
              )}

              {!isLoading && !error && promotions.map((promo, index) => (
                <tr key={index} className="border-b border-[rgba(99,179,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono text-blue-400 font-bold">{promo.code}</td>
                  <td className="py-4 px-6 text-white">{promo.servicePlanName || 'All Services'}</td>
                  <td className="py-4 px-6 text-cyan-400 font-bold text-[16px]">{promo.discountPercentage}%</td>
                  <td className="py-4 px-6 text-slate-400 font-mono">{new Date(promo.startDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-slate-400 font-mono">{new Date(promo.endDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" checked={promo.isActive} readOnly className="peer sr-only" id={`toggle${index}`} />
                      <label htmlFor={`toggle${index}`} className="block overflow-hidden h-5 rounded-full bg-[#1a2c47] cursor-pointer peer-checked:bg-blue-600 transition-colors duration-300 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] peer-checked:before:translate-x-5 before:transition-transform before:duration-300"></label>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-blue-400 p-1 rounded-md hover:bg-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[rgba(99,179,255,0.12)] flex items-center justify-between bg-[#0a1628]/30">
          <span className="text-sm text-slate-400">Hiển thị {promotions.length} kết quả</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-md flex items-center justify-center border border-[rgba(99,179,255,0.12)] text-slate-400 hover:bg-white/5 disabled:opacity-50" disabled><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-500/20 border border-blue-500/50 text-blue-400">1</button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center border border-[rgba(99,179,255,0.12)] text-slate-400 hover:bg-white/5 disabled:opacity-50" disabled><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Add Promo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#02050A]/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="w-full max-w-lg bg-[#0a1628]/95 backdrop-blur-2xl border border-[rgba(99,179,255,0.15)] rounded-xl overflow-hidden relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)] animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[rgba(99,179,255,0.12)] flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Thêm Khuyến Mãi Mới</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-red-500 transition-colors rounded-full p-1 hover:bg-white/5"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form className="p-6 space-y-5">
              {/* Field: Code */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Mã Code</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0f1d35] border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 px-4 font-mono text-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  placeholder="VD: SUMMER24" 
                />
              </div>

              {/* Field: Discount */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">% Giảm giá</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1" max="100" 
                    className="w-full bg-[#0f1d35] border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="20" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
              </div>

              {/* Field: Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Ngày bắt đầu</label>
                  <input type="date" className="w-full bg-[#0f1d35] border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Ngày kết thúc</label>
                  <input type="date" className="w-full bg-[#0f1d35] border border-[rgba(99,179,255,0.12)] rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [color-scheme:dark]" />
                </div>
              </div>

              {/* Field: Applicable Services */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Gói áp dụng</label>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-[rgba(99,179,255,0.12)] transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#1a2c47] border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                    <span className="text-sm text-white">Tất cả dịch vụ</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-[rgba(99,179,255,0.12)] transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#1a2c47] border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                    <span className="text-sm text-white">Compute Instance Pro</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-[rgba(99,179,255,0.12)] transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#1a2c47] border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                    <span className="text-sm text-white">Object Storage Basic</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer border border-transparent hover:border-[rgba(99,179,255,0.12)] transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded bg-[#1a2c47] border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                    <span className="text-sm text-white">Managed Database SQL</span>
                  </label>
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-[rgba(99,179,255,0.12)] bg-[#0f1d35] flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border border-[rgba(99,179,255,0.3)] text-slate-300 hover:bg-white/5 transition-colors"
              >
                Hủy
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 rounded-lg text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                Lưu Khuyến Mãi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
