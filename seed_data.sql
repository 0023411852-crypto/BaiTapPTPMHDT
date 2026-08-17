-- =============================================
-- Script: Dữ liệu mẫu (Seed Data) cho CloudServiceDB
-- Hướng dẫn: Chạy script này SAU KHI đã chạy file database_script.sql
-- =============================================

-- 1. Thêm các Roles
DECLARE @AdminRoleId UNIQUEIDENTIFIER = NEWID();
DECLARE @EditorRoleId UNIQUEIDENTIFIER = NEWID();
DECLARE @CustomerRoleId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [Roles] ([Id], [Name], [CreatedAt], [UpdatedAt])
VALUES 
(@AdminRoleId, 'Admin', GETUTCDATE(), NULL),
(@EditorRoleId, 'Editor', GETUTCDATE(), NULL),
(@CustomerRoleId, 'Customer', GETUTCDATE(), NULL);

-- 2. Thêm Service Category (Danh mục Dịch vụ)
DECLARE @CatVpsId UNIQUEIDENTIFIER = NEWID();
DECLARE @CatHostingId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [ServiceCategories] ([Id], [Name], [Description], [Slug], [IsActive], [CreatedAt], [UpdatedAt])
VALUES 
(@CatVpsId, 'Cloud VPS', 'Máy chủ ảo VPS tốc độ cao', 'cloud-vps', 1, GETUTCDATE(), NULL),
(@CatHostingId, 'Web Hosting', 'Hosting doanh nghiệp', 'web-hosting', 1, GETUTCDATE(), NULL);

-- 3. Thêm Service Plan (Gói Dịch vụ)
DECLARE @PlanVps1Id UNIQUEIDENTIFIER = NEWID();
DECLARE @PlanVps2Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO [ServicePlans] ([Id], [CategoryId], [Name], [Description], [Specifications], [IsActive], [CreatedAt], [UpdatedAt], [QRCodeBase64])
VALUES 
(@PlanVps1Id, @CatVpsId, 'VPS PRO 1', 'Gói Cloud VPS cơ bản', '{"CPU": "1 Core", "RAM": "1GB", "SSD": "20GB"}', 1, GETUTCDATE(), NULL, NULL),
(@PlanVps2Id, @CatVpsId, 'VPS PRO 2', 'Gói Cloud VPS phổ biến', '{"CPU": "2 Core", "RAM": "2GB", "SSD": "40GB"}', 1, GETUTCDATE(), NULL, NULL);

-- 4. Thêm Plan Price (Bảng giá)
INSERT INTO [PlanPrices] ([Id], [ServicePlanId], [BillingCycle], [Price], [SetupFee], [IsActive], [CreatedAt], [UpdatedAt])
VALUES 
-- Giá cho VPS PRO 1
(NEWID(), @PlanVps1Id, 1, 99000, 0, 1, GETUTCDATE(), NULL),    -- 1 tháng
(NEWID(), @PlanVps1Id, 12, 1000000, 0, 1, GETUTCDATE(), NULL), -- 12 tháng (Tiết kiệm)
-- Giá cho VPS PRO 2
(NEWID(), @PlanVps2Id, 1, 189000, 0, 1, GETUTCDATE(), NULL),
(NEWID(), @PlanVps2Id, 12, 2000000, 0, 1, GETUTCDATE(), NULL);

-- 5. Thêm tài khoản Admin mặc định
DECLARE @AdminUserId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [AppUsers] ([Id], [FullName], [Email], [PasswordHash], [IsActive], [RoleId], [CreatedAt], [UpdatedAt])
VALUES 
-- Mật khẩu mặc định là: 123456aA@ (Mã hash Bcrypt ví dụ)
(@AdminUserId, 'Quản trị viên', 'admin@novacloud.vn', '$2a$11$w1pIub03zZJ16qX4oI6M4eF33jR8TzHj04g92qC.N0qD1g1vI9MDe', 1, @AdminRoleId, GETUTCDATE(), NULL);

-- 6. Thêm bài báo Tin Tức (News)
INSERT INTO [NewsArticles] ([Id], [Title], [Content], [Slug], [Category], [ThumbnailUrl], [Excerpt], [IsPublished], [AuthorId], [CreatedAt], [UpdatedAt])
VALUES 
(NEWID(), 'NovaCloud ra mắt Engine tự động mở rộng AI', '<p>Giải pháp mới giúp doanh nghiệp tự động scale tài nguyên dựa trên nhu cầu thực tế với sự hỗ trợ của AI dự báo.</p>', 'novacloud-ai-auto-scaling', 'Cập nhật sản phẩm', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop&auto=format', 'Giải pháp mới giúp doanh nghiệp tự động scale tài nguyên máy chủ...', 1, @AdminUserId, GETUTCDATE(), NULL),
(NEWID(), 'Các điểm PoP mới tại Châu Á', '<p>Mở rộng hạ tầng mạng toàn cầu, giảm độ trễ và tăng tốc kết nối cho khách hàng ở các khu vực Nam Mỹ, Châu Phi và Đông Nam Á.</p>', 'pop-moi-chau-a', 'Hạ tầng', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&auto=format', 'Mở rộng hạ tầng mạng toàn cầu, giảm độ trễ và tăng tốc kết nối...', 1, @AdminUserId, GETUTCDATE(), NULL);

-- 7. Thêm mã Khuyến mãi (Promotions)
INSERT INTO [Promotions] ([Id], [ServicePlanId], [Code], [DiscountPercentage], [StartDate], [EndDate], [IsActive], [CreatedAt], [UpdatedAt])
VALUES 
(NEWID(), @PlanVps2Id, 'SUMMER2026', 15.00, GETUTCDATE(), DATEADD(month, 1, GETUTCDATE()), 1, GETUTCDATE(), NULL);

-- 8. Thêm Liên hệ (Contacts)
INSERT INTO [Contacts] ([Id], [FullName], [Email], [PhoneNumber], [Subject], [Message], [Status], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), 'Nguyễn Văn Khách', 'khachhang@example.com', '0912345678', 'Tư vấn giải pháp VPS cho doanh nghiệp', 'Xin chào, tôi cần tư vấn triển khai cụm VPS cho công ty với khoảng 500 nhân sự...', 0, GETUTCDATE(), NULL);

-- 9. Thêm Đánh giá (Testimonials)
INSERT INTO [Testimonials] ([Id], [CustomerName], [CompanyName], [AvatarUrl], [Content], [Rating], [IsVisible], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), 'Trần Thị CEO', 'Công ty TNHH Phần mềm Alpha', 'https://randomuser.me/api/portraits/women/44.jpg', 'Dịch vụ Cloud VPS của NovaCloud rất ổn định, tôi rất hài lòng với đội ngũ support 24/7.', 5, 1, GETUTCDATE(), NULL),
(NEWID(), 'Lê Văn TechLead', 'Tech Startup Beta', 'https://randomuser.me/api/portraits/men/32.jpg', 'Giao diện thân thiện, deploy nhanh chóng và giá cả rất hợp lý cho startup.', 4, 1, GETUTCDATE(), NULL);
