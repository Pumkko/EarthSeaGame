namespace EarthSeaGameApi.Services
{
    public interface IJwtService
    {
        public Task<string> GenerateTokenForGameAsync(string gameMaster, string nation);
    }
}