using AutoMapper;
using CloudService.Application.Common;
using CloudService.Application.DTOs.ServicePlans;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CloudService.Application.Services
{
    public class ServicePlanService : IServicePlanService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServicePlanService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PagedResponse<ServicePlanDto>> GetAllAsync(PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<ServicePlan>();
            var allDataQuery = repo.GetQueryable().Include(x => x.Prices);
            var totalCount = await allDataQuery.CountAsync();
            
            var pagedData = await allDataQuery
                .OrderByDescending(x => x.CreatedAt)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<ServicePlanDto>>(pagedData);
            return new PagedResponse<ServicePlanDto>(dtos, totalCount, filter.PageNumber, filter.PageSize);
        }

        public async Task<ServicePlanDto?> GetByIdAsync(Guid id)
        {
            var repo = _unitOfWork.Repository<ServicePlan>();
            var entity = await repo.GetQueryable().Include(x => x.Prices).FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null) return null;
            return _mapper.Map<ServicePlanDto>(entity);
        }

        public async Task<ServicePlanDto> CreateAsync(CreateServicePlanDto dto)
        {
            var catRepo = _unitOfWork.Repository<ServiceCategory>();
            if (await catRepo.GetByIdAsync(dto.CategoryId) == null)
            {
                throw new Exception("Category not found");
            }

            var entity = _mapper.Map<ServicePlan>(dto);
            
            // Auto generate a dummy QR Code URL (or base64) for this plan checkout
            entity.QRCodeBase64 = $"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=checkout-plan-{Guid.NewGuid()}";

            // Save plan first to get ID
            await _unitOfWork.Repository<ServicePlan>().AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            // Create PlanPrice based on the array
            foreach (var p in dto.Prices)
            {
                var priceEntity = new PlanPrice
                {
                    ServicePlanId = entity.Id,
                    BillingCycle = p.Months,
                    Price = p.BasePrice * (1 - (p.DiscountPercentage / 100m)),
                    IsActive = true
                };
                await _unitOfWork.Repository<PlanPrice>().AddAsync(priceEntity);
            }
            await _unitOfWork.SaveChangesAsync();

            // Refresh entity to include prices
            entity = await _unitOfWork.Repository<ServicePlan>().GetQueryable().Include(x => x.Prices).FirstOrDefaultAsync(x => x.Id == entity.Id);
            return _mapper.Map<ServicePlanDto>(entity);
        }

        public async Task<ServicePlanDto> UpdateAsync(Guid id, UpdateServicePlanDto dto)
        {
            var repo = _unitOfWork.Repository<ServicePlan>();
            var entity = await repo.GetQueryable().Include(x => x.Prices).FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null) throw new Exception("Plan not found");

            var catRepo = _unitOfWork.Repository<ServiceCategory>();
            if (await catRepo.GetByIdAsync(dto.CategoryId) == null)
            {
                throw new Exception("Category not found");
            }

            _mapper.Map(dto, entity);
            repo.Update(entity);
            
            // Update or create Price
            var priceRepo = _unitOfWork.Repository<PlanPrice>();
            
            foreach (var p in dto.Prices)
            {
                var existingPrice = entity.Prices.FirstOrDefault(x => x.BillingCycle == p.Months);
                decimal finalPrice = p.BasePrice * (1 - (p.DiscountPercentage / 100m));
                
                if (existingPrice != null)
                {
                    existingPrice.Price = finalPrice;
                    priceRepo.Update(existingPrice);
                }
                else
                {
                    var newPrice = new PlanPrice
                    {
                        ServicePlanId = entity.Id,
                        BillingCycle = p.Months,
                        Price = finalPrice,
                        IsActive = true
                    };
                    await priceRepo.AddAsync(newPrice);
                }
            }
            
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ServicePlanDto>(entity);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var repo = _unitOfWork.Repository<ServicePlan>();
            var entity = await repo.GetByIdAsync(id);
            if (entity == null) return false;

            repo.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
