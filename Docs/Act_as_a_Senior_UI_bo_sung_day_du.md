🔥 Ưu tiên Mức 1: Authentication & Public Core (Nền tảng sống còn)

_Đây là bộ mặt của hệ thống. Nếu không có phần này, khách hàng không thể tạo tài khoản và không biết bạn đang bán gì._

1.  **Trang Đăng Nhập (Login Page):** Giao diện nhập Email/Mật khẩu. Gọi API lấy Token.
2.  **Trang Đăng Ký (Register Page):** Giao diện đăng ký tài khoản cho khách mới.
3.  **Trang Chủ (Landing Page):** Giới thiệu dịch vụ Cloud, Banner, các đối tác (Mockup).
4.  **Trang Bảng Giá (Pricing Page):** Màn hình cực kỳ quan trọng, fetch API để hiển thị các Gói cước (Service Plans) cực đẹp kèm Giá và Phí khởi tạo.

**⚡ Ưu tiên Mức 2: Admin Core Management (Quản lý vận hành)**

_Sau khi có tài khoản, Admin phải vào thiết lập sản phẩm (Gói cước) thì khách hàng mới có cái để mua._

1.  **Trang Tổng quan Admin (Admin Dashboard):** Layout có Sidebar bên trái. Màn hình chính hiện biểu đồ, số lượng đơn hàng, doanh thu (tạm thời dùng số liệu giả lập).
2.  **Trang Quản lý Dịch vụ (Service Manager):** Màn hình CRUD (Thêm/Sửa/Xóa) cho ServiceCategory và ServicePlan.
3.  **Trang Quản lý Người dùng (User Manager):** Hiển thị danh sách khách hàng. Có nút Bật/Tắt trạng thái (Lock/Unlock) tài khoản.
4.  **Trang Quản lý Đơn hàng (Order Manager):** Xem danh sách đơn hàng đổ về, có nút duyệt đơn Completed hoặc hủy Cancelled.

**🚀 Ưu tiên Mức 3: Customer Core (Trải nghiệm khách hàng)**

_Admin đã tạo gói cước xong, giờ là lúc khách hàng đăng nhập vào để Mua hàng và Trả tiền._

1.  **Trang Đặt Hàng (Checkout Page):** Khách bấm "Mua ngay" từ Bảng giá sẽ nhảy vào đây. Màn hình xác nhận tổng tiền.
2.  **Trang Thanh Toán (Payment / QR Code Page):** Sau khi bấm đặt hàng, màn hình hiện ra mã QR Code để khách quét Momo/ZaloPay.
3.  **Trang Lịch sử Đơn hàng (My Orders):** Khách xem lại danh sách các dịch vụ mình đã mua và trạng thái (Đang chờ/Đã duyệt).
4.  **Trang Hồ sơ cá nhân (My Profile):** Khách cập nhật họ tên và chức năng **Đổi Mật Khẩu** (Quan trọng).

**🌟 Ưu tiên Mức 4: Extended Features (Tính năng mở rộng - Marketing)**

_Đây là các tính năng giúp hệ thống chuyên nghiệp hơn, kéo thêm khách hàng, nhưng không ảnh hưởng đến luồng mua bán cốt lõi._

1.  **Trang Tin tức & Bài viết (Blog - Public):** Khách vãng lai vào đọc tin tức công nghệ, khuyến mãi.
2.  **Trang Quản lý Tin tức (News Manager - Admin):** Giao diện soạn thảo văn bản (Rich Text Editor) để Admin đăng bài.
3.  **Trang Đăng ký Affiliate (Affiliate Apply - Customer):** Khách hàng nộp link website cá nhân để xin làm tiếp thị liên kết kiếm hoa hồng.
4.  **Trang Duyệt Affiliate (Affiliate Manager - Admin):** Admin vào xem đơn đăng ký và bấm Duyệt/Từ chối.

**📌 BỔ SUNG CÁC CHỨC NĂNG CÒN THIẾU THEO YÊU CẦU ĐỀ BÀI**

Các mục dưới đây bổ sung những chức năng chưa được nêu hoặc chưa mô tả đầy đủ trong tài liệu hiện tại, để phạm vi Frontend bám sát yêu cầu Trang công khai và Trang quản trị.

**3.1. TRANG CÔNG KHAI (LANDING PAGE)**

• Trang chủ – Bổ sung Hero banner, gói dịch vụ nổi bật, khuyến mãi đang chạy, cam kết uptime và tin mới nhất.

• Trang Giới thiệu – Lịch sử/giới thiệu doanh nghiệp, hạ tầng Data Center, chứng chỉ (ISO...), cam kết SLA và uptime 99.9%.

