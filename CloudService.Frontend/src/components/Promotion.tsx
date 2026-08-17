'use client';

import { useState, useEffect } from 'react';

export default function Promotion() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch('http://localhost:5154/api/Promotions', {
          signal: AbortSignal.timeout(5000)
        });
        if (res.ok) {
          const data = await res.json();
          // Lọc ra các khuyến mãi đang active (nếu có logic filter)
          setPromotions(data.data || []);
        } else {
          // Mock data fallback if API doesn't exist yet
          const demoRole = localStorage.getItem('demo_role');
          if (demoRole) {
            setPromotions([
              {
                id: '1',
                name: 'FLASH SALE MÙA HÈ',
                description: 'Giảm giá 50% cho tất cả các gói dịch vụ VPS Pro và Enterprise. Nhanh tay đăng ký!',
                discountPercent: 50,
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]);
          }
        }
      } catch (e) {
        console.error('Lỗi khi fetch Promotions:', e);
        // Fallback for visual testing
        const demoRole = localStorage.getItem('demo_role');
        if (demoRole) {
          setPromotions([
            {
              id: '1',
              name: 'SIÊU KHUYẾN MÃI CLOUD',
              description: 'Giảm 30% trọn đời khi mua gói năm.',
              discountPercent: 30,
              endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPromotions();
  }, []);

  if (isLoading || promotions.length === 0) return null;

  const promo = promotions[0]; // Hiển thị banner đầu tiên

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-3 relative overflow-hidden shadow-[0_4px_20px_rgba(59,130,246,0.3)] mt-16">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
          </span>
          <span className="text-white font-bold tracking-wide uppercase text-sm">{promo.name}</span>
        </div>
        
        <p className="text-white/90 text-sm md:text-base font-medium text-center">
          {promo.description} <span className="font-bold text-yellow-300 ml-1">-{promo.discountPercent}%</span>
        </p>
        
        <a href="#pricing" className="bg-white text-indigo-600 hover:bg-yellow-400 hover:text-indigo-900 px-5 py-1.5 rounded-full text-sm font-bold transition-colors shadow-sm whitespace-nowrap">
          Nhận ưu đãi ngay
        </a>
      </div>
    </div>
  );
}
