'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function AffiliateRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col relative overflow-hidden text-slate-300">
      
      {/* Ambient Grid Overlay & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2.5)', transformOrigin: 'top center' }}></div>
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Minimal Back Action */}
      <div className="absolute top-0 left-0 w-full p-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors duration-200 group">
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-mono text-xs tracking-wider">Trở về Trang chủ</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10 w-full pt-24 pb-20">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Copy & Benefits */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#0f1d35]/80 border border-[rgba(99,179,255,0.12)] px-4 py-2 rounded-full backdrop-blur-md">
                  <span className="material-symbols-outlined text-blue-400 text-sm">rocket_launch</span>
                  <span className="font-mono text-xs text-blue-400 uppercase tracking-wider">Chương trình Đối tác NovaCloud</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                  Hợp tác cùng <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Phát triển</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                  Trở thành cầu nối mang giải pháp hạ tầng điện toán đám mây cao cấp đến khách hàng của bạn. Chúng tôi cung cấp mức hoa hồng cạnh tranh nhất thị trường cùng sự hỗ trợ kỹ thuật tận tâm 24/7.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Benefit Card 1 */}
                <div className="bg-[#0f1d35]/60 border border-[rgba(99,179,255,0.08)] rounded-xl p-6 backdrop-blur-sm hover:bg-[#0f1d35]/90 hover:border-[rgba(99,179,255,0.2)] transition-all group shadow-lg">
                  <div className="mb-4 inline-flex">
                    <div className="bg-cyan-500/10 text-cyan-400 font-mono text-xs px-3 py-1.5 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      30% Hoa hồng
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Thanh toán lần đầu</h3>
                  <p className="text-slate-400 text-sm">Nhận ngay 30% giá trị hợp đồng cho mỗi khách hàng mới đăng ký và thanh toán thành công qua liên kết của bạn.</p>
                </div>
                
                {/* Benefit Card 2 */}
                <div className="bg-[#0f1d35]/60 border border-[rgba(99,179,255,0.08)] rounded-xl p-6 backdrop-blur-sm hover:bg-[#0f1d35]/90 hover:border-[rgba(99,179,255,0.2)] transition-all group shadow-lg">
                  <div className="mb-4 inline-flex">
                    <div className="bg-indigo-500/10 text-indigo-400 font-mono text-xs px-3 py-1.5 rounded-full border border-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">
                      15% Trọn đời
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Gia hạn dịch vụ</h3>
                  <p className="text-slate-400 text-sm">Tiếp tục nhận 15% hoa hồng thụ động cho mọi giao dịch gia hạn tiếp theo của khách hàng đó.</p>
                </div>

                {/* Benefit Card 3 */}
                <div className="bg-[#0f1d35]/60 border border-[rgba(99,179,255,0.08)] rounded-xl p-6 backdrop-blur-sm hover:bg-[#0f1d35]/90 hover:border-[rgba(99,179,255,0.2)] transition-all group shadow-lg md:col-span-2 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0 text-blue-400">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Hệ thống Tracking Minh bạch</h3>
                    <p className="text-slate-400 text-sm">Bảng điều khiển Partner Portal chuyên biệt giúp bạn theo dõi chi tiết lượt click, chuyển đổi và doanh thu theo thời gian thực.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Registration Form & Status Card */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              
              {!isSubmitted ? (
                /* Form Container */
                <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-2xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Top subtle gradient line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white">Bắt đầu ngay</h2>
                    <p className="text-slate-400 text-sm mt-2">Vui lòng cung cấp thông tin để chúng tôi thiết lập tài khoản đối tác cho bạn.</p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    {/* Input: URL */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" htmlFor="promoUrl">
                        Website/Kênh quảng bá chính <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-slate-500 text-lg">link</span>
                        </div>
                        <input 
                          className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 hover:bg-[#0a1628]/80" 
                          id="promoUrl" 
                          placeholder="https://your-website.com" 
                          required 
                          type="url"
                        />
                      </div>
                    </div>
                    
                    {/* Textarea: Method */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1" htmlFor="promoMethod">
                        Phương thức quảng bá dự kiến <span className="text-red-400">*</span>
                      </label>
                      <textarea 
                        className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-slate-600 hover:bg-[#0a1628]/80 resize-none" 
                        id="promoMethod" 
                        placeholder="Mô tả ngắn gọn cách bạn dự định giới thiệu NovaCloud (VD: Viết blog, Review Youtube, Chạy Ads...)" 
                        required 
                        rows={4}
                      ></textarea>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-4">
                      <button 
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-lg py-3.5 transition-all duration-300" 
                        type="submit"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <span className="font-bold text-white text-lg">Gửi đăng ký</span>
                          <span className="material-symbols-outlined text-white text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </div>
                      </button>
                    </div>
                    
                    <p className="text-center text-xs text-slate-500 font-mono mt-4">
                      Bằng việc đăng ký, bạn đồng ý với <a className="text-blue-400 hover:underline" href="#">Chính sách Đối tác</a> của chúng tôi.
                    </p>
                  </form>
                </div>
              ) : (
                /* Status Card */
                <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center h-full flex flex-col justify-center min-h-[440px] animate-in zoom-in-95 duration-500">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                  
                  <div className="flex flex-col items-center space-y-6">
                    {/* Animated Pending Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-75"></div>
                      <div className="w-20 h-20 rounded-full bg-[#0a1628] border border-[rgba(99,179,255,0.2)] flex items-center justify-center relative z-10">
                        <span className="material-symbols-outlined text-blue-400 text-4xl animate-pulse">hourglass_top</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="inline-block bg-[#0a1628]/80 border border-blue-500/20 rounded-full px-4 py-1.5 mb-2">
                        <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">Trạng thái: Đang chờ duyệt</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">Đã nhận yêu cầu</h3>
                      <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
                        Cảm ơn bạn đã đăng ký. Đội ngũ NovaCloud đang xem xét thông tin của bạn và sẽ phản hồi qua email trong vòng 24-48 giờ làm việc.
                      </p>
                    </div>
                    
                    <button 
                      className="mt-8 px-6 py-2.5 rounded-lg border border-[rgba(99,179,255,0.2)] hover:bg-[#0a1628] text-slate-300 hover:text-white transition-colors font-mono text-sm" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Quay lại Form
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
