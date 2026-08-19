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

        public async Task<DashboardStatisticsDto> GetDashboardStatisticsAsync(string? period = null)
        {
            var orderRepo = _unitOfWork.Repository<OrderRequest>();
            var userRepo = _unitOfWork.Repository<AppUser>();
            var planRepo = _unitOfWork.Repository<ServicePlan>();

            var ordersQuery = orderRepo.GetQueryable();
            var allOrdersQuery = ordersQuery.Include(x => x.ServicePlan).Include(x => x.User).AsQueryable();
            
            // Apply period filter
            DateTime? startDate = null;
            if (!string.IsNullOrEmpty(period))
            {
                var now = DateTime.UtcNow;
                startDate = period switch
                {
                    "7days" => now.AddDays(-7),
                    "30days" => now.AddDays(-30),
                    "thismonth" => new DateTime(now.Year, now.Month, 1),
                    _ => null
                };
            }

            if (startDate.HasValue)
            {
                allOrdersQuery = allOrdersQuery.Where(x => x.OrderDate >= startDate.Value);
            }

            var allOrders = await allOrdersQuery.ToListAsync();
            
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

            // Chart Statistics based on period
            if (period == "7days")
            {
                // Daily data for last 7 days
                var last7Days = Enumerable.Range(0, 7)
                    .Select(i => DateTime.UtcNow.AddDays(-i).Date)
                    .OrderBy(d => d)
                    .ToList();

                foreach (var day in last7Days)
                {
                    var dayName = day.ToString("dd/MM", CultureInfo.InvariantCulture);
                    var dayOrders = allOrders.Where(x => x.OrderDate.Date == day).ToList();

                    result.MonthlyOrders.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Count
                    });

                    result.MonthlyRevenue.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Where(x => x.Status == OrderStatus.Completed).Sum(x => x.TotalAmount)
                    });
                }
            }
            else if (period == "30days")
            {
                // Daily data for last 30 days
                var last30Days = Enumerable.Range(0, 30)
                    .Select(i => DateTime.UtcNow.AddDays(-i).Date)
                    .OrderBy(d => d)
                    .ToList();

                foreach (var day in last30Days)
                {
                    var dayName = day.ToString("dd/MM", CultureInfo.InvariantCulture);
                    var dayOrders = allOrders.Where(x => x.OrderDate.Date == day).ToList();

                    result.MonthlyOrders.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Count
                    });

                    result.MonthlyRevenue.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Where(x => x.Status == OrderStatus.Completed).Sum(x => x.TotalAmount)
                    });
                }
            }
            else if (period == "thismonth")
            {
                // Daily data for current month
                var now = DateTime.UtcNow;
                var daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);
                var currentMonthDays = Enumerable.Range(1, daysInMonth)
                    .Select(i => new DateTime(now.Year, now.Month, i))
                    .Where(d => d <= now)
                    .ToList();

                foreach (var day in currentMonthDays)
                {
                    var dayName = day.ToString("dd/MM", CultureInfo.InvariantCulture);
                    var dayOrders = allOrders.Where(x => x.OrderDate.Date == day).ToList();

                    result.MonthlyOrders.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Count
                    });

                    result.MonthlyRevenue.Add(new MonthlyStatisticDto
                    {
                        Month = dayName,
                        Value = dayOrders.Where(x => x.Status == OrderStatus.Completed).Sum(x => x.TotalAmount)
                    });
                }
            }
            else
            {
                // Default: Monthly Statistics (Last 6 months)
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

            // Recent Orders (last 5)
            result.RecentOrders = allOrders
                .OrderByDescending(x => x.OrderDate)
                .Take(5)
                .Select(x => new RecentOrderDto
                {
                    Id = x.Id,
                    UserName = x.User?.FullName ?? x.User?.Email,
                    ServicePlanName = x.ServicePlan?.Name,
                    TotalAmount = x.TotalAmount,
                    Status = x.Status.ToString(),
                    CreatedAt = x.OrderDate
                })
                .ToList();

            return result;
        }
    }
}
