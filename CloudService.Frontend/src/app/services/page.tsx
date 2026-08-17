import React from 'react';
import Navbar from '../../components/Navbar';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f0f9ff 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        <div className="container mx-auto px-6 text-center pt-12 pb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-container">Dịch Vụ Cloud</h1>
          <p className="text-xl text-slate-500">Khám phá các giải pháp đám mây mạnh mẽ dành cho doanh nghiệp của bạn</p>
        </div>
        <Services />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
