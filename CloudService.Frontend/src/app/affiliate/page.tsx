'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AffiliateRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [existingApp, setExistingApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ websiteUrl: '', promotionalMethods: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMyApp = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5154/api/AffiliateApplications/my-application', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setExistingApp(data);
          setIsSubmitted(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyApp();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (existingApp) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5154/api/AffiliateApplications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          websiteUrl: formData.websiteUrl,
          promotionalMethods: formData.promotionalMethods
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ websiteUrl: '', promotionalMethods: '' });
        // Optionally fetch again to get the saved app
        const savedData = await res.json().catch(() => ({}));
        setExistingApp(savedData);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden text-on-surface">
      
      {/* Minimal Back Action (removed since we have Navbar now, or kept as breadcrumb) */}
      <div className="absolute top-0 left-0 w-full p-6 z-40 hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary-container transition-colors duration-200 group">
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-mono text-xs tracking-wider uppercase font-medium">Trở về Trang chủ</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10 w-full pt-24 pb-20">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Copy & Benefits */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-surface-container-high border border-border-subtle px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-secondary-container text-sm">rocket_launch</span>
                  <span className="font-mono text-xs text-secondary-container uppercase font-bold tracking-wider">Chương trình Đối tác NimbusCloud</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-primary-container tracking-tight leading-tight">
                  Hợp tác cùng <br />
                  <span className="text-secondary-container">Phát triển</span>
                </h1>
                <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Trở thành cầu nối mang giải pháp hạ tầng điện toán đám mây cao cấp đến khách hàng của bạn. Chúng tôi cung cấp mức hoa hồng cạnh tranh nhất thị trường cùng sự hỗ trợ kỹ thuật tận tâm 24/7.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Benefit Card 1 */}
                <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-6 hover:shadow-lg transition-all group">
                  <div className="mb-4 inline-flex">
                    <div className="bg-secondary-container/10 text-secondary-container font-mono text-xs font-bold px-3 py-1.5 rounded-full border border-secondary-container/20 group-hover:border-secondary-container/50 transition-colors">
                      30% Hoa hồng
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-container mb-2">Thanh toán lần đầu</h3>
                  <p className="text-on-surface-variant text-sm">Nhận ngay 30% giá trị hợp đồng cho mỗi khách hàng mới đăng ký và thanh toán thành công qua liên kết của bạn.</p>
                </div>
                
                {/* Benefit Card 2 */}
                <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-6 hover:shadow-lg transition-all group">
                  <div className="mb-4 inline-flex">
                    <div className="bg-primary-container/10 text-primary-container font-mono text-xs font-bold px-3 py-1.5 rounded-full border border-primary-container/20 group-hover:border-primary-container/50 transition-colors">
                      15% Trọn đời
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-container mb-2">Gia hạn dịch vụ</h3>
                  <p className="text-on-surface-variant text-sm">Tiếp tục nhận 15% hoa hồng thụ động cho mọi giao dịch gia hạn tiếp theo của khách hàng đó.</p>
                </div>

                {/* Benefit Card 3 */}
                <div className="bg-surface-container-lowest border border-border-subtle rounded-xl p-6 hover:shadow-lg transition-all group md:col-span-2 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center border border-secondary-container/20 shrink-0 text-secondary-container">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-container mb-1">Hệ thống Tracking Minh bạch</h3>
                    <p className="text-on-surface-variant text-sm">Bảng điều khiển Partner Portal chuyên biệt giúp bạn theo dõi chi tiết lượt click, chuyển đổi và doanh thu theo thời gian thực.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Registration Form & Status Card */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              
              {!isSubmitted ? (
                /* Form Container */
                <div className="bg-surface-container-lowest border border-border-subtle rounded-2xl p-8 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Top subtle line */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary-container"></div>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary-container">Bắt đầu ngay</h2>
                    <p className="text-on-surface-variant text-sm mt-2">Vui lòng cung cấp thông tin để chúng tôi thiết lập tài khoản đối tác cho bạn.</p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    {/* Input: URL */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="promoUrl">
                        Website/Kênh quảng bá chính <span className="text-status-error">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-outline text-lg">link</span>
                        </div>
                        <input 
                          value={formData.websiteUrl}
                          onChange={e => setFormData({...formData, websiteUrl: e.target.value})}
                          className="w-full bg-surface-container border border-border-subtle rounded-lg pl-10 pr-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none placeholder:text-outline-variant hover:bg-surface-container-high" 
                          id="promoUrl" 
                          placeholder="https://your-website.com" 
                          required 
                          type="url"
                        />
                      </div>
                    </div>
                    
                    {/* Textarea: Method */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1" htmlFor="promoMethod">
                        Phương thức quảng bá dự kiến <span className="text-status-error">*</span>
                      </label>
                      <textarea 
                        value={formData.promotionalMethods}
                        onChange={e => setFormData({...formData, promotionalMethods: e.target.value})}
                        className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none placeholder:text-outline-variant hover:bg-surface-container-high resize-none" 
                        id="promoMethod" 
                        placeholder="Mô tả ngắn gọn cách bạn dự định giới thiệu NimbusCloud (VD: Viết blog, Review Youtube, Chạy Ads...)" 
                        required 
                        rows={4}
                      ></textarea>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-4">
                      <button 
                        className="w-full relative group overflow-hidden bg-primary-container hover:bg-primary text-on-primary rounded-lg py-3.5 transition-colors duration-300 shadow-sm disabled:opacity-50" 
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <span className="font-bold text-lg">{isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}</span>
                          {!isSubmitting && <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>}
                        </div>
                      </button>
                    </div>
                    
                    <p className="text-center text-xs text-outline font-mono mt-4">
                      Bằng việc đăng ký, bạn đồng ý với <a className="text-secondary-container hover:underline" href="#">Chính sách Đối tác</a> của chúng tôi.
                    </p>
                  </form>
                </div>
              ) : (
                /* Status Card */
                <div className="bg-surface-container-lowest border border-border-subtle rounded-2xl p-8 shadow-xl relative overflow-hidden text-center h-full flex flex-col justify-center min-h-[440px] animate-in zoom-in-95 duration-500">
                  <div className={`absolute top-0 left-0 w-full h-[3px] ${existingApp?.status === 1 ? 'bg-status-success' : existingApp?.status === 2 ? 'bg-status-error' : 'bg-status-warning'}`}></div>
                  
                  <div className="flex flex-col items-center space-y-6">
                    {/* Animated Pending Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-secondary-container/20 animate-ping opacity-75"></div>
                      <div className="w-20 h-20 rounded-full bg-surface-container border border-secondary-container/20 flex items-center justify-center relative z-10">
                        <span className="material-symbols-outlined text-secondary-container text-4xl animate-pulse">
                          {existingApp?.status === 1 ? 'check_circle' : existingApp?.status === 2 ? 'cancel' : 'hourglass_top'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="inline-block bg-surface-container border border-secondary-container/20 rounded-full px-4 py-1.5 mb-2">
                        <span className="font-mono text-xs font-bold text-secondary-container uppercase tracking-widest">
                          Trạng thái: {existingApp?.status === 1 ? 'Đã duyệt' : existingApp?.status === 2 ? 'Đã từ chối' : 'Đang chờ duyệt'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-primary-container">
                        {existingApp?.status === 1 ? 'Chúc mừng bạn!' : existingApp?.status === 2 ? 'Rất tiếc!' : 'Đã nhận yêu cầu'}
                      </h3>
                      <p className="text-on-surface-variant max-w-sm mx-auto text-sm leading-relaxed">
                        {existingApp?.status === 1 ? 'Đơn đăng ký của bạn đã được duyệt. Hãy bắt đầu quảng bá ngay!' : 
                         existingApp?.status === 2 ? 'Đơn đăng ký của bạn không phù hợp với tiêu chí hiện tại của chúng tôi.' : 
                         'Cảm ơn bạn đã đăng ký. Đội ngũ NimbusCloud đang xem xét thông tin của bạn và sẽ phản hồi qua email trong vòng 24-48 giờ làm việc.'}
                      </p>
                    </div>
                    
                    {!existingApp && (
                      <button 
                        className="mt-8 px-6 py-2.5 rounded-lg border border-border-subtle hover:bg-surface-container text-on-surface-variant hover:text-primary-container transition-colors font-mono text-sm font-bold" 
                        onClick={() => setIsSubmitted(false)}
                      >
                        Quay lại Form
                      </button>
                    )}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
