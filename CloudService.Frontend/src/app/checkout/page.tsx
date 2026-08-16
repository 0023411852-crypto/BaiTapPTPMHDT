'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const billing = searchParams.get('billing') || 'monthly';
  
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // 1. Auth check
    const token = localStorage.getItem('token');
    const demoRole = localStorage.getItem('demo_role');
    
    if (!token && !demoRole) {
      // Chưa đăng nhập -> đá về Login kèm tham số redirect
      const currentUrl = encodeURIComponent(`/checkout?planId=${planId}&billing=${billing}`);
      router.push(`/login?redirect=${currentUrl}`);
      return;
    }

    // 2. Fetch plan details
    const fetchPlan = async () => {
      try {
        const res = await fetch(`http://localhost:5154/api/ServicePlans`);
        const data = await res.json();
        if (res.ok && data.data) {
          const selectedPlan = data.data.find((p: any) => p.id === Number(planId));
          if (selectedPlan) {
            setPlan(selectedPlan);
          }
        }
      } catch (e) {
        console.error('Lỗi khi fetch gói cước:', e);
      } finally {
        setIsLoading(false);
      }
    };

    if (planId) {
      fetchPlan();
    } else {
      setIsLoading(false);
    }
  }, [planId, billing, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white">Đang tải giỏ hàng...</div>;
  if (!plan) return <div className="min-h-screen flex items-center justify-center text-white">Không tìm thấy gói dịch vụ. Vui lòng quay lại bảng giá.</div>;

  // Mock price logic since backend might not have pricing logic directly on ServicePlan model
  const price = billing === 'monthly' ? 29 : 23 * 12; // Placeholder

  const handleCreateOrder = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Vui lòng đăng nhập lại.');

      // Yêu cầu của Backend DTO (CreateOrderDto):
      // - ServicePlanId (Guid)
      // - PlanPriceId (Guid)
      // - PromotionId (Guid?)
      // - CustomerNotes (string?)
      // Do Backend (/api/ServicePlans) hiện không trả về PlanPriceId,
      // Frontend tạm thời truyền một GUID ngẫu nhiên hoặc planId để pass validate,
      // nếu backend báo lỗi "Plan Price not found" thì sẽ hiển thị thông báo.
      const payload = {
        ServicePlanId: plan.id,
        PlanPriceId: '11111111-1111-1111-1111-111111111111', // GUID giả vì API thiếu dữ liệu
        CustomerNotes: notes
      };

      const res = await fetch('http://localhost:5154/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.data && data.data.id) {
        // Có orderId thực tế từ backend
        router.push(`/payment?orderId=${data.data.id}&amount=${data.data.totalAmount || price}`);
      } else {
        throw new Error(data.message || 'Lỗi khi tạo đơn hàng.');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Lỗi không xác định.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Tóm tắt đơn hàng */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-lg text-slate-400">Kiểm tra lại thông tin đơn hàng của bạn trước khi thanh toán.</p>
          </div>

          <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-8 flex flex-col gap-6 h-full relative overflow-hidden shadow-2xl">
            {/* Subtle Gradient Depth Marker */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-3 border-b border-[rgba(99,179,255,0.12)] pb-4 relative z-10">
              <span className="material-symbols-outlined text-blue-400 text-3xl">shopping_cart</span>
              <h2 className="text-2xl font-bold text-white">Tóm tắt đơn hàng</h2>
            </div>
            
            <div className="flex-grow flex flex-col gap-6 relative z-10">
              {/* Plan Details */}
              <div className="bg-[#0a1628]/50 rounded-lg p-5 border border-[rgba(99,179,255,0.12)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-white">{plan.name}</span>
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">High Performance</span>
                </div>
                <ul className="text-slate-400 space-y-2">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px]">memory</span> {plan.specifications || 'Cấu hình mặc định'}</li>
                </ul>
              </div>
              
              {/* Pricing Breakdown */}
              <div className="space-y-4 text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Chu kỳ thanh toán</span>
                  <span className="text-white font-medium">{billing === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Đơn giá</span>
                  <span className="text-white font-medium">${price}</span>
                </div>
                <div className="flex justify-between items-center text-green-400">
                  <span>Khuyến mãi (15%)</span>
                  <span className="font-medium">-51.000 VND</span>
                </div>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t border-[rgba(99,179,255,0.12)] pt-6 mt-auto relative z-10 flex justify-between items-end">
              <span className="text-xl text-slate-400 font-medium">Tổng cộng</span>
              <div className="text-right">
                <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 leading-none">{price}</span>
                <span className="text-xl text-slate-400 ml-2">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes & Action */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 mt-[92px]">
          <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-xl p-8 flex flex-col gap-6 h-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="flex flex-col gap-3 relative z-10">
              <label className="text-lg font-bold text-white flex items-center gap-2" htmlFor="order-notes">
                <span className="material-symbols-outlined text-blue-400">edit_note</span> Ghi chú đơn hàng 
                <span className="text-sm font-normal text-slate-500">(Tùy chọn)</span>
              </label>
              <textarea 
                className="w-full bg-[#0a1628]/50 border border-[rgba(99,179,255,0.12)] rounded-lg p-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors resize-none h-32" 
                id="order-notes" 
                placeholder="Yêu cầu cấu hình đặc biệt..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm relative z-10">
                {errorMsg}
                <div className="text-xs mt-1 text-slate-400">
                  *Ghi chú: Frontend truyền thiếu PlanPriceId do API ServicePlans không cung cấp.
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-6 relative z-10">
              <button 
                onClick={handleCreateOrder}
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-slate-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:-translate-y-1'} shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-lg py-4 px-6 flex items-center justify-center gap-2 text-white text-lg font-bold transition-all group`}
              >
                {isSubmitting ? 'Đang tạo đơn...' : 'Xác nhận đặt hàng'}
                {!isSubmitting && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>}
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 px-4">
                Bằng việc xác nhận, bạn đồng ý với <a href="#" className="text-blue-400 hover:underline">Điều khoản Dịch vụ</a> của NovaCloud.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Đang tải...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
