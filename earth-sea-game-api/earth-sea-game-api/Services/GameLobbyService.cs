using EarthSeaGameApi.Configs;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Cosmos;
using EarthSeaGameApi.Models;
using Microsoft.Azure.Cosmos.Linq;
using System.Text.Json;
using EarthSeaGameApi.Models.Inputs;

namespace EarthSeaGameApi.Services
{
    public class GameLobbyService : IGameLobbyService
    {
        private readonly Container gameLobbyContainer;

        public GameLobbyService(IConfiguration configuration)
        {
            var databaseConfig = configuration.GetSection(CosmosDbConfig.ConfigKey).Get<CosmosDbConfig>();
            if (databaseConfig == null)
            {
                throw new Exception("Bad configuration CosmosDbConfig");
            }

            var cosmosClient = new CosmosClientBuilder(databaseConfig.DatabaseConnectionString)
               .WithSerializerOptions(new CosmosSerializationOptions()
               {
                   PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
               }).Build();

            gameLobbyContainer = cosmosClient.GetContainer(databaseConfig.DatabaseName, databaseConfig.ContainerName);
        }

        public async Task<GameLobby> CreateLobbyForGameMasterAsync(CreateGameLobbyInput gameLobbyToCreate, string gameMasterName)
        {
            var gameLobbyModel = new GameLobby()
            {
                Id = Guid.NewGuid().ToString(),
                LobbyName = gameLobbyToCreate.LobbyName,
                GameMaster = "Pumkko",
                EarthNation = new Nation()
                {
                    InviteCode = Guid.NewGuid(),
                    Name = ENation.EarthNation,
                    InviteCodeCreationDate = DateTimeOffset.UtcNow,
                    InviteCodeAlreadyUsed = false
                },
                SeaNation = new Nation()
                {
                    InviteCode = Guid.NewGuid(),
                    Name = ENation.SeaNation,
                    InviteCodeCreationDate = DateTimeOffset.UtcNow,
                    InviteCodeAlreadyUsed = false
                },
                EasternIsland = new Nation()
                {
                    InviteCode = Guid.NewGuid(),
                    Name = ENation.EasternIsland,
                    InviteCodeCreationDate = DateTimeOffset.UtcNow,
                    InviteCodeAlreadyUsed = false
                }
            };
            var response = await gameLobbyContainer.CreateItemAsync(gameLobbyModel, new PartitionKey(gameLobbyModel.GameMaster));
            return response.Resource;
        }

        public async Task<GameLobby?> GetLobbyForGameMasterAsync(string gameMasterName)
        {

            using var getLobbyIterator = gameLobbyContainer.GetItemLinqQueryable<GameLobby>()
                    .Where(g => g.GameMaster == gameMasterName)
                    .ToFeedIterator();

            if (!getLobbyIterator.HasMoreResults)
            {
                return null;
            }

            var currentPage = await getLobbyIterator.ReadNextAsync();
            var masterLobby = currentPage.SingleOrDefault();
            return masterLobby;
        }

        /// <inheritdoc/>
        public Task JoinLobbyAsync(string nation, string lobbyToJoinId, string lobbyToJoinGameMasterName)
        {
            var inviteCodeAlreadyUsedPropCamelCase = JsonNamingPolicy.CamelCase.ConvertName(nameof(Nation.InviteCodeAlreadyUsed));
            var nationPropCamelCase = JsonNamingPolicy.CamelCase.ConvertName(nation);
            var path = JsonNamingPolicy.CamelCase.ConvertName($"/{nationPropCamelCase}/{inviteCodeAlreadyUsedPropCamelCase}");
            var patchOperations = new List<PatchOperation>()
            {
                PatchOperation.Add(path, true)
            };
            return gameLobbyContainer.PatchItemAsync<GameLobby>(lobbyToJoinId, new PartitionKey(lobbyToJoinGameMasterName), patchOperations);
        }
    }
}
