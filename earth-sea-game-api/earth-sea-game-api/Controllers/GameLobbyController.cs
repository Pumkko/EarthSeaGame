using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Cosmos;
using Microsoft.Identity.Web.Resource;
using Azure.Identity;
using System.Configuration;
using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Inputs;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameLobbyController(IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        public IEnumerable<GameLobby> Get()
        {
            return [];
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobby gameLobbyToCreate)
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

            var database = cosmosClient.GetDatabase(databaseConfig.DatabaseName);
            var container = database.GetContainer(databaseConfig.ContainerName);

            var gameLobbyModel = new GameLobby()
            {
                Id = Guid.NewGuid(),
                LobbyName = gameLobbyToCreate.LobbyName
            };
            var response = await container.UpsertItemAsync(gameLobbyModel, new PartitionKey(gameLobbyModel.LobbyName));
            return Ok(response.Resource);


        }
    }
}
