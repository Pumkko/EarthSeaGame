using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EarthSeaGameApi.Inputs;
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
