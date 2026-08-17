import React from 'react';

export default function Hero() {
  return (
    <section className="relative max-w-[1280px] mx-auto px-4 md:px-10 py-24 md:py-32 overflow-hidden bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Text Content */}
        <div className="lg:col-span-6 space-y-8 z-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-full border border-border-subtle shadow-sm">
            <span className="material-symbols-outlined text-secondary-container text-[18px]">verified</span>
            <span className="font-mono text-sm font-medium text-on-surface-variant">99.9% Uptime SLA</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-container leading-tight tracking-tight">
            Giải pháp Cloud mạnh mẽ cho doanh nghiệp của bạn
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl">
            Tối ưu hóa hiệu suất, đảm bảo tính ổn định và mở rộng không giới hạn với hạ tầng đám mây cao cấp của Nimbus Cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              className="inline-flex justify-center items-center px-6 py-3 bg-secondary-container text-on-primary-container font-medium rounded-lg hover:bg-cloud-cyan transition-colors shadow-sm w-full sm:w-auto"
              href="/pricing"
            >
              Bắt Đầu Ngay
            </a>
            <a
              className="inline-flex justify-center items-center px-6 py-3 bg-transparent text-primary-container border border-primary-container font-medium rounded-lg hover:bg-surface-container-low transition-colors w-full sm:w-auto"
              href="/contact"
            >
              Tư Vấn Chuyên Gia
            </a>
          </div>
        </div>
        
        {/* Hero Imagery */}
        <div className="lg:col-span-6 relative mt-12 lg:mt-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {/* Decorative subtle background blob */}
          <div className="absolute inset-0 bg-secondary-container/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle bg-surface-container-lowest shadow-sm transform hover:-translate-y-1 transition-transform duration-500">
            <img
              alt="Cloud Infrastructure Visualization"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlvYpkYuUiRiUqxTN_RvomciJU16fpospYA6kenFheMb6pFCD1VagVtNMyVZF3vS5WGioMw-07Qrdm8oNf7wKwH_fTOgXS5Z8OqcLs62hK0y0YbFq-q2flx3YlctOnFHmycy9DlcbiTeNjT6g2CG_q1V8iFdBubl9KUChafJ5IYuEfTniICboyXt59jCMsfIRbczXtkTcijyfLGHtkYiagp5L8_9R2ErBDDsLiIXkGpGhUgzTVo70wTwd_PVRSdFg9v0SWKMckBfBo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
