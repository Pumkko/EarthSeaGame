using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EarthSeaGameApi.Services;
using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Models.Inputs;
using EarthSeaGameApi.Models.Outputs;
using System.Security.Claims;
using Microsoft.Net.Http.Headers;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GameController(IGameLobbyService gameLobbyService, IJwtService jwtService) : ControllerBase
    {
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok();
        }


        /// <summary>
        /// Join a game with an existing and still valid token, if that succeed returns the game with the same token that was used to authorize the request
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("joinWithToken")]
        public async Task<IActionResult> JoinWithToken()
        {
            var gameMasterName = User.Claims.SingleOrDefault(c => c.Type == AppClaims.GameMasterName)?.Value;
            var playerNation = User.Claims.SingleOrDefault(c => c.Type == AppClaims.Nation)?.Value;

            if(gameMasterName == null || playerNation == null)
            {
                return Unauthorized();
            }

            var gameMasterLobby = await gameLobbyService.GetLobbyForGameMasterAsync(gameMasterName);
            if (gameMasterLobby == null)
            {
                return Unauthorized();
            }

            var output = new JoinGameWithTokenOutput()
            {
                GameMaster = gameMasterLobby.GameMaster,
                Nation = playerNation
            };

            return Ok(output);
        }


        [HttpPost]
        [Route("join")]
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

            var output = new JoinGameOutput() {  
                AccessToken = token,
                GameMaster = gameMasterLobby.GameMaster,
                Nation = lobbyNationToJoin.Name
            };

            return Ok(output);
        }
    }
}
