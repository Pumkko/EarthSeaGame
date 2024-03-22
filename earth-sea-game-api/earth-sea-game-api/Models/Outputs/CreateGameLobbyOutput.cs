namespace EarthSeaGameApi.Models.Outputs
{
    public class CreateGameLobbyOutput
    {
        public required string AccessToken { get; set; }

        public required GameLobby CreatedGameLobby { get; set; }
    }
}
