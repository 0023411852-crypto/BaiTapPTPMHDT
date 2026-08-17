namespace CloudService.Application.DTOs.ServicePlans
{
    public class PriceDetailDto
    {
        public int Months { get; set; }
        public decimal BasePrice { get; set; }
        public decimal DiscountPercentage { get; set; }
    }
}
