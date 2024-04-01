namespace EarthSeaGameApi.Configs
{
    public class KeyVaultConfig
    {
        public const string ConfigKey = "KeyVault";

        public required string KeyVaultUri { get; set; }

        public required string KeyVaultKeyName { get; set; }
    }
}
