export default function Infrastructure() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              HẠ TẦNG & CÔNG NGHỆ
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sức mạnh đằng sau <br/>
              <span className="gradient-text">NovaCloud</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Chúng tôi sở hữu Data Center đạt chuẩn Tier III quốc tế, chứng chỉ ISO 27001 về bảo mật và hạ tầng mạng Backbone 100Gbps, đảm bảo dịch vụ của bạn luôn hoạt động trơn tru với hiệu suất tối đa.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="glass-panel p-5 rounded-2xl border border-[rgba(99,179,255,0.1)]">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Uptime SLA</div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[rgba(99,179,255,0.1)]">
                <div className="text-3xl font-bold text-white mb-1">100<span className="text-xl">Gbps</span></div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Băng thông mạng</div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[rgba(99,179,255,0.1)]">
                <div className="text-3xl font-bold text-white mb-1">&lt;1<span className="text-xl">ms</span></div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Độ trễ nội bộ</div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[rgba(99,179,255,0.1)]">
                <div className="text-3xl font-bold text-white mb-1">NVMe</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Lưu trữ Enterprise</div>
              </div>
            </div>
            
            <a href="/about" className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group">
              Khám phá thêm về NovaCloud
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right Visual */}
          <div className="order-1 lg:order-2 relative perspective-1000">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden glass-panel border border-[rgba(99,179,255,0.15)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu rotate-y-[-5deg] rotate-x-[5deg] transition-transform duration-500 hover:rotate-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent z-10 mix-blend-overlay"></div>
              {/* Abstract server visual representation */}
              <div className="absolute inset-0 flex flex-col justify-center gap-4 p-8">
                {[1, 2, 3, 4].map((server) => (
                  <div key={server} className="h-16 w-full rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center px-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-150"></div>
                    </div>
                    <div className="ml-auto w-1/3 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500/50 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 glass-panel px-6 py-4 rounded-2xl border border-[rgba(99,179,255,0.2)] shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">ISO 27001</div>
                  <div className="text-xs text-slate-400">Certified</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 glass-panel px-6 py-4 rounded-2xl border border-[rgba(99,179,255,0.2)] shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Anti-DDoS</div>
                  <div className="text-xs text-slate-400">Layer 3, 4 & 7</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
