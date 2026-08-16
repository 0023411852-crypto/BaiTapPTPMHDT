'use client';
import React, { useEffect, useState } from 'react';

export default function ServiceManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'plans'>('plans');
  const [categories, setCategories] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const [catRes, planRes] = await Promise.all([
          fetch('http://localhost:5154/api/ServiceCategories?PageNumber=1&PageSize=50', { headers }),
          fetch('http://localhost:5154/api/ServicePlans?PageNumber=1&PageSize=50', { headers })
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.data || []);
        }

        if (planRes.ok) {
          const planData = await planRes.json();
          setPlans(planData.data || []);
        }
      } catch (error) {
        console.error('Lỗi khi fetch dịch vụ:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-2">Quản lý dịch vụ</h2>
          <p className="text-slate-400">Giám sát và cấu hình các gói Cloud VPS đang hoạt động.</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(93,230,255,0.25)] text-white text-sm font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          Thêm {activeTab === 'categories' ? 'Danh mục' : 'Gói mới'}
        </button>
      </div>

      {/* Content Tabs */}
      <div className="flex border-b border-[rgba(99,179,255,0.12)] gap-8">
        <button 
          onClick={() => setActiveTab('categories')}
          className={`text-sm font-semibold pb-3 transition-colors ${activeTab === 'categories' ? 'text-blue-400 border-b-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'text-slate-400 hover:text-blue-400'}`}
        >
          Danh mục dịch vụ
        </button>
        <button 
          onClick={() => setActiveTab('plans')}
          className={`text-sm font-semibold pb-3 transition-colors ${activeTab === 'plans' ? 'text-blue-400 border-b-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'text-slate-400 hover:text-blue-400'}`}
        >
          Gói dịch vụ
        </button>
      </div>

      {/* Data Table Container (Glassmorphic) */}
      <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="overflow-x-auto relative z-10 p-6 min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-slate-400">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                {activeTab === 'plans' ? (
                  <tr className="border-b border-[rgba(99,179,255,0.12)]">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tên gói</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Danh mục</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Cấu hình</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Giá / Tháng</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Trạng thái</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                ) : (
                  <tr className="border-b border-[rgba(99,179,255,0.12)]">
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tên danh mục</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Mô tả</th>
                    <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'plans' && plans.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-slate-400">Chưa có gói dịch vụ nào.</td></tr>
                )}
                {activeTab === 'categories' && categories.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-8 text-slate-400">Chưa có danh mục nào.</td></tr>
                )}
                
                {activeTab === 'plans' && plans.map(plan => (
                  <tr key={plan.id} className="border-b border-[rgba(99,179,255,0.12)] hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                          <span className="material-symbols-outlined text-blue-400 text-[18px]">dns</span>
                        </div>
                        <span className="font-semibold text-white">{plan.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{plan.categoryName || 'General'}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-mono text-blue-300 bg-[#0a1628]/50 px-2 py-1 rounded">
                        {plan.cpuCores} vCPU • {plan.ramGB}GB RAM • {plan.storageGB}GB
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-white">{plan.monthlyPrice?.toLocaleString()}₫</td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${plan.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${plan.isActive ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-red-500'}`}></div>
                        {plan.isActive ? 'Active' : 'Hidden'}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <button className="text-slate-400 hover:text-blue-400 transition-colors p-1 bg-white/5 rounded-md" title="Sinh mã QR">
                        <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                      </button>
                      <button className="text-slate-400 hover:text-blue-400 transition-colors p-1 bg-white/5 rounded-md" title="Sửa">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'categories' && categories.map(cat => (
                  <tr key={cat.id} className="border-b border-[rgba(99,179,255,0.12)] hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
                          <span className="material-symbols-outlined text-cyan-400 text-[18px]">category</span>
                        </div>
                        <span className="font-semibold text-white">{cat.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{cat.description}</td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <button className="text-slate-400 hover:text-blue-400 transition-colors p-1 bg-white/5 rounded-md" title="Sửa">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination area */}
        <div className="p-4 border-t border-[rgba(99,179,255,0.12)] flex justify-between items-center bg-[#0a1628]/50">
          <span className="text-xs text-slate-400">Hiển thị danh sách dịch vụ</span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded text-slate-400 hover:bg-white/5 transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="p-1.5 rounded text-slate-400 hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
