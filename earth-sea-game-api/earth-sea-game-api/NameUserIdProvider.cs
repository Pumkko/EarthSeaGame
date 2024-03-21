using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace EarthSeaGameApi
{
    public class NameUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        }
    }
}
