using CloudService.Domain.Common;

namespace CloudService.Domain.Entities
{
    public class NewsArticle : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // Hướng dẫn, Khuyến mãi...
        public string ThumbnailUrl { get; set; } = string.Empty; // Ảnh nền
        public string Excerpt { get; set; } = string.Empty; // Đoạn trích ngắn
        public bool IsPublished { get; set; } = false;

        public Guid AuthorId { get; set; }
        public virtual AppUser Author { get; set; } = null!;
    }
}
