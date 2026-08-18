'use client';
import React, { useEffect, useState } from 'react';

export default function ServiceManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'plans'>('plans');
  const [categories, setCategories] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  // Default form states
  const defaultPlanForm = {
    name: '',
    categoryId: '',
    description: '',
    cpuCores: 2,
    ramGB: 4,
    storageGB: 50,
    prices: [
      { months: 1, basePrice: 0, discountPercentage: 0 },
      { months: 3, basePrice: 0, discountPercentage: 0 },
      { months: 6, basePrice: 0, discountPercentage: 0 },
      { months: 9, basePrice: 0, discountPercentage: 0 },
      { months: 12, basePrice: 0, discountPercentage: 0 }
    ]
  };

  const defaultCatForm = {
    name: '',
    description: ''
  };

  const [planForm, setPlanForm] = useState(defaultPlanForm);
  const [catForm, setCatForm] = useState(defaultCatForm);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [catRes, planRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServiceCategories?PageNumber=1&PageSize=50`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServicePlans?PageNumber=1&PageSize=50`, { headers })
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !planForm.categoryId) {
      setPlanForm(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const specifications = JSON.stringify({
        cpuCores: Number(planForm.cpuCores),
        ramGB: Number(planForm.ramGB),
        storageGB: Number(planForm.storageGB)
      });

        const url = editingPlanId 
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServicePlans/${editingPlanId}`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServicePlans`;
        
        const method = editingPlanId ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            categoryId: planForm.categoryId,
            name: planForm.name,
            description: planForm.description,
            specifications: specifications,
            isActive: true,
            prices: planForm.prices.filter(p => p.basePrice > 0)
          })
        });

        if (!res.ok) throw new Error('Lỗi khi lưu gói dịch vụ');
        
        alert(editingPlanId ? 'Cập nhật thành công!' : 'Thêm gói dịch vụ thành công!');
        setShowModal(false);
        setPlanForm(defaultPlanForm);
        setEditingPlanId(null);
        fetchData();
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsSubmitting(false);
      }
  };

  const handleDeletePlan = async (id: string) => {
    if(!confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServicePlans/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if(!res.ok) throw new Error('Xóa thất bại');
      alert('Đã xóa thành công');
      fetchData();
    } catch(err: any) { alert(err.message); }
  };

  const handleEditPlan = (plan: any) => {
    setEditingPlanId(plan.id);
    setActiveTab('plans');
    let specs = { cpuCores: 2, ramGB: 4, storageGB: 50 };
    try { if(plan.specifications) specs = JSON.parse(plan.specifications); } catch(e){}
    
    // Merge existing prices
    const mergedPrices = [...defaultPlanForm.prices];
    if (plan.prices && Array.isArray(plan.prices)) {
      plan.prices.forEach((p: any) => {
        const idx = mergedPrices.findIndex(mp => mp.months === p.billingCycle);
        if (idx !== -1) {
          // Note: In reality we should calculate discountPercentage backwards or load from backend. 
          // For simplicity we set basePrice = price, discount = 0
          mergedPrices[idx] = { months: p.billingCycle, basePrice: p.price, discountPercentage: 0 };
        }
      });
    }

    setPlanForm({
      name: plan.name,
      categoryId: plan.categoryId,
      description: plan.description || '',
      cpuCores: specs.cpuCores,
      ramGB: specs.ramGB,
      storageGB: specs.storageGB,
      prices: mergedPrices
    });
    setShowModal(true);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingCatId 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServiceCategories/${editingCatId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServiceCategories`;
      const method = editingCatId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: catForm.name,
          description: catForm.description
        })
      });

      if (!res.ok) throw new Error('Lỗi khi lưu danh mục');
      
      alert(editingCatId ? 'Cập nhật thành công!' : 'Thêm danh mục thành công!');
      setShowModal(false);
      setCatForm(defaultCatForm);
      setEditingCatId(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if(!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}/api/ServiceCategories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if(!res.ok) throw new Error('Xóa thất bại (có thể do danh mục vẫn đang chứa gói dịch vụ)');
      alert('Đã xóa thành công');
      fetchData();
    } catch(err: any) { alert(err.message); }
  };

  const handleEditCategory = (cat: any) => {
    setEditingCatId(cat.id);
    setActiveTab('categories');
    setCatForm({ name: cat.name, description: cat.description || '' });
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8">
        <div>
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold tracking-tight mb-2">Quản lý dịch vụ</h2>
          <p className="text-gray-500">Giám sát và cấu hình các gói Cloud VPS đang hoạt động.</p>
        </div>
        <button 
          onClick={() => {
            setEditingPlanId(null);
            setEditingCatId(null);
            setPlanForm(defaultPlanForm);
            setCatForm(defaultCatForm);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white text-sm font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          Thêm {activeTab === 'categories' ? 'Danh mục' : 'Gói mới'}
        </button>
      </div>

      {/* Content Tabs */}
      <div className="flex border-b border-gray-200 gap-8">
        <button 
          onClick={() => setActiveTab('categories')}
          className={`text-sm font-semibold pb-3 transition-colors ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-400 shadow-sm' : 'text-gray-500 hover:text-blue-600'}`}
        >
          Danh mục dịch vụ
        </button>
        <button 
          onClick={() => setActiveTab('plans')}
          className={`text-sm font-semibold pb-3 transition-colors ${activeTab === 'plans' ? 'text-blue-600 border-b-2 border-blue-400 shadow-sm' : 'text-gray-500 hover:text-blue-600'}`}
        >
          Gói dịch vụ
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
        <div className="overflow-x-auto relative z-10 p-6 min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                {activeTab === 'plans' ? (
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên gói</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cấu hình</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Giá / Tháng</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                ) : (
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                    <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mô tả</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'plans' && plans.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Chưa có gói dịch vụ nào.</td></tr>
                )}
                {activeTab === 'categories' && categories.length === 0 && (
                  <tr><td colSpan={2} className="text-center py-8 text-gray-500">Chưa có danh mục nào.</td></tr>
                )}
                
                {activeTab === 'plans' && plans.map(plan => {
                  let specs = { cpuCores: '?', ramGB: '?', storageGB: '?' };
                  try { if(plan.specifications) specs = JSON.parse(plan.specifications); } catch(e){}
                  const cat = categories.find(c => c.id === plan.categoryId);
                  
                  return (
                  <tr key={plan.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-4 font-semibold text-gray-900">{plan.name}</td>
                    <td className="py-4 px-4 text-gray-500">{cat?.name || plan.categoryId}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                        {specs.cpuCores} vCPU • {specs.ramGB}GB RAM • {specs.storageGB}GB
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-gray-900">{plan.prices?.find((p: any) => p.billingCycle === 1)?.price || plan.prices?.[0]?.price || 'Liên hệ'}</td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${plan.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                        {plan.isActive ? 'Active' : 'Hidden'}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <button className="text-gray-500 hover:text-purple-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Xem mã QR (Tính năng Sinh mới chưa có API)" onClick={() => { if(plan.qrCodeBase64) { const win = window.open(); if(win) win.document.write(`<img src="${plan.qrCodeBase64}"/>`); } else alert('Gói này chưa có mã QR và API sinh mã đang thiếu.'); }}>
                        <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Sửa" onClick={() => handleEditPlan(plan)}>
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Xóa" onClick={() => handleDeletePlan(plan.id)}>
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                )})}

                {activeTab === 'categories' && categories.map(cat => (
                  <tr key={cat.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-4 font-semibold text-gray-900">{cat.name}</td>
                    <td className="py-4 px-4 text-gray-500">{cat.description}</td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Sửa" onClick={() => handleEditCategory(cat)}>
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-600 transition-colors p-1 bg-gray-50 rounded-md border border-gray-200" title="Xóa" onClick={() => handleDeleteCategory(cat.id)}>
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl relative z-10 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {(activeTab === 'plans' ? (editingPlanId ? 'Cập nhật Gói dịch vụ' : 'Thêm Gói dịch vụ') : (editingCatId ? 'Cập nhật Danh mục' : 'Thêm Danh mục'))}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {activeTab === 'plans' ? (
              <form id="add-form" onSubmit={handleCreatePlan} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói *</label>
                  <input required type="text" value={planForm.name} onChange={e => setPlanForm({...planForm, name: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                  <select required value={planForm.categoryId} onChange={e => setPlanForm({...planForm, categoryId: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500">
                    <option value="" disabled>-- Chọn --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">vCPU</label>
                    <input type="number" required value={planForm.cpuCores} onChange={e => setPlanForm({...planForm, cpuCores: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RAM (GB)</label>
                    <input type="number" required value={planForm.ramGB} onChange={e => setPlanForm({...planForm, ramGB: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage (GB)</label>
                    <input type="number" required value={planForm.storageGB} onChange={e => setPlanForm({...planForm, storageGB: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Bảng giá theo chu kỳ</h3>
                  <div className="space-y-3">
                    {planForm.prices.map((price, index) => (
                      <div key={price.months} className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-3 text-sm font-medium text-gray-700">{price.months} Tháng</div>
                        <div className="col-span-5">
                          <div className="relative">
                            <input 
                              type="number" 
                              value={price.basePrice} 
                              onChange={e => {
                                const newPrices = [...planForm.prices];
                                newPrices[index].basePrice = Number(e.target.value);
                                setPlanForm({...planForm, prices: newPrices});
                              }}
                              className="w-full border border-gray-300 rounded-lg py-1.5 pl-3 pr-10 text-sm text-gray-900 focus:outline-none focus:border-blue-500" 
                              placeholder="Giá gốc" 
                            />
                            <span className="absolute right-3 top-1.5 text-xs text-gray-400">VNĐ</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="relative">
                            <input 
                              type="number" 
                              min="0" max="100" 
                              value={price.discountPercentage} 
                              onChange={e => {
                                const newPrices = [...planForm.prices];
                                newPrices[index].discountPercentage = Number(e.target.value);
                                setPlanForm({...planForm, prices: newPrices});
                              }}
                              className="w-full border border-gray-300 rounded-lg py-1.5 pl-3 pr-8 text-sm text-gray-900 focus:outline-none focus:border-blue-500" 
                              placeholder="% Giảm" 
                            />
                            <span className="absolute right-3 top-1.5 text-xs text-gray-400">%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea value={planForm.description} onChange={e => setPlanForm({...planForm, description: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" rows={3}></textarea>
                </div>
              </form>
            ) : (
              <form id="add-form" onSubmit={handleCreateCategory} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục *</label>
                  <input required type="text" value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea value={catForm.description} onChange={e => setCatForm({...catForm, description: e.target.value})} className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-blue-500" rows={3}></textarea>
                </div>
              </form>
            )}

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Hủy
              </button>
              <button type="submit" form="add-form" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium shadow-sm transition-colors">
                {isSubmitting ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
