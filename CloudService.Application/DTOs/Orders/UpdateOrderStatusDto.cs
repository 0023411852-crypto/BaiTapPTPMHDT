using System.ComponentModel.DataAnnotations;
using CloudService.Domain.Enums;

namespace CloudService.Application.DTOs.Orders
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public OrderStatus Status { get; set; }
    }
}
