using AutoMapper;
using CloudService.Application.DTOs.AffiliateApplications;
using CloudService.Application.DTOs.NewsArticles;
using CloudService.Application.DTOs.Orders;
using CloudService.Application.DTOs.ServiceCategories;
using CloudService.Application.DTOs.ServicePlans;
using CloudService.Application.DTOs.Users;
using CloudService.Application.DTOs.Promotions;
using CloudService.Application.DTOs.AuditLogs;
using CloudService.Domain.Entities;

namespace CloudService.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ServiceCategory, ServiceCategoryDto>();
            CreateMap<CreateServiceCategoryDto, ServiceCategory>()
                .ForMember(dest => dest.Slug, opt => opt.MapFrom(src => GenerateSlug(src.Name)));
            CreateMap<UpdateServiceCategoryDto, ServiceCategory>()
                .ForMember(dest => dest.Slug, opt => opt.MapFrom(src => GenerateSlug(src.Name)));

            CreateMap<ServicePlan, ServicePlanDto>();
            CreateMap<CreateServicePlanDto, ServicePlan>();
            CreateMap<UpdateServicePlanDto, ServicePlan>();
            CreateMap<PlanPrice, PlanPriceDto>();

            CreateMap<OrderRequest, OrderDto>();
            CreateMap<CreateOrderDto, OrderRequest>();

            CreateMap<Promotion, PromotionDto>();
            CreateMap<CreatePromotionDto, Promotion>();
            CreateMap<UpdatePromotionDto, Promotion>();

            CreateMap<AuditLog, AuditLogDto>()
                .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.User != null ? src.User.FullName : "System"));

            CreateMap<NewsArticle, NewsArticleDto>();
            CreateMap<CreateNewsArticleDto, NewsArticle>();
            CreateMap<UpdateNewsArticleDto, NewsArticle>();

            CreateMap<AffiliateApplication, AffiliateApplicationDto>();
            CreateMap<CreateAffiliateApplicationDto, AffiliateApplication>();
            CreateMap<UpdateAffiliateApplicationDto, AffiliateApplication>();

            CreateMap<Contact, CloudService.Application.DTOs.Contacts.ContactDto>();
            CreateMap<CloudService.Application.DTOs.Contacts.CreateContactDto, Contact>();

            CreateMap<Testimonial, CloudService.Application.DTOs.Testimonials.TestimonialDto>()
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.CompanyName));
            CreateMap<CloudService.Application.DTOs.Testimonials.CreateTestimonialDto, Testimonial>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company));

            CreateMap<AppUser, UserDto>();
        }

        private string GenerateSlug(string phrase)
        {
            string str = phrase.ToLowerInvariant();
            str = System.Text.RegularExpressions.Regex.Replace(str, @"[^a-z0-9\s-]", "");
            str = System.Text.RegularExpressions.Regex.Replace(str, @"\s+", " ").Trim();
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = System.Text.RegularExpressions.Regex.Replace(str, @"\s", "-");
            return str;
        }
    }
}
