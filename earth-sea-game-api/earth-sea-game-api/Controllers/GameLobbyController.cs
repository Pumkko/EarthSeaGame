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
using System.ComponentModel;
using Microsoft.Azure.Cosmos.Linq;
using System.IdentityModel.Tokens.Jwt;
using Azure.Security.KeyVault.Keys;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System;
using Azure.Security.KeyVault.Keys.Cryptography;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameLobbyController : ControllerBase
    {
        private readonly Microsoft.Azure.Cosmos.Container gameLobbyContainer;

        public GameLobbyController(IConfiguration configuration)
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


        [HttpGet("my")]
        public async Task<IActionResult> GetMyLobby()
        {
            using var setIterator = gameLobbyContainer.GetItemLinqQueryable<GameLobby>()
                                .Where(g => g.GameMaster == "Pumkko")
                                .ToFeedIterator();

            if (!setIterator.HasMoreResults)
            {
                return NoContent();
            }

            var currentPage = await setIterator.ReadNextAsync();
            var myLobby = currentPage.SingleOrDefault();
            return Ok(myLobby);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobby gameLobbyToCreate)
        {
            var gameLobbyModel = new GameLobby()
            {
                Id = Guid.NewGuid(),
                LobbyName = gameLobbyToCreate.LobbyName,
                GameMaster = "Pumkko",
                EarthNationInviteCode = Guid.NewGuid(),
                EasternIslandInviteCode = Guid.NewGuid(),
                SeaNationInviteCode = Guid.NewGuid()
            };
            var response = await gameLobbyContainer.CreateItemAsync(gameLobbyModel, new PartitionKey(gameLobbyModel.GameMaster));
            return Ok(response.Resource);


        }

        [HttpGet]
        [Route("test")]
        [Authorize]
        public ActionResult Test()
        {
            return Ok();
        }

        [HttpPost]
        [Route("join")]
        public async Task<ActionResult> JoinLobby([FromBody] JoinLobby joinLobby)
        {
            try
            {
                var jwt = new JwtSecurityToken("https://localhost:7071", "http://localhost:5173", [], DateTime.UtcNow, DateTime.UtcNow.AddSeconds(10));

                var header = @"{""alg"":""RS256"",""typ"":""JWT""}";
                var payload = JsonSerializer.Serialize(jwt.Payload);
                var headerAndPayload = $"{Base64UrlEncoder.Encode(header)}.{Base64UrlEncoder.Encode(payload)}";


                var cryptoClient = new CryptographyClient(new Uri("https://earth-sea-game-kv.vault.azure.net/keys/earth-sea-game-kv-key"), new DefaultAzureCredential());

                var digest = SHA256.HashData(Encoding.ASCII.GetBytes(headerAndPayload));
                var signature = (await cryptoClient.SignAsync(SignatureAlgorithm.RS256, digest)).Signature;

                var token = $"{headerAndPayload}.{Base64UrlEncoder.Encode(signature)}";
                return Ok(token);
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }

            return Ok();
        }
    }
}
