namespace EarthSeaGameApi.Configs
{
    public class CosmosDbConfig
    {
        public const string ConfigKey = "CosmosDb";

        public required string DatabaseConnectionString { get; set; }

        public required string DatabaseName { get; set; }

        public required string ContainerName { get; set; }
    }
}
