# Prompt dùng cho Stitch AI — NovaCloud (Cloud VPS/Hosting Service Platform)

> Cách dùng: copy nguyên khối trong mỗi mục "PROMPT" (tiếng Anh) dán vào Stitch AI.
> Stitch hiểu tiếng Anh tốt hơn tiếng Việt nên phần prompt thật để bằng tiếng Anh,
> phần ghi chú (Việt) chỉ để bạn đọc, không cần dán vào Stitch.

---

## 0. PROMPT NỀN TẢNG (dán đầu tiên để set style chung cho cả dự án)

> Bộ màu/phông chữ dưới đây được lấy ĐÚNG từ file `globals.css` đang có sẵn
> trong repo (`CloudService.Frontend/src/app/globals.css`), không phải màu tự
> chọn — để UI Stitch tạo ra khớp 100% với code Next.js/Tailwind đã có, bạn
> chỉ việc build thêm component chứ không phải chỉnh lại theme.

```
Design a modern web application called "NovaCloud" — a Cloud VPS and Web Hosting
service platform (similar to DigitalOcean / Vultr style, localized for Vietnamese
market). Two experiences in one product:
1) A public marketing/e-commerce site (visitors + logged-in customers)
2) An admin dashboard (internal staff: Admin & Editor roles)

VISUAL STYLE — futuristic dark tech / glassmorphism (this is a strict design
system, follow exactly, do not substitute a generic light SaaS look):

Colors (dark theme only, this product has no light mode):
- Page background: #050c1a (near-black navy)
- Surface / section background: #0a1628
- Card background: rgba(10, 22, 40, 0.7) with backdrop-blur (glassmorphism),
  border 1px solid rgba(99, 179, 255, 0.12)
- Primary accent (buttons, links, focus states): #3b82f6 (blue)
- Secondary accent (highlights, glow, gradient-text): #22d3ee (cyan)
- Tertiary accent (gradients): #6366f1 (indigo)
- Body text: #e2e8f0 (light gray-blue), muted text: #bbc9cd
- Error/destructive: #ffb4ab on #93000a container
- Status badge colors: Pending/Draft = gray, Processing/Active = blue (#3b82f6),
  Completed/Approved/Published = cyan-green, Cancelled/Rejected/Locked = red

Typography:
- Headings & UI text: "Outfit" (geometric sans-serif, weights 300-800)
- Code/mono elements (e.g. order codes, IDs): "JetBrains Mono"

Signature visual effects to use throughout (this brand is known for these,
don't skip them):
- Glassmorphism cards: translucent dark background + blur + thin glowing border
- Gradient text on key headlines: linear-gradient blue → cyan → indigo,
  clipped to text
- Glow effect on primary buttons: soft blue/indigo box-shadow that intensifies
  on hover, slight lift on hover
- Subtle animated grid background pattern on hero/landing sections
- Rounded-xl corners, generous spacing, dark noise/texture overlay for depth

Fully responsive (desktop first, then tablet/mobile).

Two distinct layout shells, both dark-themed as described above:
- Public site: top navbar (logo left, nav links center, Login/Register or user
  avatar dropdown right, navbar becomes glass/blurred on scroll), footer with
  company info + links.
- Admin dashboard: fixed left sidebar (logo, nav grouped by section,
  collapsible) on the dark surface background, top bar with search + user
  menu + notifications, main content area with breadcrumbs, glass cards for
  stat widgets and tables.
```

---

## 1. NHÓM ƯU TIÊN 1 — Authentication & Public Core
*(Toàn bộ nhóm này gọi API thật, đã có sẵn trên backend)*

### 1.1 Trang Đăng nhập (Login)
```
Design a Login page for NovaCloud. Centered card on a subtle gradient/blurred
cloud-themed background. Fields: Email (text input), Password (password input
with show/hide toggle). Primary button "Đăng nhập". Link "Quên mật khẩu?"
(can be non-functional placeholder). Link at bottom: "Chưa có tài khoản? Đăng ký".
Show inline validation error states (red border + helper text) for wrong
email format and empty fields, and a banner error state for "Sai email hoặc
mật khẩu" (401 response). Include a loading state on the button.
```
Ghi chú: gọi `POST /api/Auth/login` body `{ Email, Password }` → nhận `{ Token, RefreshToken, FullName, Email, Role }`. Lưu token, điều hướng theo `Role` (Admin/Editor → dashboard, Customer → trang chủ).

