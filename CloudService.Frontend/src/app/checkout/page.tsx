'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWithAuth, API_BASE_URL } from '@/utils/api';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const priceId = searchParams.get('priceId');
  const billing = searchParams.get('billing') || 'monthly';
  
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notes, setNotes] = useState('');

  // Nếu Frontend truyền rỗng priceId do API chưa cấp, hiển thị lỗi ngay.
  useEffect(() => {
    if (!priceId) {
      setErrorMsg('Lỗi nghiêm trọng: Backend chưa cung cấp PlanPriceId qua API ServicePlans. Đơn hàng không thể tạo vì thiếu dữ liệu bắt buộc (PlanPriceId).');
    }
  }, [priceId]);

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
        const res = await fetch(`${API_BASE_URL}/api/ServicePlans`);
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

  if (isLoading) return <div className="min-h-[70vh] flex items-center justify-center text-gray-500">Đang tải giỏ hàng...</div>;
  if (!plan) return <div className="min-h-[70vh] flex items-center justify-center text-gray-500">Không tìm thấy gói dịch vụ. Vui lòng quay lại bảng giá.</div>;

  // Fallback do Backend chưa cấp giá
  const price = plan?.monthlyPrice || plan?.annualPrice || 0; 
  const isReady = !!priceId;

  const handleCreateOrder = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      if (!priceId) {
        throw new Error('Thiếu PlanPriceId. Không thể gửi request tới Backend.');
      }

      const payload = {
        ServicePlanId: plan.id,
        PlanPriceId: priceId,
        CustomerNotes: notes
      };

      const res = await fetchWithAuth(`${API_BASE_URL}/api/Orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Tóm tắt đơn hàng */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="mb-4 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Checkout</h1>
                <p className="text-gray-500">Kiểm tra lại thông tin đơn hàng của bạn trước khi thanh toán.</p>
              </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-6 h-full relative overflow-hidden shadow-lg">
            {/* Subtle Gradient Depth Marker */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 relative z-10">
              <span className="material-symbols-outlined text-blue-500 text-3xl">shopping_cart</span>
              <h2 className="text-2xl font-bold text-gray-900">Tóm tắt đơn hàng</h2>
            </div>
            
            <div className="flex-grow flex flex-col gap-6 relative z-10">
              {/* Plan Details */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">{plan.name}</span>
                  <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200">High Performance</span>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center gap-3 font-medium"><span className="material-symbols-outlined text-[18px]">memory</span> {plan.specifications || 'Cấu hình mặc định'}</li>
                </ul>
              </div>
              
              {/* Pricing Breakdown */}
              <div className="space-y-4 text-gray-600 font-medium">
                <div className="flex justify-between items-center">
                  <span>Chu kỳ thanh toán</span>
                  <span className="text-gray-900">{billing === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Đơn giá</span>
                  <span className="text-gray-900 font-bold">{price === 0 ? <span className="text-red-500 text-xs">Chưa có giá</span> : `$${price}`}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Khuyến mãi</span>
                  <span className="font-bold">Chưa áp dụng</span>
                </div>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t border-gray-200 pt-6 mt-auto relative z-10 flex justify-between items-end">
              <span className="text-xl text-gray-600 font-bold">Tổng cộng</span>
              <div className="text-right">
                <span className="text-4xl md:text-5xl font-extrabold text-blue-600 leading-none">${price}</span>
                <span className="text-xl text-gray-500 ml-2 font-medium">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes & Action */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 mt-[88px]">
          <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-6 h-full shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="flex flex-col gap-3 relative z-10">
              <label className="text-lg font-bold text-gray-900 flex items-center gap-2" htmlFor="order-notes">
                <span className="material-symbols-outlined text-blue-500">edit_note</span> Ghi chú đơn hàng 
                <span className="text-sm font-normal text-gray-400">(Tùy chọn)</span>
              </label>
              <textarea 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors resize-none h-32" 
                id="order-notes" 
                placeholder="Yêu cầu cấu hình đặc biệt..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm relative z-10 font-medium">
                {errorMsg}
              </div>
            )}
            
            <div className="mt-auto pt-6 relative z-10">
              <button 
                onClick={handleCreateOrder}
                disabled={isSubmitting || !isReady}
                className={`w-full ${(isSubmitting || !isReady) ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 text-white shadow-[0_4px_14px_rgba(37,99,235,0.39)]'} rounded-lg py-4 px-6 flex items-center justify-center gap-2 text-lg font-bold transition-all group`}
              >
                {isSubmitting ? 'Đang tạo đơn...' : 'Xác nhận đặt hàng'}
                {!isSubmitting && isReady && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 px-4 font-medium">
                Bằng việc xác nhận, bạn đồng ý với <a href="#" className="text-blue-600 hover:underline">Điều khoản Dịch vụ</a> của NovaCloud.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-gray-500">Đang tải...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
