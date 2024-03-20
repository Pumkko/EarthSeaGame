using EarthSeaGameApi.Inputs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace EarthSeaGameApi.Hubs
{


    public class ChatHub : Hub
    {
        private const string EARTH_SEA_GROUP = "EarthSeaGroup";

        private const string EARTH_THIRD_NATION_GROUP = "EarthThirdNationGroup";

        private const string SEA_THIRD_NATION_GROUP = "SeaThirdNationGroup";

        public Task JoinEarthSeaGroup() => Groups.AddToGroupAsync(Context.ConnectionId, EARTH_SEA_GROUP);

        public Task JoinEarthThirdNationGroup() => Groups.AddToGroupAsync(Context.ConnectionId, EARTH_THIRD_NATION_GROUP);

        public Task JoinSeaThirdNationGroup() => Groups.AddToGroupAsync(Context.ConnectionId, SEA_THIRD_NATION_GROUP);

        public Task BroadcastMessage(string name, string message) =>
            Clients.All.SendAsync("broadcastMessage", name, message);

        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                    .SendAsync("echo", name, $"{message} (echo from server)");

        public Task JoinLobby([FromBody] JoinLobbyInput joinLobby)
        {
            return Clients.Client(Context.ConnectionId)
                .SendAsync("joinLobby", "Done");
        }
    }
}
