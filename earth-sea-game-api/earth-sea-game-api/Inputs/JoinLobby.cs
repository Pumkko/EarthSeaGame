namespace EarthSeaGameApi.Inputs
{
    public class JoinLobby
    {
        public required string GameMasterName { get; set; }
        public required string Nation { get; set; }
        public required string InviteCode { get; set; }
    }
}
