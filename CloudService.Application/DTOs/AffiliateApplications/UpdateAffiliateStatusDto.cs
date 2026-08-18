using System.ComponentModel.DataAnnotations;
using CloudService.Domain.Enums;

namespace CloudService.Application.DTOs.AffiliateApplications
{
    public class UpdateAffiliateStatusDto
    {
        [Required]
        public AffiliateStatus Status { get; set; }
    }
}
