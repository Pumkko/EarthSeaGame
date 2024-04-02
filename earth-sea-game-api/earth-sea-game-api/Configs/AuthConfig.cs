namespace EarthSeaGameApi.Configs
{
    public class AuthConfig
    {
        public const string ConfigKey = "Auth";

        public required string Issuer { get; set; }

        public required string Audience { get; set; }
    }
}
