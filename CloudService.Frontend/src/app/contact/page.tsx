'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactOrderPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    billingCycle: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: `Đăng ký dịch vụ: ${formData.service}`,
        message: `Chu kỳ thanh toán: ${formData.billingCycle} tháng\nYêu cầu thêm: ${formData.message}`
      };

      const res = await fetch('http://localhost:5154/api/Contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ fullName: '', phone: '', email: '', service: '', billingCycle: '1', message: '' });
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
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
      <div className="min-h-screen bg-background flex flex-col pt-24 pb-20 text-on-surface">
        <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-12 text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-container mb-4 tracking-tight">Liên hệ & Đặt dịch vụ</h1>
            <p className="text-lg text-on-surface-variant">
              Điền thông tin vào biểu mẫu dưới đây để bắt đầu trải nghiệm hạ tầng Cloud cao cấp của Nimbus. Chuyên viên của chúng tôi sẽ liên hệ lại trong vòng 15 phút.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left side: Contact Info */}
            <div className="lg:col-span-4 space-y-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-surface-container-lowest border border-border-subtle rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-primary-container mb-6 border-b border-border-subtle pb-4">Thông tin hỗ trợ</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-container">call</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary-container">Hotline Doanh nghiệp</p>
                      <p className="text-on-surface-variant mt-1 text-sm">1800 1234 (Miễn phí)</p>
                      <p className="text-outline text-xs mt-1">Hỗ trợ kỹ thuật 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-container">mail</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary-container">Email CSKH</p>
                      <p className="text-on-surface-variant mt-1 text-sm">support@nimbuscloud.vn</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-container">location_on</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary-container">Trụ sở chính</p>
                      <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">
                        Tầng 15, Tòa nhà TechTower,<br/>
                        Quận 1, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Order Form */}
            <div className="lg:col-span-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {!isSubmitted ? (
                <div className="bg-surface-container-lowest border border-border-subtle rounded-2xl p-8 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-secondary-container"></div>
                  <h3 className="text-2xl font-bold text-primary-container mb-6">Đăng ký dịch vụ</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface-variant">Họ và tên <span className="text-status-error">*</span></label>
                        <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none" placeholder="Nhập họ và tên" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface-variant">Số điện thoại <span className="text-status-error">*</span></label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none" placeholder="Nhập số điện thoại" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-on-surface-variant">Email liên hệ <span className="text-status-error">*</span></label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none" placeholder="email@company.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface-variant">Chọn Dịch vụ <span className="text-status-error">*</span></label>
                        <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none appearance-none">
                          <option value="">-- Chọn dịch vụ --</option>
                          <option value="vps">Cloud VPS</option>
                          <option value="hosting">Web Hosting</option>
                          <option value="server">Dedicated Server</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface-variant">Chu kỳ thanh toán <span className="text-status-error">*</span></label>
                        <select required value={formData.billingCycle} onChange={e => setFormData({...formData, billingCycle: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none appearance-none">
                          <option value="1">1 Tháng</option>
                          <option value="3">3 Tháng (Giảm 5%)</option>
                          <option value="6">6 Tháng (Giảm 10%)</option>
                          <option value="12">12 Tháng (Giảm 20%)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-on-surface-variant">Yêu cầu thêm (Tùy chọn)</label>
                      <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-secondary-container focus:ring-1 focus:ring-secondary-container transition-all outline-none resize-none" placeholder="Ghi chú thêm về cấu hình, hệ điều hành mong muốn..."></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary-container hover:bg-primary text-on-primary font-bold text-lg rounded-lg py-4 transition-colors duration-300 shadow-sm flex justify-center items-center gap-2 group disabled:opacity-50">
                      {isSubmitting ? 'Đang Gửi...' : 'Gửi Yêu Cầu'}
                      {!isSubmitting && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">send</span>}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-surface-container-lowest border border-border-subtle rounded-2xl p-12 shadow-md text-center">
                  <div className="w-20 h-20 bg-status-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-status-success text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-container mb-4">Gửi yêu cầu thành công!</h3>
                  <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
                    Cảm ơn bạn đã tin tưởng chọn NimbusCloud. Chuyên viên tư vấn của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để hoàn tất đăng ký dịch vụ.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="px-6 py-2.5 border border-border-subtle rounded-lg text-primary-container font-bold hover:bg-surface-container transition-colors">
                    Gửi yêu cầu khác
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
