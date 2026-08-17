import React from 'react';
import Navbar from '../../components/Navbar';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden flex flex-col">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f8fafc 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #e0f2fe 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        <div className="container mx-auto px-6 text-center pt-12 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-container">Bảng Giá Dịch Vụ</h1>
          <p className="text-xl text-slate-500">Lựa chọn gói Cloud phù hợp nhất với nhu cầu của bạn</p>
        </div>
        <Pricing />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