### 1.2 Trang Đăng ký (Register)
```
Design a Register page, same visual language as Login. Fields: Full Name (text),
Email (text), Password (password, with strength hint), Confirm Password.
Primary button "Tạo tài khoản". Link "Đã có tài khoản? Đăng nhập". Show
validation error states for duplicate email and password mismatch.
```
Ghi chú: `POST /api/Auth/register` body `{ FullName, Email, Password }`.

### 1.3 Trang chủ (Landing Page)
> Trang này đã có code thật rồi (`app/page.tsx` + các component `Hero`,
> `Services`, `Pricing`, `Testimonials`, `News`, `Affiliate`, `Footer`) — dùng
> prompt dưới nếu bạn muốn Stitch dựng lại mockup tương tự để tham khảo/chỉnh
> sửa, thứ tự section phải giữ đúng như code hiện tại.
```
Design a public homepage for a cloud hosting company, following this exact
section order top to bottom:
1. Fixed navbar (transparent, turns to blurred dark glass on scroll), logo
   "Nova" + gradient-text "Cloud", nav links (Dịch vụ, Bảng giá, Tin tức,
   Đối tác tiếp thị), Login/Register buttons on the right.
2. Hero: large gradient-text headline about fast reliable cloud infrastructure,
   subheadline, primary glow CTA "Xem bảng giá" + secondary outline CTA,
   animated floating particles / glowing orbs in the background, a stat row
   below (4 stats: Uptime SLA, Global server clusters, Managed servers,
   Average latency) each with a big gradient number and small label.
3. Services section: grid of service category cards (Cloud VPS, Web Hosting,
   Domain, Email doanh nghiệp, SSL, Firewall) each glass card with icon,
   name, short description.
4. Pricing section: 3-column grid of glass pricing cards with plan name,
   specs list, price, "Đặt hàng" button, one card highlighted as "Phổ biến
   nhất" with a glowing border.
5. Testimonials: grid/carousel of glass quote cards with avatar, name,
   company, star rating.
6. News: grid of 3 article glass cards (thumbnail, category tag, title, date).
7. Affiliate teaser section: short pitch on commission program + CTA button
   "Đăng ký làm đối tác".
8. Footer: company info, quick links, social icons.

Background: solid #050c1a with 2-3 large soft blurred gradient "orb" shapes
(blue/indigo/cyan, low opacity, blur ~80px) positioned absolutely behind the
content for ambient depth, consistent across the whole page.
```
Ghi chú: mục 4 nên gọi `GET /api/ServicePlans`, nhưng **giá phải hard-code/mock tạm** vì API chưa trả giá (xem phần "Khoảng trống backend" cuối file). Testimonials (mục 5) **mock hoàn toàn**, chưa có API.

### 1.4 Trang Bảng giá (Pricing)
```
Design a Pricing page. Top: page title "Bảng giá dịch vụ" + toggle switch
"Thanh toán theo Tháng / Năm" (annual shows a "Tiết kiệm 15%" badge).
Below: tabs or filter chips by category (Cloud VPS, Web Hosting, Domain,
Email, SSL). Main content: responsive grid of pricing cards, each card shows:
plan name, short description, big price number with currency (VND) and
"/tháng" suffix, a specs list with icons (CPU, RAM, SSD, Bandwidth), a
"Đặt hàng" button. If a promotion is active for a plan, show a struck-through
original price next to the discounted price and a small "-15%" ribbon on
the card corner.
```
Ghi chú: `GET /api/ServicePlans` cho danh sách gói + `GET /api/ServiceCategories` cho filter. **Giá và khuyến mãi hiện phải mock** — chưa có endpoint. Nút "Đặt hàng" dẫn tới trang Checkout (1.5 hoặc mục 3.1 bên dưới).

---

## 2. NHÓM ƯU TIÊN 2 — Admin Core Management
*(Yêu cầu đăng nhập role Admin, gọi API thật)*

### 2.1 Admin Dashboard (Tổng quan)
```
Design an Admin Dashboard home screen using the admin sidebar shell.
Top row: 4 stat cards (Tổng đơn hàng, Doanh thu tháng này, Khách hàng mới,
Đơn chờ xử lý) each with a big number, small trend arrow/percentage, and icon.
Below: a large line/bar chart card "Đơn hàng theo tháng" (last 6 months,
placeholder data) and a smaller card "Top gói dịch vụ được quan tâm" (ranked
list with progress bars). Bottom: a recent activity table (last 5 orders)
with columns Khách hàng, Gói dịch vụ, Số tiền, Trạng thái badge, Ngày.
```
Ghi chú: **toàn bộ số liệu là mock** (chưa có API thống kê). Bảng cuối có thể lấy 5 dòng đầu từ `GET /api/Orders/all`.

