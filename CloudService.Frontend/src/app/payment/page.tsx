'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function PaymentContent() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amountParam = searchParams.get('amount');
  const amount = amountParam ? parseFloat(amountParam) : 0;
  
  const [isPaid, setIsPaid] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const demoRole = localStorage.getItem('demo_role');
    if (!token && !demoRole) {
      window.location.replace('/');
      return;
    }
    
    // Nếu không có orderId, đẩy về my-orders hoặc trang chủ
    if (!orderId) {
      router.push('/my-orders');
    }
    // Fetch QR Code
    const fetchQr = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5154/api/Orders/${orderId}/payment-qr`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.data) {
          setQrCode(data.data); // data.data is expected to be a Base64 string
        }
      } catch (err) {
        console.error('Lỗi lấy mã QR:', err);
      } finally {
        setQrLoading(false);
      }
    };

    if (orderId) {
      fetchQr();
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
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 relative overflow-hidden bg-gray-50">
        {/* Ambient Background Lighting */}
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md mt-8">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-3xl">cloud</span>
              NovaCloud
            </h1>
            <p className="text-gray-500 font-medium">Thanh toán hóa đơn dịch vụ</p>
          </div>

          {/* Payment Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          
          {/* Payment Methods */}
          <div className="flex justify-center gap-6 mb-6 w-full border-b border-gray-100 pb-6">
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center border border-pink-200 group-hover:border-pink-400 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-pink-500">account_balance_wallet</span>
              </div>
              <span className="text-xs font-mono text-pink-500 font-bold">MoMo</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-blue-300 transition-colors">
                <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-500">qr_code_scanner</span>
              </div>
              <span className="text-xs font-mono text-gray-500 group-hover:text-blue-600 font-medium">ZaloPay</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-blue-300 transition-colors">
                <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-500">account_balance</span>
              </div>
              <span className="text-xs font-mono text-gray-500 group-hover:text-blue-600 font-medium">Bank Transfer</span>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="bg-white p-4 rounded-xl mb-6 w-full max-w-[240px] aspect-square flex items-center justify-center shadow-inner relative overflow-hidden group">
            {qrLoading ? (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center border-4 border-slate-800 rounded-lg relative">
                <span className="material-symbols-outlined text-6xl text-slate-300 animate-spin">refresh</span>
              </div>
            ) : qrCode ? (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="w-full h-full object-contain rounded-lg" />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center border-4 border-slate-800 rounded-lg relative">
                <span className="material-symbols-outlined text-6xl text-slate-300">qr_code_2</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <div className="w-full h-full border-[16px] border-black border-dashed"></div>
                </div>
              </div>
            )}
            
            {/* Scanning animation overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Order Details */}
          <div className="w-full text-center mb-6">
            <div className="text-gray-500 mb-1 font-medium">Số tiền thanh toán</div>
            <div className="text-3xl text-gray-900 font-bold mb-3">{amount.toLocaleString()} VND</div>
            
            <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <span className="text-xs text-gray-500">Mã đơn hàng:</span>
              <span className="text-sm text-blue-600 font-bold tracking-wider font-mono">#{orderId?.substring(0, 8).toUpperCase() || 'NC-9982'}</span>
              <button className="text-gray-400 hover:text-gray-700 transition-colors p-1" title="Copy">
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>
          </div>

          {/* Timer & Status */}
          <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
            <div className={`flex items-center justify-center gap-2 mb-2 ${timeLeft > 0 ? 'text-red-500' : 'text-gray-500'}`}>
              <span className="material-symbols-outlined text-[20px]">timer</span>
              <span className="font-medium">
                {timeLeft > 0 ? `Vui lòng thanh toán trong ${timeString}` : 'Đã hết thời gian thanh toán'}
              </span>
            </div>
            
            {timeLeft > 0 && !isPaid && (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                <span className="text-sm font-medium">Đang chờ thanh toán...</span>
              </div>
            )}
            
            {isPaid && (
              <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span className="text-sm font-medium">Thanh toán thành công! Đang chuyển hướng...</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleMockPayment}
            disabled={isPaid}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm transition-colors w-full relative"
          >
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider shadow-lg">PAYMENT DEMO</span>
            {isPaid ? 'Đã thanh toán' : 'Giả lập Thanh toán Thành công'}
          </button>
          
          <p className="text-gray-400 text-xs mt-4 text-center">
            Trang sẽ tự cập nhật khi thanh toán thành công
          </p>
        </div>

        {/* Cancel Action */}
        <div className="text-center mt-6">
          <Link href="/checkout">
            <button className="text-gray-500 hover:text-red-500 transition-colors inline-flex items-center gap-2 font-medium">
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
      <Footer />
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Đang tải...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
