using CloudService.Domain.Common;
using System;

namespace CloudService.Domain.Entities
{
    public class Testimonial : BaseEntity
    {
        public string CustomerName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
        public bool IsVisible { get; set; } = true;
    }
}
