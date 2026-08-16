'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch('http://localhost:5154/api/Orders/my-orders?PageNumber=1&PageSize=10', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const result = await res.json();
          setOrders(result.data || []);
        } else {
          console.error('Lỗi khi tải đơn hàng');
        }
      } catch (err) {
        console.error('Lỗi kết nối:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const getStatusDisplay = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></div>
            Hoàn thành
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
            Đang xử lý
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            {status || 'Mới'}
          </span>
        );
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Đang tải lịch sử đơn hàng...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Đơn hàng của tôi</h1>
          <p className="text-lg text-slate-400">Quản lý lịch sử giao dịch và dịch vụ của bạn.</p>
        </header>

        {/* Data View */}
        <div className="w-full">
          <div className="bg-[#0f1d35]/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl p-1 border border-[rgba(99,179,255,0.12)]">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(99,179,255,0.12)] text-xs font-semibold text-slate-400 tracking-wider uppercase">
              <div className="col-span-4">Gói dịch vụ (Mã Đơn)</div>
              <div className="col-span-2 text-right">Số tiền</div>
              <div className="col-span-3 text-center">Trạng thái</div>
              <div className="col-span-2">Ngày đặt</div>
              <div className="col-span-1 text-right">Thao tác</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col gap-2 p-2">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Bạn chưa có đơn hàng nào.</div>
              ) : (
                orders.map((order, index) => (
                  <div key={order.id || index} className="bg-[#0a1628]/50 hover:bg-[#0a1628]/80 border border-[rgba(99,179,255,0.05)] hover:border-[rgba(99,179,255,0.15)] rounded-lg p-4 md:px-4 md:py-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-all">
                    <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <span className="material-symbols-outlined text-[20px]">dns</span>
                      </div>
                      <div>
                        <div className="text-sm text-white font-semibold">{order.servicePlanName || 'Dịch vụ NovaCloud'}</div>
                        <div className="text-xs font-mono text-slate-400">{order.id?.substring(0, 8).toUpperCase() || `ORD-${index+1}`}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:contents gap-2 text-sm md:text-base">
                      <div className="md:col-span-2 md:text-right text-blue-400 font-mono font-bold flex items-center md:justify-end">
                        <span className="md:hidden text-slate-400 mr-2">Số tiền:</span> {order.totalAmount ? order.totalAmount.toLocaleString() : 0}₫
                      </div>
                      <div className="md:col-span-3 flex justify-start md:justify-center items-center">
                        <span className="md:hidden text-slate-400 mr-2">Trạng thái:</span>
                        {getStatusDisplay(order.status)}
                      </div>
                      <div className="md:col-span-2 text-slate-400 flex items-center text-xs">
                        <span className="md:hidden text-slate-400 mr-2">Ngày đặt:</span> {new Date(order.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="col-span-2 md:col-span-1 flex justify-end md:justify-end items-center mt-2 md:mt-0">
                        <Link href={`/payment?orderId=${order.id}&amount=${order.totalAmount}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
                          Thanh toán <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[rgba(99,179,255,0.12)] flex justify-between items-center text-sm text-slate-400 bg-[#050c1a]/50">
              <span>Hiển thị {orders.length} đơn hàng</span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg bg-[#0a1628] border border-slate-700 opacity-50 cursor-not-allowed">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="p-1.5 rounded-lg bg-[#0a1628] border border-slate-700 hover:border-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