### 2.2 Quản lý Danh mục & Gói dịch vụ (Service Manager)
```
Design an admin CRUD screen for "Quản lý Dịch vụ" with two tabs: "Danh mục"
and "Gói dịch vụ". Danh mục tab: a data table with columns Tên danh mục, Slug,
Mô tả, Trạng thái (Active/Inactive toggle badge), Ngày tạo, Hành động
(edit/delete icon buttons), plus a "+ Thêm danh mục" button opening a modal
form with fields Name, Description, IsActive toggle. Gói dịch vụ tab: a data
table with columns Tên gói, Danh mục, Mô tả ngắn, QR Code (small thumbnail),
Trạng thái, Hành động, plus "+ Thêm gói" button opening a modal/side-drawer
form with fields: Category (dropdown), Name, Description (textarea),
Specifications (key-value JSON builder or simple textarea for CPU/RAM/SSD),
IsActive toggle, and a read-only QR code preview.
```
Ghi chú: `GET/POST/PUT/DELETE /api/ServiceCategories` và `/api/ServicePlans`, đều role Admin. Field `Specifications` trong backend là 1 chuỗi JSON string — nên form dùng textarea đơn giản (`{"CPU":"2 Core","RAM":"2GB","SSD":"40GB"}`) hoặc builder key-value rồi serialize thành JSON trước khi gửi.

### 2.3 Quản lý Người dùng (User Manager)
```
Design an admin screen "Quản lý Người dùng": a data table with columns
Họ tên, Email, Vai trò (badge: Admin/Editor/Customer), Trạng thái (toggle
switch Bật/Tắt), Ngày tham gia. Include a search box and pagination footer.
Clicking the status toggle opens a small confirm dialog "Bạn có chắc muốn
khóa tài khoản này?".
```
Ghi chú: `GET /api/Users` (paginated), `PATCH /api/Users/{id}/status` body `{ IsActive }`.

### 2.4 Quản lý Đơn hàng (Order Manager)
```
Design an admin screen "Quản lý Đơn hàng": data table with columns Mã đơn,
Khách hàng, Gói dịch vụ, Số tiền, Trạng thái (colored badge: Pending=gray,
Processing=blue, Completed=green, Cancelled=red), Ngày đặt, Hành động
(a dropdown/select to change status, plus "Xem chi tiết" button). Filter
bar at top: status filter chips + date range picker. Detail view (modal or
side drawer) shows full order info and customer notes.
```
Ghi chú: `GET /api/Orders/all`, `PATCH /api/Orders/{id}/status` (backend hiện nhận `status` dạng **string thô**, không phải object — lưu ý khi tích hợp). Vì `OrderDto` không có tên khách hàng/tên gói, UI có thể tạm hiện Guid rút gọn hoặc bạn cần đề xuất BE bổ sung.

---

## 3. NHÓM ƯU TIÊN 3 — Customer Core
*(Gọi API thật, yêu cầu đăng nhập role Customer)*

### 3.1 Trang Đặt hàng (Checkout)
```
Design a Checkout page. Left column: order summary card showing selected
plan name, specs, billing cycle (tháng/năm), unit price, discount line if
promo applied, total amount (large, bold). Right/below: a "Ghi chú cho đơn
hàng" textarea (optional) and a primary button "Xác nhận đặt hàng".
```
Ghi chú: `POST /api/Orders` body `{ ServicePlanId, PlanPriceId, PromotionId?, CustomerNotes? }`.

### 3.2 Trang Thanh toán / QR Code
```
Design a Payment page shown after placing an order. Center: large QR code
image inside a card, above it icons for Momo/ZaloPay/Bank transfer, below
it order amount and order code, and a countdown timer "Vui lòng thanh toán
trong 15:00". Status indicator "Đang chờ thanh toán" with a spinner, and a
note "Trang sẽ tự cập nhật khi thanh toán thành công".
```
Ghi chú: `GET /api/Orders/{id}/payment-qr?amount=...` trả về ảnh QR.

### 3.3 Lịch sử Đơn hàng (My Orders)
```
Design a "Đơn hàng của tôi" page: a list/table of the customer's own orders
with columns Gói dịch vụ, Số tiền, Trạng thái badge, Ngày đặt, and a
"Xem chi tiết" link. Empty state illustration + message when no orders yet.
```
Ghi chú: `GET /api/Orders/my-orders`.

