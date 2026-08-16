'use client';
import React from 'react';

export default function AdminDashboard() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-8 gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            <a href="#" className="hover:text-blue-400 transition-colors">Dashboard</a>
            <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            <span className="text-white">Tổng quan</span>
          </nav>
          <h2 className="text-2xl font-bold text-white">Tổng quan hệ thống</h2>
        </div>
        <div className="flex items-center bg-[#0f1d35] border border-[rgba(99,179,255,0.12)] rounded-lg p-1">
          <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-indigo-500/20 text-indigo-300">7 ngày qua</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-white transition-colors">30 ngày</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-white transition-colors">Tháng này</button>
        </div>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tổng đơn hàng</p>
              <h3 className="text-[32px] font-bold text-white leading-none mt-2">1,284</h3>
            </div>
            <div className="p-3 bg-[#1a2c47] rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+12.5%</span>
            <span className="text-slate-400 text-xs">so với tuần trước</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Doanh thu tháng này</p>
              <h3 className="text-[28px] font-bold text-cyan-400 leading-none mt-2">425.0M₫</h3>
            </div>
            <div className="p-3 bg-[#1a2c47] rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="payments">payments</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+8.2%</span>
            <span className="text-slate-400 text-xs">so với tháng trước</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Khách hàng mới</p>
              <h3 className="text-[32px] font-bold text-white leading-none mt-2">156</h3>
            </div>
            <div className="p-3 bg-[#1a2c47] rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="person_add">person_add</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="material-symbols-outlined text-sm text-green-400" data-icon="trending_up">trending_up</span>
            <span className="text-green-400 font-medium text-sm">+5.4%</span>
            <span className="text-slate-400 text-xs">so với tuần trước</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Đơn chờ xử lý</p>
              <h3 className="text-[32px] font-bold text-red-500 leading-none mt-2 flex items-center gap-3">
                18
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">Cần chú ý</span>
              </h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" data-icon="pending_actions">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-slate-400 text-xs">3 đơn hàng quá 24h</span>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Card (70%) */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Đơn hàng theo tháng</h3>
            <button className="text-slate-400 hover:text-blue-400 transition-colors">
              <span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
            </button>
          </div>
          <div className="flex-1 relative min-h-[300px] w-full rounded-lg bg-[#0f1d35]/50 overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center opacity-80 mix-blend-screen" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKuUMoNWdNJbNN08kiDCdF7NhBYL9FadIq2JjsSIrnkiE_b_VJ_uV2YF7c8pI88DKy69silphXK7O-ues9yyZ8VGnv7Ue9B80melt_W6FpTemOkWrcv7GcnHPcsq9wvVErWyr47i7PunNR7PMwURezM4RLJqHEEz62kXKQfS_2jd6RUpar2CUn9oJWKtUxZoEEcs6mDMRXKiShQUx7XgvCvpi7nq-0c027TWGH3QwIVPBjprponwpTYw')"}}>
            </div>
          </div>
        </div>

        {/* Popular Services Card (30%) */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Top gói dịch vụ</h3>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-white">Nova Pro</span>
                <span className="text-sm text-blue-400 font-bold">45%</span>
              </div>
              <div className="w-full bg-[#1a2c47] rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-white">Nova Compute C1</span>
                <span className="text-sm text-cyan-400 font-bold">30%</span>
              </div>
              <div className="w-full bg-[#1a2c47] rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-400 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-white">Nova Storage S1</span>
                <span className="text-sm text-indigo-400 font-bold">15%</span>
              </div>
              <div className="w-full bg-[#1a2c47] rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-400 h-2 rounded-full" style={{width: '15%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-slate-400">Khác</span>
                <span className="text-sm text-slate-400">10%</span>
              </div>
              <div className="w-full bg-[#1a2c47] rounded-full h-2 overflow-hidden">
                <div className="bg-slate-500 h-2 rounded-full" style={{width: '10%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Table */}
      <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="p-6 border-b border-[rgba(99,179,255,0.12)] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Hoạt động gần đây</h3>
          <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(99,179,255,0.12)] bg-[#0f1d35]/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Khách hàng</th>
                <th className="py-4 px-6 font-medium">Gói dịch vụ</th>
                <th className="py-4 px-6 font-medium">Số tiền</th>
                <th className="py-4 px-6 font-medium">Trạng thái</th>
                <th className="py-4 px-6 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[rgba(99,179,255,0.12)]">
              <tr className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#1a2c47] flex-shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0fp0wH7N3hy_k6tzGyNhcUXedw0tLirgwHcENMzQWq7FptSeLIElgVIzjHCTs1Wp9iaWZmDeTMbAAYmQKe0Mch3dinLpQQF6F8fINzlgyRCFezewNe0cVZ2pbCIfBnIqEF2mFikoTyeXxOCiV9ktkSpfQGl-1qK292P8x7M87Zq2eJ6xzcYAr-A3D0JmiLyQ2Aqrc349LOtvrvnUDQ_jdxQrd7B3acwFExkZ86FGpYMrrzlyjN6lEyw" alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-white group-hover:text-blue-400 transition-colors">Công ty TNHH ABC</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400">Nova Pro 12T</td>
                <td className="py-4 px-6 font-medium text-white">12.500.000₫</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">Hoàn tất</span>
                </td>
                <td className="py-4 px-6 text-slate-400 text-xs font-mono">10/10/2023</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#1a2c47] flex-shrink-0 flex items-center justify-center font-bold text-blue-400">NT</div>
                    <span className="font-medium text-white group-hover:text-blue-400 transition-colors">Nguyễn Văn Tech</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400">Compute C2</td>
                <td className="py-4 px-6 font-medium text-white">4.200.000₫</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 gap-1">
                    <span className="material-symbols-outlined text-[12px]" data-icon="sync">sync</span>
                    Đang xử lý
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-400 text-xs font-mono">09/10/2023</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#1a2c47] flex-shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcFQYBXjDZHthTyXcQJM2HoM63XB_erpG9WZ02nlon4YF8Fqhs0soRw46RWXZ9yEwy2kORQgCmsXe62VxgEmzeMQeNkNYKROrZmXaVmK0eE4l021culmy5CtjOH-s-saSgTYywZNH-wlO-zWJt2Ff5-jfNpcnZyeUJMYrPiuHgL1TorYr7iTF7qRCkL_vr2fiwvCTnTjFoDthYlyOZep75G0diCP1ZSOHsuTFkRq3njQuiEIGyOxlvyg" alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-white group-hover:text-blue-400 transition-colors">Global Solutions JSC</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400">Storage S3 1TB</td>
                <td className="py-4 px-6 font-medium text-white">1.800.000₫</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">Hoàn tất</span>
                </td>
                <td className="py-4 px-6 text-slate-400 text-xs font-mono">09/10/2023</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#1a2c47] flex-shrink-0 flex items-center justify-center font-bold text-cyan-400">MK</div>
                    <span className="font-medium text-white group-hover:text-blue-400 transition-colors">Trần Minh Khang</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400">Nova Pro 1T</td>
                <td className="py-4 px-6 font-medium text-white">1.200.000₫</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">Đã hủy</span>
                </td>
                <td className="py-4 px-6 text-slate-400 text-xs font-mono">08/10/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-[rgba(99,179,255,0.12)] pt-6 pb-2 text-center opacity-80 flex flex-col md:flex-row justify-between items-center bg-[#070e1e] p-6 rounded-xl mb-4">
        <p className="text-xs text-slate-500">© 2024 NovaCloud Vietnam. Tất cả quyền được bảo lưu.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a className="text-xs text-slate-500 hover:text-cyan-400 transition-colors" href="#">Điều khoản dịch vụ</a>
          <a className="text-xs text-slate-500 hover:text-cyan-400 transition-colors" href="#">Chính sách bảo mật</a>
          <a className="text-xs text-slate-500 hover:text-cyan-400 transition-colors" href="#">Liên hệ</a>
        </div>
      </footer>
    </>
  );
}
