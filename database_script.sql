IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Roles] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [ServiceCategories] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Slug] nvarchar(max) NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_ServiceCategories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AppUsers] (
    [Id] uniqueidentifier NOT NULL,
    [FullName] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [PasswordHash] nvarchar(max) NOT NULL,
    [IsActive] bit NOT NULL,
    [RoleId] uniqueidentifier NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_AppUsers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AppUsers_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [ServicePlans] (
    [Id] uniqueidentifier NOT NULL,
    [CategoryId] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Specifications] nvarchar(max) NOT NULL,
    [QRCodeBase64] nvarchar(max) NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_ServicePlans] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ServicePlans_ServiceCategories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [ServiceCategories] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [AffiliateApplications] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [Status] int NOT NULL,
    [WebsiteUrl] nvarchar(max) NOT NULL,
    [PromotionMethod] nvarchar(max) NOT NULL,
    [AppliedAt] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_AffiliateApplications] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AffiliateApplications_AppUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AppUsers] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [AuditLogs] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [Action] nvarchar(max) NOT NULL,
    [EntityName] nvarchar(max) NOT NULL,
    [EntityId] nvarchar(max) NOT NULL,
    [Details] nvarchar(max) NOT NULL,
    [Timestamp] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_AuditLogs] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AuditLogs_AppUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AppUsers] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [NewsArticles] (
    [Id] uniqueidentifier NOT NULL,
    [Title] nvarchar(max) NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [Slug] nvarchar(max) NOT NULL,
    [Category] nvarchar(max) NOT NULL,
    [IsPublished] bit NOT NULL,
    [AuthorId] uniqueidentifier NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_NewsArticles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_NewsArticles_AppUsers_AuthorId] FOREIGN KEY ([AuthorId]) REFERENCES [AppUsers] ([Id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [PlanPrices] (
    [Id] uniqueidentifier NOT NULL,
    [ServicePlanId] uniqueidentifier NOT NULL,
    [BillingCycle] int NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [SetupFee] decimal(18,2) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_PlanPrices] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PlanPrices_ServicePlans_ServicePlanId] FOREIGN KEY ([ServicePlanId]) REFERENCES [ServicePlans] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Promotions] (
    [Id] uniqueidentifier NOT NULL,
    [ServicePlanId] uniqueidentifier NOT NULL,
    [Code] nvarchar(max) NOT NULL,
    [DiscountPercentage] decimal(5,2) NOT NULL,
    [StartDate] datetime2 NOT NULL,
    [EndDate] datetime2 NOT NULL,
    [IsActive] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_Promotions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Promotions_ServicePlans_ServicePlanId] FOREIGN KEY ([ServicePlanId]) REFERENCES [ServicePlans] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [OrderRequests] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [ServicePlanId] uniqueidentifier NOT NULL,
    [PlanPriceId] uniqueidentifier NOT NULL,
    [PromotionId] uniqueidentifier NULL,
    [TotalAmount] decimal(18,2) NOT NULL,
    [Status] int NOT NULL,
    [CustomerNotes] nvarchar(max) NULL,
    [AdminNotes] nvarchar(max) NULL,
    [OrderDate] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_OrderRequests] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_OrderRequests_AppUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AppUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_OrderRequests_PlanPrices_PlanPriceId] FOREIGN KEY ([PlanPriceId]) REFERENCES [PlanPrices] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_OrderRequests_Promotions_PromotionId] FOREIGN KEY ([PromotionId]) REFERENCES [Promotions] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_OrderRequests_ServicePlans_ServicePlanId] FOREIGN KEY ([ServicePlanId]) REFERENCES [ServicePlans] ([Id]) ON DELETE NO ACTION
);
GO

CREATE INDEX [IX_AffiliateApplications_UserId] ON [AffiliateApplications] ([UserId]);
GO

CREATE INDEX [IX_AppUsers_RoleId] ON [AppUsers] ([RoleId]);
GO

CREATE INDEX [IX_AuditLogs_UserId] ON [AuditLogs] ([UserId]);
GO

CREATE INDEX [IX_NewsArticles_AuthorId] ON [NewsArticles] ([AuthorId]);
GO

CREATE INDEX [IX_OrderRequests_PlanPriceId] ON [OrderRequests] ([PlanPriceId]);
GO

CREATE INDEX [IX_OrderRequests_PromotionId] ON [OrderRequests] ([PromotionId]);
GO

CREATE INDEX [IX_OrderRequests_ServicePlanId] ON [OrderRequests] ([ServicePlanId]);
GO

CREATE INDEX [IX_OrderRequests_UserId] ON [OrderRequests] ([UserId]);
GO

CREATE INDEX [IX_PlanPrices_ServicePlanId] ON [PlanPrices] ([ServicePlanId]);
GO

CREATE INDEX [IX_Promotions_ServicePlanId] ON [Promotions] ([ServicePlanId]);
GO

CREATE INDEX [IX_ServicePlans_CategoryId] ON [ServicePlans] ([CategoryId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260810120325_InitialCreate', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [UserSessions] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [RefreshTokenHash] nvarchar(max) NOT NULL,
    [LastActiveTimestamp] datetime2 NOT NULL,
    [ExpiresAt] datetime2 NOT NULL,
    [IsRevoked] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_UserSessions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserSessions_AppUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AppUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_UserSessions_UserId] ON [UserSessions] ([UserId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260811045011_AddUserSession', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [UserSessions] ADD [RevokedAt] datetime2 NULL;
GO

ALTER TABLE [UserSessions] ADD [RevokedReason] nvarchar(max) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260811052327_UpdateUserSessionAudit', N'8.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [PlanPrices] ADD [IsActive] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [NewsArticles] ADD [Excerpt] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [NewsArticles] ADD [ThumbnailUrl] nvarchar(max) NOT NULL DEFAULT N'';
GO

CREATE TABLE [Contacts] (
    [Id] uniqueidentifier NOT NULL,
    [FullName] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [PhoneNumber] nvarchar(max) NOT NULL,
    [Subject] nvarchar(max) NOT NULL,
    [Message] nvarchar(max) NOT NULL,
    [Status] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_Contacts] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Testimonials] (
    [Id] uniqueidentifier NOT NULL,
    [CustomerName] nvarchar(max) NOT NULL,
    [CompanyName] nvarchar(max) NOT NULL,
    [AvatarUrl] nvarchar(max) NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [Rating] int NOT NULL,
    [IsVisible] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_Testimonials] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260817030346_AddThumbnailAndExcerptToNewsArticle', N'8.0.2');
GO

COMMIT;
GO