### 3.4 Hồ sơ cá nhân (My Profile)
```
Design a "Hồ sơ cá nhân" page with two cards: (1) Thông tin cá nhân — Full
Name editable field, Email read-only, "Lưu thay đổi" button. (2) Đổi mật
khẩu — Old Password, New Password, Confirm New Password fields, "Cập nhật
mật khẩu" button, with validation states.
```
Ghi chú: `GET/PUT /api/Users/me/profile`, `PUT /api/Users/me/password`.

---

## 4. NHÓM ƯU TIÊN 4 — Extended Features (Marketing)

### 4.1 Trang Tin tức / Blog (Public)
```
Design a Blog listing page: search bar + category filter chips at top,
responsive grid of article cards (thumbnail, category tag, title, excerpt,
author, date), pagination at bottom. Also design an Article Detail page:
large title, author/date meta row, rich formatted body content, related
articles section at the bottom.
```
Ghi chú: `GET /api/NewsArticles` (public, `onlyPublished=true`), `GET /api/NewsArticles/{id}`.

### 4.2 Quản lý Tin tức (News Manager — Admin/Editor)
```
Design an admin screen "Quản lý Tin tức": data table with columns Tiêu đề,
Tác giả, Trạng thái (Đã đăng/Nháp toggle), Ngày tạo, Hành động. "+ Viết bài
mới" opens a full-page editor: Title input, a rich text editor toolbar
(bold/italic/link/image/heading) for Content, Published toggle, Save/Publish
buttons.
```
Ghi chú: `POST/PUT/DELETE /api/NewsArticles` (role Admin,Editor).

### 4.3 Đăng ký Affiliate (Customer)
```
Design an "Đăng ký làm Đối tác Affiliate" page: left side explains commission
policy (bullet points, percentage badges), right side a form with fields
Website/Kênh quảng bá URL, Phương thức quảng bá (textarea), submit button
"Gửi đăng ký". After submission show a status card: Pending (yellow),
Approved (green), Rejected (red) with the submitted info read-only.
```
Ghi chú: `POST /api/AffiliateApplications`, `GET /api/AffiliateApplications/my-application` body/response dùng `WebsiteUrl`, `PromotionalMethods`.

### 4.4 Duyệt Affiliate (Admin)
```
Design an admin screen "Quản lý đăng ký Affiliate": data table with columns
Khách hàng, Website, Phương thức quảng bá, Trạng thái badge, Ngày đăng ký,
Hành động (Duyệt / Từ chối buttons shown only when status = Pending).
```
Ghi chú: `GET /api/AffiliateApplications`, `PATCH /api/AffiliateApplications/{id}/status` body `{ Status: Pending|Approved|Rejected }`.

---

## 5. TRANG PHẢI LÀM MOCK HOÀN TOÀN (chưa có API — làm để đủ bộ portfolio, KHÔNG nối API thật)

```
Design the following pages as static/mock UI (no live data binding needed):
1. "Giới thiệu" (About Us): company story, datacenter photos grid, ISO/SLA
   certification badges, uptime commitment stat block.
2. "Trang Khách hàng" (Testimonials/Customer Logos): grid of client logos +
   testimonial cards + a small QR code per featured plan.
3. "Liên hệ / Đặt dịch vụ" (Contact form): form with Full Name, Email, Phone,
   Subject, Service/Plan dropdown, Billing cycle, Message textarea, submit
   button.
4. Admin "Quản lý Khuyến mãi" (Promotions CRUD): data table with columns
   Mã code, Gói áp dụng, % giảm, Ngày bắt đầu/kết thúc, Trạng thái, Hành
   động, plus a "+ Thêm khuyến mãi" modal form.
5. Admin "Nhật ký hệ thống" (Audit Log): read-only table with columns
   Người thực hiện, Hành động, Đối tượng, Thời gian, Chi tiết.
```
Ghi chú **quan trọng**: 5 trang này KHÔNG có Controller/API tương ứng trong backend hiện tại (`Promotions`, `Testimonials`, `Contacts`, `AuditLogs` chỉ tồn tại ở tầng database/entity, chưa có tầng Application/WebApi). Bạn cần báo lại để backend bổ sung nếu muốn các trang này hoạt động thật, thay vì chỉ là giao diện tĩnh.

---

## Ghi chú kỹ thuật chung để nói với Stitch (thêm vào cuối mỗi prompt nếu cần)
```
Use a consistent design system across all screens: same color tokens,
button styles, badge/status colors, input field styles, spacing scale, and
card shadow style. Status badge color convention: Pending/Draft = gray or
yellow, Processing/Active = blue, Completed/Approved/Published = green,
Cancelled/Rejected/Locked = red.
```
