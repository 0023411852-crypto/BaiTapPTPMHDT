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
            <span className="text-amber-600">Kiếm hoa hồng định kỳ lên<br className="hidden md:block"/> đến 40%</span> <span className="text-primary-container">- mãi mãi</span>
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Giới thiệu khách hàng và nhận phần trăm hoa hồng từ tổng doanh thu của họ - mỗi tháng, miễn là họ còn là thành viên. Không giới hạn số tiền. Không có thời hạn.
          </p>
        </div>

        {/* CTA Card */}
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden max-w-4xl mx-auto"
          style={{
            background: 'var(--surface-container-low)',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Subtle ambient glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-full opacity-20 pointer-events-none"
            style={{ background: '#3b82f6', filter: 'blur(80px)' }} />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-primary-container mb-4">Sẵn sàng để bắt đầu kiếm tiền?</h3>
            <p className="text-on-surface-variant mb-10 max-w-xl mx-auto text-sm leading-relaxed">
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
                className="px-8 py-3.5 text-sm font-medium text-primary-container hover:text-white hover:bg-primary-container rounded-xl border border-border-subtle transition-all duration-300 bg-surface-container hover:-translate-y-0.5"
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
