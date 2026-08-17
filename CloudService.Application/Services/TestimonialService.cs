using AutoMapper;
using CloudService.Application.DTOs.Testimonials;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace CloudService.Application.Services
{
    public class TestimonialService : ITestimonialService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TestimonialService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TestimonialDto>> GetAllAsync(bool onlyVisible = false)
        {
            var testimonials = await _unitOfWork.Repository<Testimonial>().GetAllAsync();
            if (onlyVisible)
            {
                testimonials = testimonials.Where(t => t.IsVisible);
            }
            return _mapper.Map<IEnumerable<TestimonialDto>>(testimonials);
        }

        public async Task<TestimonialDto> GetByIdAsync(Guid id)
        {
            var testimonial = await _unitOfWork.Repository<Testimonial>().GetByIdAsync(id);
            return _mapper.Map<TestimonialDto>(testimonial);
        }

        public async Task<TestimonialDto> CreateAsync(CreateTestimonialDto dto)
        {
            var testimonial = _mapper.Map<Testimonial>(dto);
            testimonial.CreatedAt = DateTime.UtcNow;
            testimonial.IsVisible = false; // Pending approval
            
            await _unitOfWork.Repository<Testimonial>().AddAsync(testimonial);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<TestimonialDto>(testimonial);
        }

        public async Task<bool> ToggleVisibilityAsync(Guid id)
        {
            var testimonial = await _unitOfWork.Repository<Testimonial>().GetByIdAsync(id);
            if (testimonial == null) return false;

            testimonial.IsVisible = !testimonial.IsVisible;
            _unitOfWork.Repository<Testimonial>().Update(testimonial);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var testimonial = await _unitOfWork.Repository<Testimonial>().GetByIdAsync(id);
            if (testimonial == null) return false;

            _unitOfWork.Repository<Testimonial>().Delete(testimonial);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
