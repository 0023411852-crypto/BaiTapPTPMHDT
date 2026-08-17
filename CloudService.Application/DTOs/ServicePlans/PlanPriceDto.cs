using System;

namespace CloudService.Application.DTOs.ServicePlans
{
    public class PlanPriceDto
    {
        public Guid Id { get; set; }
        public Guid ServicePlanId { get; set; }
        public int BillingCycle { get; set; }
        public decimal Price { get; set; }
        public decimal SetupFee { get; set; }
    }
}
