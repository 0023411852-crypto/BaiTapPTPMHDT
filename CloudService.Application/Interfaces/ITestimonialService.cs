using CloudService.Application.DTOs.Testimonials;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CloudService.Application.Interfaces
{
    public interface ITestimonialService
    {
        Task<IEnumerable<TestimonialDto>> GetAllAsync(bool onlyVisible = false);
        Task<TestimonialDto> GetByIdAsync(Guid id);
        Task<TestimonialDto> CreateAsync(CreateTestimonialDto dto);
        Task<bool> ToggleVisibilityAsync(Guid id);
        Task<bool> DeleteAsync(Guid id);
    }
}
