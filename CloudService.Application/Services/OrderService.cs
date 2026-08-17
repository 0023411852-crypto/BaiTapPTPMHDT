using AutoMapper;
using CloudService.Application.Common;
using CloudService.Application.DTOs.Orders;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Enums;
using CloudService.Domain.Interfaces;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;

namespace CloudService.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAuditLogService _auditLogService;

        public OrderService(IUnitOfWork unitOfWork, IMapper mapper, IAuditLogService auditLogService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _auditLogService = auditLogService;
        }

        public async Task<PagedResponse<OrderDto>> GetUserOrdersAsync(Guid userId, PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<OrderRequest>();
            var allData = await repo.GetAllAsync(); 
            var userOrders = allData.Where(x => x.UserId == userId).ToList();

            var pagedData = userOrders
                .OrderByDescending(x => x.OrderDate)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            var dtos = _mapper.Map<List<OrderDto>>(pagedData);
            return new PagedResponse<OrderDto>(dtos, userOrders.Count, filter.PageNumber, filter.PageSize);
        }

        public async Task<PagedResponse<OrderDto>> GetAllOrdersAsync(PaginationFilter filter)
        {
            var repo = _unitOfWork.Repository<OrderRequest>();
            var allData = await repo.GetAllAsync();

            var pagedData = allData
                .OrderByDescending(x => x.OrderDate)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            var dtos = _mapper.Map<List<OrderDto>>(pagedData);
            return new PagedResponse<OrderDto>(dtos, allData.Count(), filter.PageNumber, filter.PageSize);
        }

        public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto)
        {
            var planRepo = _unitOfWork.Repository<ServicePlan>();
            var plan = await planRepo.GetByIdAsync(dto.ServicePlanId);
            if (plan == null) throw new Exception("Service Plan not found");

            var priceRepo = _unitOfWork.Repository<PlanPrice>();
            var planPrice = await priceRepo.GetByIdAsync(dto.PlanPriceId);
            if (planPrice == null) throw new Exception("Plan Price not found");

            var order = new OrderRequest
            {
                UserId = userId,
                ServicePlanId = dto.ServicePlanId,
                PlanPriceId = dto.PlanPriceId,
                PromotionId = dto.PromotionId,
                CustomerNotes = dto.CustomerNotes,
                TotalAmount = planPrice.Price + planPrice.SetupFee,
                Status = OrderStatus.Pending,
                OrderDate = DateTime.UtcNow
            };

            await _unitOfWork.Repository<OrderRequest>().AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<bool> UpdateOrderStatusAsync(Guid orderId, string status)
        {
            var repo = _unitOfWork.Repository<OrderRequest>();
            var order = await repo.GetByIdAsync(orderId);
            if (order == null) return false;

            if (Enum.TryParse<OrderStatus>(status, true, out var parsedStatus))
            {
                order.Status = parsedStatus;
                repo.Update(order);
                await _unitOfWork.SaveChangesAsync();
                await _auditLogService.LogAsync(null, "UPDATE_ORDER_STATUS", "OrderRequest", order.Id.ToString(), $"New Status: {status}");
                return true;
            }
            return false;
        }

        public async Task<byte[]> ExportOrdersToExcelAsync()
        {
            var repo = _unitOfWork.Repository<OrderRequest>();
            var orders = await repo.GetQueryable()
                .Include(x => x.User)
                .Include(x => x.ServicePlan)
                .Include(x => x.PlanPrice)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();

            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Orders");

            // Header
            worksheet.Cell(1, 1).Value = "Order ID";
            worksheet.Cell(1, 2).Value = "Customer Name";
            worksheet.Cell(1, 3).Value = "Customer Email";
            worksheet.Cell(1, 4).Value = "Service";
            worksheet.Cell(1, 5).Value = "Price";
            worksheet.Cell(1, 6).Value = "Billing Cycle (Months)";
            worksheet.Cell(1, 7).Value = "Order Status";
            worksheet.Cell(1, 8).Value = "Created At";

            var headerRow = worksheet.Range(1, 1, 1, 8);
            headerRow.Style.Font.Bold = true;
            headerRow.Style.Fill.BackgroundColor = XLColor.LightGray;

            // Data
            int row = 2;
            foreach (var order in orders)
            {
                worksheet.Cell(row, 1).Value = order.Id.ToString();
                worksheet.Cell(row, 2).Value = order.User?.FullName ?? "Unknown";
                worksheet.Cell(row, 3).Value = order.User?.Email ?? "Unknown";
                worksheet.Cell(row, 4).Value = order.ServicePlan?.Name ?? "Unknown";
                worksheet.Cell(row, 5).Value = order.TotalAmount;
                worksheet.Cell(row, 6).Value = order.PlanPrice?.BillingCycle ?? 0;
                worksheet.Cell(row, 7).Value = order.Status.ToString();
                worksheet.Cell(row, 8).Value = order.OrderDate.ToString("yyyy-MM-dd HH:mm:ss");
                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return stream.ToArray();
        }
    }
}
