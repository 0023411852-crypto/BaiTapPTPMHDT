namespace CloudService.Application.DTOs.Statistics
{
    public class DashboardStatisticsDto
    {
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalUsers { get; set; }
        public int TotalServices { get; set; }
        
        public List<MonthlyStatisticDto> MonthlyOrders { get; set; } = new();
        public List<MonthlyStatisticDto> MonthlyRevenue { get; set; } = new();
        public List<OrderStatusStatisticDto> OrdersByStatus { get; set; } = new();
        public List<TopServiceStatisticDto> TopServices { get; set; } = new();
    }

    public class MonthlyStatisticDto
    {
        public string Month { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }

    public class OrderStatusStatisticDto
    {
        public string Status { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class TopServiceStatisticDto
    {
        public string ServiceName { get; set; } = string.Empty;
        public int OrderCount { get; set; }
    }
}
