'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentContent() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amountParam = searchParams.get('amount');
  const amount = amountParam ? parseFloat(amountParam) : 0;
  
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const demoRole = localStorage.getItem('demo_role');
    if (!token && !demoRole) {
      router.push('/login');
    }
    
    // Nếu không có orderId, đẩy về my-orders hoặc trang chủ
    if (!orderId) {
      router.push('/my-orders');
    }
  }, [router, orderId]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleMockPayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      router.push('/my-orders');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Background Lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md mt-16">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-blue-400 text-3xl">cloud</span>
            NovaCloud
          </h1>
          <p className="text-slate-400">Thanh toán hóa đơn dịch vụ</p>
        </div>

        {/* Payment Card */}
        <div className="bg-[#0f1d35]/80 backdrop-blur-xl border border-[rgba(99,179,255,0.12)] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          
          {/* Payment Methods */}
          <div className="flex justify-center gap-6 mb-6 w-full border-b border-[rgba(99,179,255,0.12)] pb-6">
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[#0a1628]/80 flex items-center justify-center border border-pink-500/50 group-hover:border-pink-400 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <span className="material-symbols-outlined text-pink-500">account_balance_wallet</span>
              </div>
              <span className="text-xs font-mono text-pink-400 font-bold">MoMo</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-[#0a1628]/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-400 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-400">qr_code_scanner</span>
              </div>
              <span className="text-xs font-mono text-slate-400 group-hover:text-blue-400">ZaloPay</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-[#0a1628]/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-400 transition-colors">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-400">account_balance</span>
              </div>
              <span className="text-xs font-mono text-slate-400 group-hover:text-blue-400">Bank Transfer</span>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="bg-white p-4 rounded-xl mb-6 w-full max-w-[240px] aspect-square flex items-center justify-center shadow-inner relative overflow-hidden group">
            {/* Fake QR Image placeholder, in a real app this would be dynamically generated */}
            <div className="w-full h-full bg-slate-100 flex items-center justify-center border-4 border-slate-800 rounded-lg relative">
              <span className="material-symbols-outlined text-6xl text-slate-300">qr_code_2</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <div className="w-full h-full border-[16px] border-black border-dashed"></div>
              </div>
            </div>
            
            {/* Scanning animation overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Order Details */}
          <div className="w-full text-center mb-6">
            <div className="text-slate-400 mb-1">Số tiền thanh toán</div>
            <div className="text-3xl text-white font-bold mb-3">{amount.toLocaleString()} VND</div>
            
            <div className="inline-flex items-center gap-2 bg-[#0a1628]/80 px-4 py-2 rounded-full border border-[rgba(99,179,255,0.12)]">
              <span className="text-xs text-slate-400">Mã đơn hàng:</span>
              <span className="text-sm text-blue-400 font-bold tracking-wider font-mono">#{orderId?.substring(0, 8).toUpperCase() || 'NC-9982'}</span>
              <button className="text-slate-500 hover:text-white transition-colors p-1" title="Copy">
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>
          </div>

          {/* Timer & Status */}
          <div className="w-full bg-[#0a1628]/50 rounded-xl p-4 border border-[rgba(99,179,255,0.12)] text-center">
            <div className={`flex items-center justify-center gap-2 mb-2 ${timeLeft > 0 ? 'text-red-400' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined text-[20px]">timer</span>
              <span className="font-medium">
                {timeLeft > 0 ? `Vui lòng thanh toán trong ${timeString}` : 'Đã hết thời gian thanh toán'}
              </span>
            </div>
            
            {timeLeft > 0 && !isPaid && (
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                <span className="text-sm font-medium">Đang chờ thanh toán...</span>
              </div>
            )}
            
            {isPaid && (
              <div className="flex items-center justify-center gap-2 text-green-400 mt-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span className="text-sm font-medium">Thanh toán thành công! Đang chuyển hướng...</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleMockPayment}
            disabled={isPaid}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm transition-colors w-full"
          >
            {isPaid ? 'Đã thanh toán' : 'Giả lập Thanh toán Thành công'}
          </button>
          
          <p className="text-slate-500 text-xs mt-4 text-center">
            Trang sẽ tự cập nhật khi thanh toán thành công
          </p>
        </div>

        {/* Cancel Action */}
        <div className="text-center mt-6">
          <Link href="/checkout">
            <button className="text-slate-400 hover:text-red-400 transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">close</span>
              Hủy thanh toán
            </button>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Đang tải...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
