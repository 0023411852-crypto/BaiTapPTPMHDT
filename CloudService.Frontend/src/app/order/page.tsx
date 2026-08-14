'use client';
import React, { useState } from 'react';

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('vps');
  const [plan, setPlan] = useState('');
  const [cycle, setCycle] = useState('month');

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Đăng ký Dịch vụ</h1>
        <p className="text-xl text-slate-400">Khởi tạo hạ tầng mạnh mẽ cho dự án của bạn chỉ trong vài phút.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#0a1628] rounded-2xl border border-[rgba(99,179,255,0.12)] overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-[rgba(99,179,255,0.12)] bg-[#050c1a]">
          <div className={`flex-1 text-center py-4 text-sm font-semibold border-b-2 transition-colors ${step >= 1 ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500'}`}>
            1. Chọn Dịch vụ
          </div>
          <div className={`flex-1 text-center py-4 text-sm font-semibold border-b-2 transition-colors ${step >= 2 ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500'}`}>
            2. Thông tin cá nhân
          </div>
          <div className={`flex-1 text-center py-4 text-sm font-semibold border-b-2 transition-colors ${step >= 3 ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500'}`}>
            3. Thanh toán
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Services */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Loại dịch vụ */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Loại dịch vụ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['vps', 'hosting', 'domain', 'email'].map((item) => (
                    <button 
                      key={item}
                      onClick={() => setService(item)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-all ${service === item ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {item === 'vps' ? 'Cloud VPS' : item === 'hosting' ? 'Web Hosting' : item === 'domain' ? 'Tên Miền' : 'Email Doanh nghiệp'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chọn cấu hình */}
              {service === 'vps' && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Cấu hình VPS</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'vps-1', name: 'Nova Cloud 1', desc: '1 Core CPU / 1GB RAM / 25GB NVMe', price: '150,000đ' },
                      { id: 'vps-2', name: 'Nova Cloud 2', desc: '2 Core CPU / 2GB RAM / 50GB NVMe', price: '280,000đ' },
                      { id: 'vps-3', name: 'Nova Cloud 3', desc: '4 Core CPU / 4GB RAM / 80GB NVMe', price: '500,000đ' },
                    ].map(p => (
                      <div 
                        key={p.id}
                        onClick={() => setPlan(p.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${plan === p.id ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-800/30 border-slate-700 hover:border-slate-500'}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${plan === p.id ? 'border-blue-500' : 'border-slate-600'}`}>
                            {plan === p.id && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                          </div>
                          <div>
                            <div className={`font-bold ${plan === p.id ? 'text-blue-400' : 'text-white'}`}>{p.name}</div>
                            <div className="text-xs text-slate-400">{p.desc}</div>
                          </div>
                        </div>
                        <div className="font-bold text-white">{p.price} <span className="text-xs text-slate-400 font-normal">/tháng</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chu kỳ thanh toán */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Chu kỳ thanh toán</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'month', label: '1 Tháng', discount: '' },
                    { id: 'quarter', label: '3 Tháng', discount: 'Giảm 5%' },
                    { id: 'half', label: '6 Tháng', discount: 'Giảm 10%' },
                    { id: 'year', label: '12 Tháng', discount: 'Giảm 20%' },
                  ].map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => setCycle(c.id)}
                      className={`relative py-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center ${cycle === c.id ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {c.label}
                      {c.discount && <span className="text-[10px] text-green-400 mt-1">{c.discount}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Information */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold text-white mb-4">Thông tin đăng ký</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Họ và Tên</label>
                  <input type="text" className="w-full bg-[#050c1a] border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Số điện thoại</label>
                  <input type="tel" className="w-full bg-[#050c1a] border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="0901234567" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" className="w-full bg-[#050c1a] border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" placeholder="nguyenvana@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Ghi chú thêm (Không bắt buộc)</label>
                <textarea className="w-full bg-[#050c1a] border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 h-24" placeholder="Yêu cầu đặc biệt..." />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Đăng ký thành công!</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Cảm ơn bạn đã tin tưởng dịch vụ của NovaCloud. Hóa đơn và hướng dẫn thanh toán đã được gửi vào Email của bạn.
              </p>
              
              <div className="bg-[#050c1a] p-6 rounded-xl border border-slate-700 max-w-sm mx-auto text-left">
                <div className="text-sm text-slate-400 mb-2">Mã đơn hàng: <span className="text-white font-mono float-right">#ORD-9021</span></div>
                <div className="text-sm text-slate-400 mb-2">Dịch vụ: <span className="text-white font-medium float-right">Cloud VPS (Nova Cloud 2)</span></div>
                <div className="text-sm text-slate-400 mb-4 border-b border-slate-700 pb-4">Chu kỳ: <span className="text-white font-medium float-right">1 Tháng</span></div>
                <div className="text-base text-slate-300 font-bold">Tổng cộng: <span className="text-blue-400 text-xl float-right">280,000đ</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#050c1a] p-6 border-t border-[rgba(99,179,255,0.12)] flex justify-between">
          {step > 1 && step < 3 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 rounded-lg font-bold text-slate-300 hover:text-white transition-colors"
            >
              Quay lại
            </button>
          ) : <div></div>}
          
          {step < 3 && (
            <button 
              onClick={() => {
                if(step === 1 && !plan && service === 'vps') {
                  alert('Vui lòng chọn cấu hình!');
                  return;
                }
                setStep(step + 1);
              }}
              className="px-6 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors ml-auto"
            >
              {step === 1 ? 'Tiếp tục' : 'Xác nhận Đăng ký'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
