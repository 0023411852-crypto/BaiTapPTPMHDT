'use client';
import React, { useState, useEffect } from 'react';

export default function PromotionsManager() {
  const [showModal, setShowModal] = useState(false);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<any[]>([]);
  const [servicePlans, setServicePlans] = useState<any[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: 10,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    servicePlanId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      code: '',
      discountPercentage: 10,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
      servicePlanId: servicePlans.length > 0 ? servicePlans[0].id : ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (promo: any) => {
    setEditingId(promo.id);
    setFormData({
      code: promo.code,
      discountPercentage: promo.discountPercentage,
      startDate: new Date(promo.startDate).toISOString().split('T')[0],
      endDate: new Date(promo.endDate).toISOString().split('T')[0],
      servicePlanId: promo.servicePlanId || (servicePlans.length > 0 ? servicePlans[0].id : '')
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Promotions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      alert('Đã xóa thành công!');
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const fetchPromotions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Promotions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không thể tải danh sách Khuyến mãi.');
      const data = await res.json();
      setPromotions(data.data || []);
      setFilteredPromotions(data.data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchServicePlans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServicePlans`);
      if (res.ok) {
        const data = await res.json();
        setServicePlans(data.data || []);
        if (data.data && data.data.length > 0) {
          setFormData(prev => ({ ...prev, servicePlanId: data.data[0].id }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await Promise.all([fetchPromotions(), fetchServicePlans()]);
      setIsLoading(false);
    };
    initData();
  }, []);

  // Handle Filtering
  useEffect(() => {
    let result = promotions;
    
    // 1. Search filter
    if (searchTerm) {
      result = result.filter(p => 
        p.code?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.servicePlanId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 2. Status filter
    if (filterStatus === 'Active') {
      result = result.filter(p => p.isActive === true);
    } else if (filterStatus === 'Inactive') {
      result = result.filter(p => p.isActive === false);
    }
    
    setFilteredPromotions(result);
  }, [searchTerm, filterStatus, promotions]);

  const handleCreatePromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.servicePlanId || !formData.code) {
      alert("Vui lòng điền đủ thông tin bắt buộc!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        servicePlanId: formData.servicePlanId,
        code: formData.code,
        discountPercentage: Number(formData.discountPercentage),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        isActive: true
      };

      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Promotions/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/Promotions`;
        
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lỗi khi tạo khuyến mãi');
      }

      alert(editingId ? 'Cập nhật khuyến mãi thành công!' : 'Tạo khuyến mãi thành công!');
      setShowModal(false);
      // Reset form
      setFormData({
        ...formData,
        code: '',
        discountPercentage: 10
      });
      // Refresh list
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col h-full relative">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Quản lý Khuyến mãi</h2>
          <p className="text-gray-500">Quản lý các mã giảm giá và chương trình ưu đãi.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm khuyến mãi
        </button>
      </header>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px]">search</span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500" 
            placeholder="Tìm kiếm theo mã code, tên gói..." 
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:border-blue-500 appearance-none outline-none"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Mã code</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Gói áp dụng (ID)</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">% giảm</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Ngày bắt đầu</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Ngày kết thúc</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="py-4 px-6 font-mono text-xs text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              )}
              
              {!isLoading && error && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-red-500">Lỗi: {error}</td>
                </tr>
              )}

              {!isLoading && !error && filteredPromotions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">Không có dữ liệu khuyến mãi.</td>
                </tr>
              )}

              {!isLoading && !error && filteredPromotions.map((promo, index) => (
                <tr key={promo.id || index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-blue-600 font-bold">{promo.code}</td>
                  <td className="py-4 px-6 text-gray-900 font-mono text-xs" title={promo.servicePlanId}>
                    {promo.servicePlanId?.substring(0, 8)}...
                  </td>
                  <td className="py-4 px-6 text-blue-600 font-bold text-[16px]">{promo.discountPercentage}%</td>
                  <td className="py-4 px-6 text-gray-500 font-mono">{new Date(promo.startDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-gray-500 font-mono">{new Date(promo.endDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" checked={promo.isActive} readOnly className="peer sr-only" id={`toggle${index}`} />
                      <label htmlFor={`toggle${index}`} className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-blue-600 transition-colors duration-300 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] peer-checked:before:translate-x-5 before:transition-transform before:duration-300"></label>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenEdit(promo)} className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-gray-50 transition-colors" title="Sửa">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="text-gray-500 hover:text-red-600 p-1 rounded-md hover:bg-gray-50 transition-colors" title="Xóa">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Hiển thị {filteredPromotions.length} kết quả</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center bg-purple-500/20 border border-blue-500 text-blue-600">1</button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Add Promo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="w-full max-w-lg bg-white backdrop-blur-2xl border border-gray-200 rounded-xl overflow-hidden relative z-10 shadow-sm animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Cập nhật Khuyến Mãi' : 'Thêm Khuyến Mãi Mới'}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 transition-colors rounded-full p-1 hover:bg-gray-50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form id="add-promo-form" onSubmit={handleCreatePromotion} className="p-6 space-y-5">
              {/* Field: Code */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Mã Code *</label>
                <input 
                  type="text" 
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 font-mono text-blue-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  placeholder="VD: SUMMER24" 
                />
              </div>

              {/* Field: Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">% Giảm giá *</label>
                <div className="relative">
                  <input 
                    type="number" 
                    required
                    min="1" max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({...formData, discountPercentage: Number(e.target.value)})}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="20" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Field: Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Ngày bắt đầu *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Ngày kết thúc *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
              </div>

              {/* Field: Applicable Services */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Gói áp dụng *</label>
                <select
                  required
                  value={formData.servicePlanId}
                  onChange={(e) => setFormData({...formData, servicePlanId: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none outline-none"
                >
                  <option value="" disabled>-- Chọn gói dịch vụ --</option>
                  {servicePlans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name} - ${plan.monthlyPrice}/tháng</option>
                  ))}
                </select>
              </div>
            </form>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors bg-white font-medium shadow-sm"
              >
                Hủy
              </button>
              <button 
                type="submit"
                form="add-promo-form"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium shadow-sm transition-colors ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? 'Đang lưu...' : (editingId ? 'Cập nhật Khuyến Mãi' : 'Lưu Khuyến Mãi')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
