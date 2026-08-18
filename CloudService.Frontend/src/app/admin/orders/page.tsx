'use client';
import React, { useEffect, useState } from 'react';
import { fetchWithAuth, API_BASE_URL } from '@/utils/api';

export default function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/Orders/all?PageNumber=1&PageSize=50`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openDrawer = (order: any) => setSelectedOrder(order);
  const closeDrawer = () => setSelectedOrder(null);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrder) return;
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/Orders/${selectedOrder.id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
      });
      if (res.ok) {
        alert('Cập nhật trạng thái thành công');
        fetchOrders();
        closeDrawer();
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  const handleExportOrders = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/Orders/export`);
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Orders_Export_${new Date().getTime()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Lỗi khi xuất dữ liệu');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col h-[calc(100vh-80px)] relative">
      {/* Header Section */}
      <header className="mb-6 flex justify-between items-end shrink-0 mt-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-gray-500 text-xs mb-2 uppercase tracking-wider">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Billing</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-blue-600 font-semibold drop-shadow-sm">Quản lý Đơn hàng</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            Quản lý Đơn hàng
          </h2>
        </div>
        <button onClick={handleExportOrders} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Xuất Báo Cáo
        </button>
      </header>

      {/* Filter Bar */}
      <section className="mb-6 flex items-center justify-between bg-white backdrop-blur-md p-2 rounded-xl border border-gray-200 shrink-0">
        <div className="flex gap-4 w-full">
          <input 
            type="text" 
            placeholder="Tìm theo mã đơn hoặc gói dịch vụ..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 rounded-lg bg-purple-500/20 text-blue-600 text-xs font-semibold border border-blue-500">Tất cả</button>
        </div>
      </section>

      {/* Data Table */}
      <section className="flex-1 min-h-0 bg-white backdrop-blur-2xl border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-2xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">
          <div className="col-span-2">Mã đơn</div>
          <div className="col-span-2">Gói dịch vụ</div>
          <div className="col-span-2">Số tiền (VND)</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2">Ngày đặt</div>
          <div className="col-span-2 text-right">Hành động</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Đang tải...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Không có đơn hàng nào</div>
          ) : (
            orders
              .filter(o => (o.id || '').toLowerCase().includes(searchQuery.toLowerCase()) || (o.servicePlanName || '').toLowerCase().includes(searchQuery.toLowerCase()))
              .map(order => (
              <div 
                key={order.id}
                onClick={() => openDrawer(order)}
                className="grid grid-cols-12 gap-4 p-3 items-center rounded-lg bg-gray-50 border border-transparent hover:border-white/10 cursor-pointer transition-colors"
              >
                <div className="col-span-2 font-mono text-gray-900 text-sm">#{order.id?.substring(0, 8).toUpperCase()}</div>
                <div className="col-span-2 text-sm text-gray-500">{order.servicePlanName || 'Cloud Service'}</div>
                <div className="col-span-2 font-mono text-gray-900">{order.totalAmount?.toLocaleString()}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded font-mono text-[10px] border ${getStatusStyle(order.status)}`}>
                    {order.status || 'Mới'}
                  </span>
                </div>
                <div className="col-span-2 font-mono text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm pointer-events-auto" onClick={closeDrawer}></div>
          <div className="relative w-[550px] max-w-[90vw] bg-white backdrop-blur-3xl border-l border-gray-200 shadow-2xl flex flex-col pointer-events-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-xl text-gray-900 font-bold mb-1">Chi tiết đơn hàng</h3>
                <p className="font-mono text-gray-500 text-sm">#{selectedOrder.id}</p>
              </div>
              <button onClick={closeDrawer} className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="font-mono text-gray-500 mb-4 uppercase text-[10px]">Thanh toán</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Gói dịch vụ</span>
                    <span>{selectedOrder.totalAmount?.toLocaleString()} VND</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className="font-bold text-gray-900">Tổng cộng</span>
                    <span className="font-mono text-blue-600 text-lg">{selectedOrder.totalAmount?.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-white flex gap-3 justify-end shrink-0">
              <button onClick={() => handleUpdateStatus('Cancelled')} className="px-5 py-2.5 rounded-lg border border-red-500/50 text-red-500 text-sm hover:bg-red-500/10">Từ chối</button>
              <button onClick={() => handleUpdateStatus('Completed')} className="px-5 py-2.5 rounded-lg bg-blue-600 text-gray-900 font-bold text-sm border border-blue-500 hover:bg-purple-500">Duyệt & Khởi tạo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

