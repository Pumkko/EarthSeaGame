namespace EarthSeaGameApi.Models.Outputs
{
    public class GameMasterLobbyOutput
    {
        public required string AccessToken { get; set; }

        public required GameLobby GameLobby { get; set; }
    }
}
