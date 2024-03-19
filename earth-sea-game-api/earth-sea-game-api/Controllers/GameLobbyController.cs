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
        public ActionResult JoinLobby([FromBody] JoinLobby joinLobby)
        {
            try
            {
                var factoryProvider = new CustomCryptoProviderFactory();
                var cred = new SigningCredentials(new RsaSecurityKey(RSA.Create()), SecurityAlgorithms.RsaSha256)
                {
                    CryptoProviderFactory = factoryProvider
                };
                var jwtTokenDescriptor = new SecurityTokenDescriptor()
                {
                    Issuer = "https://localhost:7071",
                    Audience = "http://localhost:5173",
                    SigningCredentials = cred,
                };

                var jwtHandler = new JwtSecurityTokenHandler();
                var token = jwtHandler.CreateJwtSecurityToken(jwtTokenDescriptor);
                var tokenString = jwtHandler.WriteToken(token);

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
