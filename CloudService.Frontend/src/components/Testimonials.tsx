'use client';

import { useState, useEffect, useRef } from 'react'
import { API_BASE_URL } from '@/utils/api'

export default function Testimonials() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_BASE_URL}/api/Testimonials?onlyVisible=true`);
        if (res.ok) {
          const result = await res.json();
          if (result.data && result.data.length > 0) {
            setData(result.data);
          } else {
            setData([]);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.max(1, data.length));
    }, 5000);
  };

  useEffect(() => {
    if (data.length > 0) {
      startInterval();
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [data]);

  const goTo = (i: number) => {
    setActiveIndex(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  if (loading) {
    return (
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5">
              ĐÁNH GIÁ TỪ KHÁCH HÀNG
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-container mb-4">
              Được tin dùng bởi các đội ngũ<br />
              <span className="gradient-text">không chấp nhận gián đoạn</span>
            </h2>
          </div>
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || data.length === 0) {
    return null; // Don't show testimonials section if no data or error
  }

  const active = data[activeIndex] || data[0];

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5">
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-container mb-4">
            Được tin dùng bởi các đội ngũ<br />
            <span className="gradient-text">không chấp nhận gián đoạn</span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div
          className="relative rounded-3xl p-8 md:p-12 mb-8 transition-all duration-500"
          style={{
            background: 'var(--surface-container-low)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(59,130,246,0.3)',
            boxShadow: '0 0 60px rgba(59,130,246,0.1), 0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Quote icon */}
          <div className="mb-6 opacity-30" style={{ color: '#3b82f6' }}>
            <svg width="48" height="36" viewBox="0 0 48 36" fill="currentColor">
              <path d="M0 36V22.8C0 10.2 7.2 2.4 21.6 0l2.4 4.8C16.8 6.4 13.2 10 12 16h10.8V36H0Zm25.2 0V22.8C25.2 10.2 32.4 2.4 46.8 0l1.2 4.8C41 6.4 37.4 10 36 16h10.8V36H25.2Z"/>
            </svg>
          </div>

          <p className="text-xl md:text-2xl text-on-surface leading-relaxed font-light mb-8">
            "{active.content}"
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {active.avatarUrl ? (
                <img
                  src={active.avatarUrl}
                  alt={active.customerName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: '#3b82f6', border: '2px solid rgba(59,130,246,0.5)' }}
                >
                  {active.customerName ? active.customerName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <div className="font-semibold text-primary-container">{active.customerName}</div>
                <div className="text-sm text-on-surface-variant">{active.position} · {active.company}</div>
              </div>
            </div>

            {/* Rating badge */}
            <div
              className="px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              {active.rating}/5
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 flex gap-1">
            {Array.from({ length: active.rating }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-3">
          {data.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                background: i === activeIndex ? '#3b82f6' : 'rgba(59,130,246,0.2)',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mini cards row */}
        <div className="hidden md:grid grid-cols-5 gap-3 mt-8">
          {data.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-xl p-3 text-left transition-all duration-200"
              style={{
                background: i === activeIndex ? 'rgba(59,130,246,0.2)' : 'var(--surface-container-low)',
                border: `1px solid ${i === activeIndex ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.08)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.customerName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: 'rgba(59,130,246,0.3)' }}>
                    {t.customerName ? t.customerName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs font-medium text-primary-container truncate">{t.customerName}</span>
              </div>
              <div className="text-xs text-on-surface-variant truncate">{t.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
