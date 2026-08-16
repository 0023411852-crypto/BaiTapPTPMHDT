'use client';
import React, { useEffect, useState } from 'react';

export default function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5154/api/Orders/all?PageNumber=1&PageSize=50', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5154/api/Orders/${selectedOrder.id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
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
          <div className="flex items-center gap-2 font-mono text-slate-400 text-xs mb-2 uppercase tracking-wider">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Billing</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">Quản lý Đơn hàng</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            Quản lý Đơn hàng
          </h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[rgba(99,179,255,0.12)] text-white text-sm hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Xuất Báo Cáo
        </button>
      </header>

      {/* Filter Bar */}
      <section className="mb-6 flex items-center justify-between bg-[#0f1d35]/80 backdrop-blur-md p-2 rounded-xl border border-[rgba(99,179,255,0.12)] shrink-0">
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/40">Tất cả</button>
        </div>
      </section>

      {/* Data Table */}
      <section className="flex-1 min-h-0 bg-[#0f1d35]/80 backdrop-blur-2xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden flex flex-col shadow-2xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[rgba(99,179,255,0.12)] bg-[#0a1628]/50 text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
          <div className="col-span-2">Mã đơn</div>
          <div className="col-span-2">Gói dịch vụ</div>
          <div className="col-span-2">Số tiền (VND)</div>
          <div className="col-span-2">Trạng thái</div>
          <div className="col-span-2">Ngày đặt</div>
          <div className="col-span-2 text-right">Hành động</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          
          {isLoading ? (
            <div className="p-8 text-center text-slate-400">Đang tải...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-slate-400">Không có đơn hàng nào</div>
          ) : (
            orders.map(order => (
              <div 
                key={order.id}
                onClick={() => openDrawer(order)}
                className="grid grid-cols-12 gap-4 p-3 items-center rounded-lg bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-colors"
              >
                <div className="col-span-2 font-mono text-white text-sm">#{order.id?.substring(0, 8).toUpperCase()}</div>
                <div className="col-span-2 text-sm text-slate-400">{order.servicePlanName || 'Cloud Service'}</div>
                <div className="col-span-2 font-mono text-white">{order.totalAmount?.toLocaleString()}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded font-mono text-[10px] border ${getStatusStyle(order.status)}`}>
                    {order.status || 'Mới'}
                  </span>
                </div>
                <div className="col-span-2 font-mono text-slate-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button className="text-slate-400 hover:text-blue-400 transition-colors">
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
          <div className="absolute inset-0 bg-[#02050A]/60 backdrop-blur-sm pointer-events-auto" onClick={closeDrawer}></div>
          <div className="relative w-[550px] max-w-[90vw] bg-[#0a1628]/95 backdrop-blur-3xl border-l border-[rgba(99,179,255,0.12)] shadow-2xl flex flex-col pointer-events-auto">
            <div className="p-6 border-b border-[rgba(99,179,255,0.12)] flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-xl text-white font-bold mb-1">Chi tiết đơn hàng</h3>
                <p className="font-mono text-slate-400 text-sm">#{selectedOrder.id}</p>
              </div>
              <button onClick={closeDrawer} className="w-8 h-8 rounded-full bg-white/5 text-slate-400 hover:text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-white/5 border border-[rgba(99,179,255,0.12)] rounded-xl p-5">
                <h4 className="font-mono text-slate-400 mb-4 uppercase text-[10px]">Thanh toán</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Gói dịch vụ</span>
                    <span>{selectedOrder.totalAmount?.toLocaleString()} VND</span>
                  </div>
                  <div className="pt-3 border-t border-[rgba(99,179,255,0.12)] flex justify-between">
                    <span className="font-bold text-white">Tổng cộng</span>
                    <span className="font-mono text-blue-400 text-lg">{selectedOrder.totalAmount?.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[rgba(99,179,255,0.12)] bg-[#0f1d35] flex gap-3 justify-end shrink-0">
              <button onClick={() => handleUpdateStatus('Cancelled')} className="px-5 py-2.5 rounded-lg border border-red-500/50 text-red-500 text-sm hover:bg-red-500/10">Từ chối</button>
              <button onClick={() => handleUpdateStatus('Completed')} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm border border-blue-500 hover:bg-blue-500">Duyệt & Khởi tạo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
