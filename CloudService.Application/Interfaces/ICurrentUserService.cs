using System;

namespace CloudService.Application.Interfaces
{
    public interface ICurrentUserService
    {
        Guid? UserId { get; }
    }
}
