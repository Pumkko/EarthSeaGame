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
using Microsoft.Extensions.Azure;

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


        [HttpGet]
        [Route("my")]
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
        [Route("my")]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobby gameLobbyToCreate)
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
            return Ok(response.Resource);


        }

        [HttpGet]
        [Route("test")]
        [Authorize]
        public ActionResult Test()
        {
            return Ok();
        }

        /// <summary>
        /// I will split that function into smaller chunks one day but that day is not today
        /// </summary>
        /// <param name="joinLobbyInput"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("join")]
        public async Task<ActionResult> JoinLobby([FromBody] JoinLobbyInput joinLobbyInput)
        {
            using var getLobbyIterator = gameLobbyContainer.GetItemLinqQueryable<GameLobby>()
                   .Where(g => g.GameMaster == joinLobbyInput.GameMasterName)
                   .ToFeedIterator();

            if (!getLobbyIterator.HasMoreResults)
            {
                return Unauthorized();
            }

            var currentPage = await getLobbyIterator.ReadNextAsync();
            var gameMasterLobby = currentPage.SingleOrDefault();

            if (gameMasterLobby == null)
            {
                return Unauthorized();
            }

            var lobbyNationToJoin = joinLobbyInput.Nation switch
            {
                ENation.SeaNation => gameMasterLobby.SeaNation,
                ENation.EarthNation => gameMasterLobby.EarthNation,
                ENation.EasternIsland => gameMasterLobby.EasternIsland,
                _ => throw new Exception("Unknown Nation in input yet input passed model validation")
            };

            if (lobbyNationToJoin.InviteCode == joinLobbyInput.InviteCode && !lobbyNationToJoin.InviteCodeAlreadyUsed)
            {
                var expiringDate = lobbyNationToJoin.InviteCodeCreationDate.Add(Nation.InviteCodeLifeTime);
                if (DateTimeOffset.UtcNow > expiringDate)
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }

            var inviteCodeAlreadyUsedPropCamelCase = JsonNamingPolicy.CamelCase.ConvertName(nameof(Nation.InviteCodeAlreadyUsed));
            var path = JsonNamingPolicy.CamelCase.ConvertName($"/{joinLobbyInput.Nation}/{inviteCodeAlreadyUsedPropCamelCase}");
            var patchOperations = new List<PatchOperation>()
            {
                PatchOperation.Add(path, true)
            };
            await gameLobbyContainer.PatchItemAsync<GameLobby>(gameMasterLobby.Id, new PartitionKey(gameMasterLobby.GameMaster), patchOperations);


            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, $"{gameMasterLobby.GameMaster}:{lobbyNationToJoin.Name}")
            };

            var jwt = new JwtSecurityToken("https://localhost:7071", "http://localhost:5173", claims, DateTime.UtcNow, DateTime.UtcNow.AddHours(12));

            var header = @"{""alg"":""RS256"",""typ"":""JWT""}";
            var payload = JsonSerializer.Serialize(jwt.Payload);
            var headerAndPayload = $"{Base64UrlEncoder.Encode(header)}.{Base64UrlEncoder.Encode(payload)}";

            var cryptoClient = new CryptographyClient(new Uri("https://earth-sea-game-kv.vault.azure.net/keys/earth-sea-game-kv-key"), new DefaultAzureCredential());

            var digest = SHA256.HashData(Encoding.ASCII.GetBytes(headerAndPayload));
            var signature = (await cryptoClient.SignAsync(SignatureAlgorithm.RS256, digest)).Signature;
            var token = $"{headerAndPayload}.{Base64UrlEncoder.Encode(signature)}";

            return Ok(token);
        }
    }
}
