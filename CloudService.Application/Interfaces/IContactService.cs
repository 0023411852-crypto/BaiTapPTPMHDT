using CloudService.Application.DTOs.Contacts;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CloudService.Application.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDto>> GetAllAsync();
        Task<ContactDto> GetByIdAsync(Guid id);
        Task<ContactDto> CreateAsync(CreateContactDto dto);
        Task<bool> MarkAsReadAsync(Guid id);
        Task<bool> DeleteAsync(Guid id);
    }
}
