using CloudService.Application.Common;
using CloudService.Application.DTOs.AuditLogs;
using System;
using System.Threading.Tasks;

namespace CloudService.Application.Interfaces
{
    public interface IAuditLogService
    {
        Task<PagedResponse<AuditLogDto>> GetAllAsync(PaginationFilter filter);
        Task LogAsync(Guid? userId, string action, string entityName, string entityId, string details = "");
    }
}
