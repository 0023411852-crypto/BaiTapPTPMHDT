using CloudService.Application.Common;
using CloudService.Application.DTOs.Promotions;
using System;
using System.Threading.Tasks;

namespace CloudService.Application.Interfaces
{
    public interface IPromotionService
    {
        Task<PagedResponse<PromotionDto>> GetAllAsync(PaginationFilter filter);
        Task<PagedResponse<PromotionDto>> GetActivePromotionsAsync(PaginationFilter filter);
        Task<PromotionDto?> GetByIdAsync(Guid id);
        Task<PromotionDto> CreateAsync(CreatePromotionDto dto);
        Task<bool> UpdateAsync(Guid id, UpdatePromotionDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