• Trang Dịch vụ – Danh mục VPS, Hosting, Domain, Email doanh nghiệp, SSL, Firewall chống DDoS...; mỗi dịch vụ có mô tả và thông số kỹ thuật.

• Trang Bảng giá – So sánh CPU/RAM/SSD/băng thông; hỗ trợ giá theo chu kỳ tháng/năm; hiển thị khuyến mãi có thời hạn; có nút Đặt hàng từng gói.

• Trang Khách hàng – Hiển thị testimonial, logo khách hàng tiêu biểu và mã QR tương ứng với từng gói dịch vụ.

• Trang Tin tức / Blog – Danh sách và chi tiết bài viết; phân trang, tìm kiếm và phân loại như Hướng dẫn, Khuyến mãi...

• Trang Liên hệ / Đặt dịch vụ – Form chọn dịch vụ, gói/cấu hình, chu kỳ thanh toán và thông tin khách hàng; dữ liệu gửi qua API để lưu DB.

• Trang Đối tác / Affiliate – Hiển thị chính sách/điều kiện hoa hồng và form đăng ký làm đối tác/affiliate.

**3.2. TRANG QUẢN TRỊ – AUTHENTICATION & PHÂN QUYỀN**

• Đăng nhập JWT – Xử lý access token và bảo vệ các route quản trị.

• Refresh Token – Có luồng làm mới access token khi token hết hạn và xử lý đăng xuất.

• Đổi mật khẩu – Bổ sung chức năng đổi mật khẩu theo API backend.

• Phân quyền Role – Thể hiện đúng quyền Admin và Editor theo yêu cầu.

**3.3. QUẢN LÝ SẢN PHẨM, GIÁ VÀ KHUYẾN MÃI**

• CRUD gói dịch vụ + bảng giá – Admin thêm/sửa/xóa gói, cấu hình giá và chu kỳ thanh toán.

• CRUD khuyến mãi – Quản lý nội dung, thời gian bắt đầu/kết thúc và trạng thái áp dụng.

• Tự động cập nhật giá ngoài trang chủ – Pricing/Landing Page phải lấy dữ liệu mới từ API, không hard-code giá.

• CRUD danh mục dịch vụ và gói cấu hình – Quản lý ServiceCategory/ServicePlan và thông số cấu hình.

• Sinh lại mã QR – Có thao tác sinh lại QR cho từng gói và hiển thị QR tương ứng phía khách hàng.

**3.4. QUẢN LÝ YÊU CẦU ĐẶT DỊCH VỤ & AFFILIATE**

• Quản lý yêu cầu đặt dịch vụ – Hiển thị khách hàng, dịch vụ, gói/cấu hình và chu kỳ thanh toán.

• Cập nhật trạng thái yêu cầu – Bắt buộc hỗ trợ: Mới → Đang xử lý → Hoàn tất hoặc Từ chối.

• Quản lý đăng ký Affiliate – Hiển thị hồ sơ đăng ký và cho phép Admin/Editor xử lý theo quyền.

• Trạng thái Affiliate – Có thao tác duyệt/từ chối và hiển thị trạng thái rõ ràng.

**3.5. THỐNG KÊ, XUẤT DỮ LIỆU & AUDIT**

• Dashboard thống kê – Biểu đồ số lượng yêu cầu theo tháng và các gói dịch vụ được quan tâm.

• Xuất Excel – Admin có nút xuất danh sách yêu cầu đặt dịch vụ ra Excel; Frontend gọi API export và hỗ trợ tải file.

• Audit Log – Theo dõi ai đăng nhập, ai sửa giá và thời điểm thực hiện.

• Audit Log UI – Hiển thị tối thiểu người thực hiện, hành động, thời gian và nội dung liên quan khi API cung cấp.

**3.6. ĐỐI CHIẾU VỚI TÀI LIỆU HIỆN TẠI**

• Các mục đã có: Login, Register, Landing Page cơ bản, Pricing, Admin Dashboard, Service Manager, User Manager, Order Manager, Checkout, Payment/QR, My Orders, My Profile, Blog Public, News Manager, Affiliate Apply và Affiliate Manager.

• Các mục cần bổ sung rõ nhất: About Us, Services đầy đủ, Pricing tháng/năm + khuyến mãi thời hạn, Testimonials/Customer Logos + QR từng gói, Contact/Service Registration Form, Affiliate Policy, Refresh Token, Change Password, CRUD bảng giá/khuyến mãi, sinh lại QR, luồng trạng thái Mới → Đang xử lý → Hoàn tất/Từ chối, thống kê theo tháng, xuất Excel và Audit Log.

• User Manager và Lock/Unlock không xuất hiện trực tiếp trong bảng yêu cầu được cung cấp; đây là chức năng bổ sung trong tài liệu hiện tại và có thể giữ lại nếu Backend/đề tài hỗ trợ.