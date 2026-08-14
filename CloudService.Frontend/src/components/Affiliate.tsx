export default function Affiliate() {
  return (
    <section id="affiliate" className="relative py-28 px-6 overflow-hidden w-full">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/10">
            CHƯƠNG TRÌNH LIÊN KẾT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-amber-500">Kiếm hoa hồng định kỳ lên<br className="hidden md:block"/> đến 40%</span> <span className="text-white">- mãi mãi</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Giới thiệu khách hàng và nhận phần trăm hoa hồng từ tổng doanh thu của họ - mỗi tháng, miễn là họ còn là thành viên. Không giới hạn số tiền. Không có thời hạn.
          </p>
        </div>

        {/* CTA Card */}
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(10,15,30,0.9) 100%)',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Subtle ambient glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-full opacity-20 pointer-events-none"
            style={{ background: '#3b82f6', filter: 'blur(80px)' }} />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Sẵn sàng để bắt đầu kiếm tiền?</h3>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
              Tham gia cùng hơn 4.200 đối tác đang kiếm tiền với NovaCloud. Nhận link giới thiệu của bạn trong chưa đầy 2 phút.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="px-8 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.3)',
                }}
              >
                Tham gia Chương trình
              </a>
              <a
                href="#"
                className="px-8 py-3.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-300 bg-slate-900/50 hover:-translate-y-0.5"
              >
                Xem Điều khoản Đối tác
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
