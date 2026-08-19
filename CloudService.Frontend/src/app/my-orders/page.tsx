'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { fetchWithAuth, API_BASE_URL } from '@/utils/api';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const demoRole = localStorage.getItem('demo_role');
        if (!token && !demoRole) {
          window.location.replace('/');
          return;
        }

        // Demo account: Hiển thị giỏ hàng trống hoặc mock
        if (!token && demoRole) {
          setOrders([]);
          setIsLoading(false);
          return;
        }

        const res = await fetchWithAuth(`${API_BASE_URL}/api/Orders/my-orders?PageNumber=1&PageSize=10`);

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

  const getStatusDisplay = (statusValue: any) => {
    // Map integer status to string if needed
    let status = String(statusValue).toLowerCase();
    
    // Status mapping (0 = Pending, 1 = Processing, 2 = Completed, 3 = Cancelled)
    if (status === '0') status = 'pending';
    if (status === '1') status = 'processing';
    if (status === '2') status = 'completed';
    if (status === '3') status = 'cancelled';

    switch (status) {
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
            Chờ thanh toán
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-bold uppercase tracking-widest">
            {statusValue}
          </span>
        );
    }
  };

  if (isLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center text-gray-500">Đang tải lịch sử đơn hàng...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 pt-24 pb-20 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Đơn hàng của tôi</h1>
              <p className="text-gray-500">Quản lý lịch sử giao dịch và dịch vụ của bạn.</p>
            </header>

            {/* Data View */}
            <div className="w-full">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-500 tracking-wider uppercase">
                  <div className="col-span-4">Gói dịch vụ (Mã Đơn)</div>
                  <div className="col-span-2 text-right">Số tiền</div>
                  <div className="col-span-3 text-center">Trạng thái</div>
                  <div className="col-span-2">Ngày đặt</div>
                  <div className="col-span-1 text-right">Thao tác</div>
                </div>

                {/* Table Body */}
                <div className="flex flex-col gap-0">
                  {orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">Bạn chưa có đơn hàng nào.</div>
                  ) : (
                    orders.map((order, index) => (
                      <div key={order.id || index} className="group border-b border-gray-100 hover:bg-blue-50/30 p-4 md:px-6 md:py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-all last:border-0">
                        <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">dns</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-900 font-bold group-hover:text-blue-600 transition-colors">{order.servicePlanName || 'Dịch vụ NovaCloud'}</div>
                            <div className="text-xs font-mono text-gray-400 mt-0.5">{order.id?.substring(0, 8).toUpperCase() || `ORD-${index+1}`}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:contents gap-2 text-sm md:text-base">
                          <div className="md:col-span-2 md:text-right text-gray-900 font-mono font-semibold flex items-center md:justify-end">
                            <span className="md:hidden text-gray-400 mr-2">Số tiền:</span> {order.totalAmount ? order.totalAmount.toLocaleString() : 0}₫
                          </div>
                          <div className="md:col-span-3 flex justify-start md:justify-center items-center">
                            <span className="md:hidden text-gray-400 mr-2">Trạng thái:</span>
                            {getStatusDisplay(order.status)}
                          </div>
                          <div className="md:col-span-2 text-gray-500 flex items-center text-xs font-medium">
                            <span className="md:hidden text-gray-400 mr-2">Ngày đặt:</span> {new Date(order.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                          </div>
                          <div className="col-span-2 md:col-span-1 flex justify-end md:justify-end items-center mt-2 md:mt-0 gap-3">
                            {(String(order.status).toLowerCase() === 'pending' || String(order.status) === '0') ? (
                              <Link href={`/payment?orderId=${order.id}&amount=${order.totalAmount}`} className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1">
                                Thanh toán
                              </Link>
                            ) : (
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                              >
                                Xem <span className="material-symbols-outlined text-[16px]">visibility</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
                  <span>Hiển thị {orders.length} đơn hàng</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 opacity-50 cursor-not-allowed text-gray-400">
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết đơn hàng</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Mã đơn hàng</div>
                  <div className="font-mono text-gray-900 font-medium">{selectedOrder.id?.toUpperCase() || 'N/A'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Trạng thái</div>
                  {getStatusDisplay(selectedOrder.status)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Dịch vụ đã đặt</div>
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">dns</span>
                  {selectedOrder.servicePlanName || 'Gói Dịch vụ NovaCloud'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Ngày đăng ký</div>
                  <div className="text-gray-900 font-medium">
                    {new Date(selectedOrder.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Tổng thanh toán</div>
                  <div className="text-xl font-bold text-blue-600">
                    {selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString() : 0}₫
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
