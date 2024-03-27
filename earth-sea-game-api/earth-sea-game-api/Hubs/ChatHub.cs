using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace EarthSeaGameApi.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private const string EARTH_SEA_GROUP = "EarthSeaGroup";

        private const string EARTH_EASTERN_GROUP = "EarthEasternGroup";

        private const string SEA_EASTERN_GROUP = "SeaEasternGroup";

        private readonly Dictionary<string, Dictionary<string, string>> groupToUseForSenderToRecipientMessage = new()
        {
            {
                ENation.EarthNation, new()
                {
                    {
                        ENation.EasternIsland, EARTH_EASTERN_GROUP
                    },
                    {
                        ENation.SeaNation, EARTH_SEA_GROUP
                    }
                }
            },
            {
                ENation.SeaNation, new()
                {
                    {
                        ENation.EarthNation, EARTH_SEA_GROUP
                    },
                    {
                        ENation.EasternIsland, SEA_EASTERN_GROUP
                    }
                }
            },
            {
                ENation.EasternIsland, new()
                {
                    {
                        ENation.EarthNation, EARTH_EASTERN_GROUP
                    },
                    {
                        ENation.SeaNation, SEA_EASTERN_GROUP
                    }
                }
            }
        };

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



            await Task.WhenAll(groupsToJoin.Select(g => Groups.AddToGroupAsync(Context.ConnectionId, GetGroupNameForGameMaster(gameMasterName, g))));
            await base.OnConnectedAsync();
        }

        public Task PlayerSendToOtherPlayer(string recipientPlayer, string message)
        { 
            var gameMasterName = Context.User?.FindFirst(AppClaims.GameMasterName)?.Value!;
            var sendingPlayer = Context.User?.FindFirst(AppClaims.Nation)?.Value!;
            if (recipientPlayer == "GameMaster")
            {
                return Clients.User(gameMasterName).SendAsync("playerSentToGameMaster", sendingPlayer, message);
            }
            else
            {
                var group = groupToUseForSenderToRecipientMessage[sendingPlayer][recipientPlayer];
                var fullGroupName = GetGroupNameForGameMaster(gameMasterName, group);
                return Clients.Group(fullGroupName).SendAsync("playerSentToOtherPlayer", sendingPlayer, recipientPlayer, message);
            }
        }

        public Task GameMasterSendToPlayer(string nation, string message)
        {
            var gameMasterName = Context.User?.FindFirst(AppClaims.GameMasterName)?.Value!;
            var isUserGameMaster = bool.Parse(Context.User?.FindFirst(AppClaims.IsGameMaster)?.Value ?? "false");
            if (!isUserGameMaster)
            {
                // Temporary before i use auth policies
                throw new UnauthorizedAccessException("Only game master can directly send to player");
            }

            return Clients.User($"{gameMasterName}:{nation}").SendAsync("gameMasterSentToPlayer", message);
        }


        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                    .SendAsync("echo", name, $"{message} (echo from server)");

        private static string GetGroupNameForGameMaster(string gameMasterName, string groupName)
        {
            return $"{gameMasterName}:{groupName}";
        }
    }
}
