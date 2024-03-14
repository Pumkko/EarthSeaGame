namespace EarthSeaGameApi.Models
{
    public class GameLobby
    {
        public required Guid Id { get; set; }

        public required string GameMaster { get; set; }

        public required string LobbyName { get; set; }

        public required Guid EarthNationInviteCode {  get; set; }

        public required Guid SeaNationInviteCode { get; set; }

        public required Guid EasternIslandInviteCode { get; set; }
    }
}
