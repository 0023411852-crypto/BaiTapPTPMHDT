using AutoMapper;
using CloudService.Application.DTOs.Contacts;
using CloudService.Application.Interfaces;
using CloudService.Domain.Entities;
using CloudService.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CloudService.Application.Services
{
    public class ContactService : IContactService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ContactService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContactDto>> GetAllAsync()
        {
            var contacts = await _unitOfWork.Repository<Contact>().GetAllAsync();
            return _mapper.Map<IEnumerable<ContactDto>>(contacts);
        }

        public async Task<ContactDto> GetByIdAsync(Guid id)
        {
            var contact = await _unitOfWork.Repository<Contact>().GetByIdAsync(id);
            return _mapper.Map<ContactDto>(contact);
        }

        public async Task<ContactDto> CreateAsync(CreateContactDto dto)
        {
            var contact = _mapper.Map<Contact>(dto);
            contact.CreatedAt = DateTime.UtcNow;
            contact.Status = 0;
            
            await _unitOfWork.Repository<Contact>().AddAsync(contact);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<ContactDto>(contact);
        }

        public async Task<bool> MarkAsReadAsync(Guid id)
        {
            var contact = await _unitOfWork.Repository<Contact>().GetByIdAsync(id);
            if (contact == null) return false;

            contact.Status = 1;
            _unitOfWork.Repository<Contact>().Update(contact);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var contact = await _unitOfWork.Repository<Contact>().GetByIdAsync(id);
            if (contact == null) return false;

            _unitOfWork.Repository<Contact>().Delete(contact);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
