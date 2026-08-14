'use client';
import { useState } from 'react';

export default function Affiliate() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="affiliate" className="relative py-28 px-6 overflow-hidden w-full">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/10">
            CHƯƠNG TRÌNH ĐỐI TÁC
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-amber-500">Kiếm hoa hồng định kỳ lên<br className="hidden md:block"/> đến 40%</span> <span className="text-white">- mãi mãi</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Giới thiệu khách hàng và nhận phần trăm hoa hồng từ tổng doanh thu của họ - mỗi tháng, miễn là họ còn là thành viên. Không giới hạn số tiền. Không có thời hạn.
          </p>
        </div>

        {/* CTA Card */}
        <div
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden max-w-4xl mx-auto transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(10,15,30,0.9) 100%)',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Subtle ambient glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-full opacity-20 pointer-events-none"
            style={{ background: '#3b82f6', filter: 'blur(80px)' }} />

          <div className="relative z-10">
            {!showForm ? (
              <div className="animate-in fade-in zoom-in duration-500">
                <h3 className="text-3xl font-bold text-white mb-4">Sẵn sàng để bắt đầu kiếm tiền?</h3>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
                  Tham gia cùng hơn 4.200 đối tác đang kiếm tiền với NovaCloud. Đăng ký ngay để lấy mã giới thiệu độc quyền (Referral Code).
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="px-8 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
                      boxShadow: '0 0 20px rgba(59,130,246,0.3)',
                    }}
                  >
                    Đăng ký Đối tác (Affiliate)
                  </button>
                  <a
                    href="#"
                    className="px-8 py-3.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-300 bg-slate-900/50 hover:-translate-y-0.5"
                  >
                    Xem Chính sách Hoa hồng
                  </a>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 text-left max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-[rgba(99,179,255,0.1)] pb-4">
                  <h3 className="text-2xl font-bold text-white">Form Đăng Ký Đối Tác</h3>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Đăng ký thành công! Vui lòng kiểm tra email."); setShowForm(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Họ và Tên</label>
                      <input required type="text" className="w-full bg-[#050c1a] border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="VD: Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Số điện thoại</label>
                      <input required type="tel" className="w-full bg-[#050c1a] border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="0901234567" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email liên hệ</label>
                    <input required type="email" className="w-full bg-[#050c1a] border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="nguyenvana@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website / Kênh quảng bá của bạn</label>
                    <input required type="url" className="w-full bg-[#050c1a] border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="https://youtube.com/..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phương thức nhận hoa hồng mong muốn</label>
                    <select className="w-full bg-[#050c1a] border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500">
                      <option>Chuyển khoản Ngân hàng (VNĐ)</option>
                      <option>Cộng vào Số dư tài khoản NovaCloud</option>
                      <option>PayPal (USD)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input required type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-[#050c1a] text-blue-500 focus:ring-blue-500" />
                      <span className="text-sm text-slate-400">Tôi đồng ý với các <a href="#" className="text-blue-400 hover:underline">Điều khoản đối tác</a></span>
                    </label>
                    
                    <button 
                      type="submit"
                      className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 bg-blue-600 hover:bg-blue-500"
                    >
                      Gửi Đăng Ký
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
