using CloudService.Application.DTOs.Statistics;

namespace CloudService.Application.Interfaces
{
    public interface IStatisticsService
    {
        Task<DashboardStatisticsDto> GetDashboardStatisticsAsync(string? period = null);
    }
}
