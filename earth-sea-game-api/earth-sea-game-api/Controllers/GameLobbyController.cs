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
using EarthSeaGameApi.Services;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameLobbyController(IGameLobbyService gameLobbyService, IJwtService jwtService) : ControllerBase
    {
        [HttpGet]
        [Route("my")]
        public async Task<IActionResult> GetMyLobby()
        {
            var myLobby = await gameLobbyService.GetLobbyForGameMasterAsync("Pumkko");
            if(myLobby == null)
            {
                return NoContent();
            }

            return Ok(myLobby);
        }

        [HttpPost]
        [Route("my")]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobby gameLobbyToCreate)
        {
            var createdLobby = await gameLobbyService.CreateLobbyForGameMasterAsync(gameLobbyToCreate, "Pumkko");
            return Ok(createdLobby);
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
        public async Task<ActionResult> JoinLobby([FromBody] JoinLobbyInput joinLobbyInput)
        {
            var gameMasterLobby = await gameLobbyService.GetLobbyForGameMasterAsync(joinLobbyInput.GameMasterName);
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

            await gameLobbyService.JoinLobbyAsync(lobbyNationToJoin.Name, gameMasterLobby.Id, gameMasterLobby.GameMaster);
            var token = await jwtService.GenerateTokenForGameAsync(gameMasterLobby.GameMaster, lobbyNationToJoin.Name);
            return Ok(token);
        }
    }
}
