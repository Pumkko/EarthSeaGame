using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EarthSeaGameApi.Inputs;
using EarthSeaGameApi.Services;
using Microsoft.AspNetCore.SignalR;
using EarthSeaGameApi.Hubs;
using System.Diagnostics.CodeAnalysis;
using EarthSeaGameApi.Configs;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = AppAuthenticationScheme.EarthSeaGameBearer)]
    public class GameController(IGameLobbyService gameLobbyService, IJwtService jwtService) : ControllerBase
    {
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok();
        }

        [HttpPost]
        [Route("lobby/join")]
        [AllowAnonymous]
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
