using AutoMapper;
using CloudService.Application.Common;
using CloudService.Application.DTOs.AuditLogs;
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
    public class AuditLogService : IAuditLogService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public AuditLogService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<PagedResponse<AuditLogDto>> GetAllAsync(PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<AuditLog>();
            var allDataQuery = repo.GetQueryable().Include(x => x.User);
            var totalCount = await allDataQuery.CountAsync();
            
            var pagedData = await allDataQuery
                .OrderByDescending(x => x.Timestamp)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<AuditLogDto>>(pagedData);
            return new PagedResponse<AuditLogDto>(dtos, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task LogAsync(Guid? userId, string action, string entityName, string entityId, string details = "")
        {
            var finalUserId = userId ?? _currentUserService.UserId;
            if (finalUserId == null) return; // Cannot log without a user

            var auditLog = new AuditLog
            {
                UserId = finalUserId.Value,
                Action = action,
                EntityName = entityName,
                EntityId = entityId,
                Details = details,
                Timestamp = DateTime.UtcNow
            };

            await _unitOfWork.Repository<AuditLog>().AddAsync(auditLog);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
