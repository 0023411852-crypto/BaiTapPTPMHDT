using AutoMapper;
using CloudService.Application.Common;
using CloudService.Application.DTOs.Promotions;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudService.Application.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAuditLogService _auditLogService;

        public PromotionService(IUnitOfWork unitOfWork, IMapper mapper, IAuditLogService auditLogService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _auditLogService = auditLogService;
        }

        public async Task<PagedResponse<PromotionDto>> GetAllAsync(PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<Promotion>();
            var allDataQuery = repo.GetQueryable();
            var totalCount = await allDataQuery.CountAsync();
            
            var pagedData = await allDataQuery
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<PromotionDto>>(pagedData);
            return new PagedResponse<PromotionDto>(dtos, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task<PagedResponse<PromotionDto>> GetActivePromotionsAsync(PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<Promotion>();
            var now = DateTime.UtcNow;
            var activeQuery = repo.GetQueryable().Where(x => x.IsActive && x.StartDate <= now && x.EndDate >= now);
            
            var totalCount = await activeQuery.CountAsync();
            var pagedData = await activeQuery
                .OrderBy(x => x.EndDate)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<PromotionDto>>(pagedData);
            return new PagedResponse<PromotionDto>(dtos, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task<PromotionDto?> GetByIdAsync(Guid id)
        {
            var entity = await _unitOfWork.Repository<Promotion>().GetByIdAsync(id);
            if (entity == null) return null;
            return _mapper.Map<PromotionDto>(entity);
        }

        public async Task<PromotionDto> CreateAsync(CreatePromotionDto dto)
        {
            var entity = _mapper.Map<Promotion>(dto);
            await _unitOfWork.Repository<Promotion>().AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();
            await _auditLogService.LogAsync(null, "CREATE_PROMOTION", "Promotion", entity.Id.ToString());
            return _mapper.Map<PromotionDto>(entity);
        }

        public async Task<bool> UpdateAsync(Guid id, UpdatePromotionDto dto)
        {
            var repo = _unitOfWork.Repository<Promotion>();
            var entity = await repo.GetByIdAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            repo.Update(entity);
            await _unitOfWork.SaveChangesAsync();
            await _auditLogService.LogAsync(null, "UPDATE_PROMOTION", "Promotion", entity.Id.ToString());
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var repo = _unitOfWork.Repository<Promotion>();
            var entity = await repo.GetByIdAsync(id);
            if (entity == null) return false;

            repo.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            await _auditLogService.LogAsync(null, "DELETE_PROMOTION", "Promotion", id.ToString());
            return true;
        }
    }
}
