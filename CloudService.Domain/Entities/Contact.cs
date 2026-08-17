using CloudService.Domain.Common;

namespace CloudService.Domain.Entities
{
    public class Contact : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public int Status { get; set; } // e.g., 0: New, 1: Processed
    }
}
