namespace CloudService.Application.DTOs.Testimonials
{
    public class CreateTestimonialDto
    {
        public string CustomerName { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}
