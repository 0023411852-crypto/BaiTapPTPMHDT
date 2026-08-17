using CloudService.Application.DTOs.Statistics;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Enums;
using CloudService.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CloudService.Application.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IUnitOfWork _unitOfWork;

        public StatisticsService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<DashboardStatisticsDto> GetDashboardStatisticsAsync()
        {
            var orderRepo = _unitOfWork.Repository<OrderRequest>();
            var userRepo = _unitOfWork.Repository<AppUser>();
            var planRepo = _unitOfWork.Repository<ServicePlan>();

            var ordersQuery = orderRepo.GetQueryable();
            var allOrders = await ordersQuery.Include(x => x.ServicePlan).ToListAsync();
            
            var usersQuery = userRepo.GetQueryable();
            var plansQuery = planRepo.GetQueryable();

            var result = new DashboardStatisticsDto
            {
                TotalOrders = allOrders.Count,
                TotalRevenue = allOrders.Where(x => x.Status == OrderStatus.Completed).Sum(x => x.TotalAmount),
                TotalUsers = await usersQuery.CountAsync(),
                TotalServices = await plansQuery.CountAsync()
            };

            // Orders by Status
            result.OrdersByStatus = allOrders
                .GroupBy(x => x.Status)
                .Select(g => new OrderStatusStatisticDto
                {
                    Status = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToList();

            // Monthly Statistics (Last 6 months)
            var last6Months = Enumerable.Range(0, 6)
                .Select(i => DateTime.UtcNow.AddMonths(-i))
                .OrderBy(d => d)
                .ToList();

            foreach (var month in last6Months)
            {
                var monthName = month.ToString("MMM yyyy", CultureInfo.InvariantCulture);
                var monthOrders = allOrders.Where(x => x.OrderDate.Year == month.Year && x.OrderDate.Month == month.Month).ToList();

                result.MonthlyOrders.Add(new MonthlyStatisticDto
                {
                    Month = monthName,
                    Value = monthOrders.Count
                });

                result.MonthlyRevenue.Add(new MonthlyStatisticDto
                {
                    Month = monthName,
                    Value = monthOrders.Where(x => x.Status == OrderStatus.Completed).Sum(x => x.TotalAmount)
                });
            }

            // Top Services
            result.TopServices = allOrders
                .Where(x => x.ServicePlan != null)
                .GroupBy(x => x.ServicePlanId)
                .Select(g => new TopServiceStatisticDto
                {
                    ServiceName = g.First().ServicePlan.Name,
                    OrderCount = g.Count()
                })
                .OrderByDescending(x => x.OrderCount)
                .Take(5)
                .ToList();

            return result;
        }
    }
}
