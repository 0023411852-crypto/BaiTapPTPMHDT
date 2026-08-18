'use client';
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5154/api/Statistics/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Lỗi khi tải thống kê:', err);
      }
    };
    fetchStats();
  }, []);

  const totalOrders = stats?.totalOrders || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  const totalUsers = stats?.totalUsers || 0;
  const pendingOrders = stats?.ordersByStatus?.find((s: any) => s.status === 'Pending')?.count || 0;
  const topServices = stats?.topServices || [];
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-8 gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
            <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
            <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            <span className="text-gray-900">Tổng quan</span>
          </nav>
          <h2 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h2>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
          <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-purple-500/20 text-purple-300">7 ngày qua</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 transition-colors">30 ngày</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 transition-colors">Tháng này</button>
        </div>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tổng đơn hàng</p>
              <h3 className="text-[32px] font-bold text-gray-900 leading-none mt-2">{totalOrders}</h3>
            </div>
            <div className="p-3 bg-[#2a2456] rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+12.5%</span>
            <span className="text-gray-500 text-xs">so với tuần trước</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tổng doanh thu</p>
              <h3 className="text-[28px] font-bold text-fuchsia-400 leading-none mt-2">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
              </h3>
            </div>
            <div className="p-3 bg-[#2a2456] rounded-lg text-fuchsia-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="payments">payments</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+8.2%</span>
            <span className="text-gray-500 text-xs">so với tháng trước</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tổng khách hàng</p>
              <h3 className="text-[32px] font-bold text-gray-900 leading-none mt-2">{totalUsers}</h3>
            </div>
            <div className="p-3 bg-[#2a2456] rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="person_add">person_add</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+5.4%</span>
            <span className="text-gray-500 text-xs">so với tuần trước</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Đơn chờ xử lý</p>
              <h3 className="text-[32px] font-bold text-red-500 leading-none mt-2 flex items-center gap-3">
                {pendingOrders}
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">Cần chú ý</span>
              </h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="pending_actions">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-gray-500 text-xs">3 đơn hàng quá 24h</span>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Card (70%) */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Đơn hàng theo tháng</h3>
            <button className="text-gray-500 hover:text-blue-600 transition-colors">
              <span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
            </button>
          </div>
          <div className="flex-1 relative min-h-[300px] w-full rounded-lg bg-white overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center opacity-80 mix-blend-screen" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKuUMoNWdNJbNN08kiDCdF7NhBYL9FadIq2JjsSIrnkiE_b_VJ_uV2YF7c8pI88DKy69silphXK7O-ues9yyZ8VGnv7Ue9B80melt_W6FpTemOkWrcv7GcnHPcsq9wvVErWyr47i7PunNR7PMwURezM4RLJqHEEz62kXKQfS_2jd6RUpar2CUn9oJWKtUxZoEEcs6mDMRXKiShQUx7XgvCvpi7nq-0c027TWGH3QwIVPBjprponwpTYw')"}}>
            </div>
          </div>
        </div>

        {/* Popular Services Card (30%) */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top gói dịch vụ</h3>
          </div>
          <div className="space-y-6 flex-1">
            {topServices.map((svc: any, idx: number) => {
              const maxCount = topServices[0]?.orderCount || 1;
              const pct = (svc.orderCount / maxCount) * 100;
              const colors = ['bg-purple-500', 'bg-fuchsia-400', 'bg-indigo-400', 'bg-slate-500'];
              const textColors = ['text-blue-600', 'text-fuchsia-400', 'text-indigo-400', 'text-gray-500'];
              const color = colors[idx % colors.length];
              const tColor = textColors[idx % textColors.length];

              return (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-medium text-gray-900">{svc.serviceName}</span>
                    <span className={`text-sm ${tColor} font-bold`}>{svc.orderCount} đơn</span>
                  </div>
                  <div className="w-full bg-[#2a2456] rounded-full h-2 overflow-hidden">
                    <div className={`${color} h-2 rounded-full`} style={{width: `${pct}%`}}></div>
                  </div>
                </div>
              );
            })}
            {topServices.length === 0 && <p className="text-gray-500 text-sm">Chưa có dữ liệu</p>}
          </div>
        </div>
      </div>

      {/* Bottom Row: Table */}
      <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-purple-300 transition-colors">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Đơn hàng</th>
                <th className="py-4 px-6 font-medium">Gói dịch vụ</th>
                <th className="py-4 px-6 font-medium">Số tiền</th>
                <th className="py-4 px-6 font-medium">Trạng thái</th>
                <th className="py-4 px-6 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[rgba(167,139,250,0.15)]">
              {stats?.recentOrders?.slice(0, 4).map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-[#2a2456] flex-shrink-0 flex items-center justify-center font-bold text-blue-600">
                        {order.userName ? order.userName.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{order.userName || 'Client'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{order.servicePlanName || 'Gói Dịch vụ'}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{(order.totalAmount || 0).toLocaleString()}₫</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      order.status?.toLowerCase() === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      order.status?.toLowerCase() === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      order.status?.toLowerCase() === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-gray-500/10 text-gray-500 border-gray-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-xs font-mono">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))}
              {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">Chưa có đơn hàng nào gần đây</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 pt-6 pb-2 text-center opacity-80 flex flex-col md:flex-row justify-between items-center bg-gray-900/50 p-6 rounded-xl mb-4">
        <p className="text-xs text-gray-400">© 2024 NovaCloud Vietnam. Tất cả quyền được bảo lưu.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a className="text-xs text-gray-400 hover:text-blue-600 transition-colors" href="#">Điều khoản dịch vụ</a>
          <a className="text-xs text-gray-400 hover:text-blue-600 transition-colors" href="#">Chính sách bảo mật</a>
          <a className="text-xs text-gray-400 hover:text-blue-600 transition-colors" href="#">Liên hệ</a>
        </div>
      </footer>
    </>
  );
}

