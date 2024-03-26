using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Models;
using EarthSeaGameApi.Models.Inputs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace EarthSeaGameApi.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private const string EARTH_SEA_GROUP = "EarthSeaGroup";

        private const string EARTH_EASTERN_GROUP = "EarthThirdNationGroup";

        private const string SEA_EASTERN_GROUP = "SeaThirdNationGroup";

        public Task JoinEarthSeaGroup() => Groups.AddToGroupAsync(Context.ConnectionId, EARTH_SEA_GROUP);

        public Task JoinEarthThirdNationGroup() => Groups.AddToGroupAsync(Context.ConnectionId, EARTH_EASTERN_GROUP);

        public Task JoinSeaThirdNationGroup() => Groups.AddToGroupAsync(Context.ConnectionId, SEA_EASTERN_GROUP);

        public override async Task OnConnectedAsync()
        {
            var userName = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
            var gameMasterName = Context.User?.FindFirst(AppClaims.GameMasterName)?.Value!;
            var nation = Context.User?.FindFirst(AppClaims.Nation)?.Value!;
            var isUserGameMaster = bool.Parse(Context.User?.FindFirst(AppClaims.IsGameMaster)?.Value ?? "false");

            string[] groupsToJoin;
            if (isUserGameMaster)
            {
                groupsToJoin = [EARTH_SEA_GROUP, EARTH_EASTERN_GROUP, SEA_EASTERN_GROUP];
            }
            else
            {
                groupsToJoin = nation switch
                {
                    ENation.SeaNation => [EARTH_SEA_GROUP, SEA_EASTERN_GROUP],
                    ENation.EarthNation => [EARTH_SEA_GROUP, EARTH_EASTERN_GROUP],
                    ENation.EasternIsland => [SEA_EASTERN_GROUP, EARTH_EASTERN_GROUP],
                    _ => []
                };
            }

            await Task.WhenAll(groupsToJoin.Select(g => Groups.AddToGroupAsync(Context.ConnectionId, $"{gameMasterName}:{g}")));
            await base.OnConnectedAsync();
        }

        public Task PlayerSendToOtherPlayer (string recipientPlayer, string message)
        {
            var gameMasterName = Context.User?.FindFirst(AppClaims.GameMasterName)?.Value!;
            var nation = Context.User?.FindFirst(AppClaims.Nation)?.Value!;
            if (recipientPlayer == "GameMaster")
            {
                return Clients.User(gameMasterName).SendAsync($"playerSentToGameMaster", nation, message);
            }

            return Clients.Caller.SendAsync("Echo", "Hello");
        }

        public Task GameMasterSendToPlayer(string nation, string message)
        {
            var gameMasterName = Context.User?.FindFirst(AppClaims.GameMasterName)?.Value!;
            var isUserGameMaster = bool.Parse(Context.User?.FindFirst(AppClaims.IsGameMaster)?.Value ?? "false");
            if(!isUserGameMaster)
            {
                // Temporary before i use auth policies
                throw new UnauthorizedAccessException("Only game master can directly send to player");
            }

            return Clients.User($"{gameMasterName}:{nation}").SendAsync($"gameMasterSentToPlayer", message);
        }


        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                    .SendAsync("echo", name, $"{message} (echo from server)");
    }
}
