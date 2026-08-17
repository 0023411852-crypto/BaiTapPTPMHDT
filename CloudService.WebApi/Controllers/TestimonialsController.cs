using CloudService.Application.DTOs.Testimonials;
using CloudService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace CloudService.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialsController : ControllerBase
    {
        private readonly ITestimonialService _testimonialService;

        public TestimonialsController(ITestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool onlyVisible = true)
        {
            var testimonials = await _testimonialService.GetAllAsync(onlyVisible);
            return Ok(testimonials);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var testimonial = await _testimonialService.GetByIdAsync(id);
            if (testimonial == null) return NotFound();
            return Ok(testimonial);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTestimonialDto dto)
        {
            var testimonial = await _testimonialService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = testimonial.Id }, testimonial);
        }

        [HttpPatch("{id}/toggle-visibility")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleVisibility(Guid id)
        {
            var result = await _testimonialService.ToggleVisibilityAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _testimonialService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
