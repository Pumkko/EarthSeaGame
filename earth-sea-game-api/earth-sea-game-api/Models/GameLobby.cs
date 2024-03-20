namespace EarthSeaGameApi.Models
{

    public static class ENation
    {
        public const string EarthNation = "earthNation";
        public const string SeaNation = "seaNation";
        public const string EasternIsland = "easternIsland";
    }

    public class Nation
    {
        public static readonly TimeSpan InviteCodeLifeTime = TimeSpan.FromMinutes(5);

        public required string Name { get; set; }

        public required Guid InviteCode { get; set; }

        public required DateTimeOffset InviteCodeCreationDate {  get; set; } 

        public required bool InviteCodeAlreadyUsed { get; set; }
    }

    public class GameLobby
    {
        public required string Id { get; set; }

        public required string GameMaster { get; set; }

        public required string LobbyName { get; set; }

        public required Nation EarthNation { get; set; }

        public required Nation SeaNation { get; set; }

        public required Nation EasternIsland { get; set; }
    }
}
