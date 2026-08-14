import React from 'react';
import Link from 'next/link';

export default function NewsDetail({ params }: { params: { id: string } }) {
  // Mock data for the specific post
  const article = {
    id: params.id,
    category: 'Cập nhật sản phẩm',
    categoryColor: '#3b82f6',
    date: '12 Tháng 8, 2026',
    title: 'NovaCloud ra mắt Engine tự động mở rộng AI tích hợp dự báo tải',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&auto=format',
    content: `
      <p class="mb-4">Hôm nay, NovaCloud tự hào công bố tính năng mới nhất của nền tảng: <strong>Engine tự động mở rộng bằng AI</strong> (AI-Powered Auto Scaling Engine). Đây là một bước tiến lớn trong việc giúp các doanh nghiệp tối ưu hóa chi phí và đảm bảo hiệu suất website luôn ở mức cao nhất, ngay cả trong những thời điểm lưu lượng truy cập tăng vọt đột biến.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Hoạt động như thế nào?</h2>
      <p class="mb-4">Hệ thống AI của chúng tôi sẽ liên tục theo dõi các chỉ số về lượng truy cập, sử dụng CPU, RAM và băng thông của máy chủ của bạn trong thời gian thực. Bằng cách phân tích dữ liệu lịch sử và các mẫu hình (patterns) truy cập, AI có khả năng dự báo trước thời điểm nào máy chủ của bạn sẽ bị quá tải.</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Tự động mở rộng (Scale Up):</strong> Khi dự báo có lượng tải lớn, hệ thống sẽ tự động thêm tài nguyên (CPU, RAM) vào VPS của bạn ngay lập tức mà không gây gián đoạn (zero-downtime).</li>
        <li><strong>Tự động thu hẹp (Scale Down):</strong> Khi lượng truy cập giảm xuống, tài nguyên sẽ được tự động trả lại, giúp bạn tiết kiệm chi phí một cách tối đa.</li>
        <li><strong>Cảnh báo thông minh:</strong> Nhận thông báo qua Email hoặc Telegram mỗi khi hệ thống tự động điều chỉnh.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Lợi ích mang lại</h2>
      <p class="mb-4">Việc áp dụng AI vào Auto Scaling giúp khắc phục hoàn toàn điểm yếu của các hệ thống cũ (chỉ mở rộng khi máy chủ đã bị đầy). Giờ đây, tài nguyên sẽ luôn được chuẩn bị sẵn sàng TRƯỚC KHI khách hàng của bạn ập đến.</p>
      
      <div class="bg-[#0a1628] border border-blue-500/20 p-6 rounded-xl my-8 italic">
        "Kể từ khi dùng thử tính năng này trong bản Beta, hệ thống thương mại điện tử của chúng tôi chưa từng bị nghẽn mạng vào các dịp Sale lớn. Đội ngũ NovaCloud đã giải quyết một bài toán rất khó." - CTO một công ty TMĐT.
      </div>
      
      <p class="mb-4">Tính năng này đã được cập nhật cho tất cả các khách hàng đang sử dụng gói Cloud VPS Enterprise trở lên. Hãy đăng nhập vào trang quản trị để trải nghiệm ngay hôm nay!</p>
    `
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <span 
            className="inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-4"
            style={{ background: `${article.categoryColor}20`, color: article.categoryColor, border: `1px solid ${article.categoryColor}40` }}
          >
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center text-slate-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Đăng ngày: {article.date}
          </div>
        </div>

        {/* Article Image */}
        <div className="rounded-2xl overflow-hidden mb-12 border border-[rgba(99,179,255,0.12)]">
          <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Share & Tags */}
        <div className="mt-12 pt-8 border-t border-[rgba(99,179,255,0.12)] flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-400">#AI</span>
            <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-400">#CloudVPS</span>
            <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-400">#AutoScaling</span>
          </div>
          <div className="flex gap-3 items-center text-slate-400">
            Chia sẻ bài viết:
            <button className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="p-2 bg-slate-800 rounded-full hover:bg-blue-800 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
