using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Models.Inputs;
using EarthSeaGameApi.Models.Outputs;
using EarthSeaGameApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("api/game/my")]
    [Authorize(AuthenticationSchemes = AppAuthenticationScheme.AzureAdBearer)]
    public class GameMasterController(IGameLobbyService gameLobbyService, IJwtService jwtService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetMyLobby()
        {
            var connectedUser = User.Claims.SingleOrDefault(c => c.Type == ClaimValueTypes.Email)?.Value;
            if (connectedUser == null)
            {
                throw new Exception("No Email claim in Entra Id token");
            }

            var myLobby = await gameLobbyService.GetLobbyForGameMasterAsync(connectedUser);
            if (myLobby == null)
            {
                return NoContent();
            }

            var gameMasterToken = await jwtService.GenerateTokenForGameMasterAsync(connectedUser);

            var output = new GameMasterLobbyOutput()
            {
                AccessToken = gameMasterToken,
                GameLobby = myLobby
            };

            return Ok(output);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobbyInput gameLobbyToCreate)
        {
            var connectedUser = User.Claims.SingleOrDefault(c => c.Type == ClaimValueTypes.Email)?.Value;
            if (connectedUser == null)
            {
                throw new Exception("No Email claim in Entra Id token");
            }

            var createdLobby = await gameLobbyService.CreateLobbyForGameMasterAsync(gameLobbyToCreate, connectedUser);
            var gameMasterToken = await jwtService.GenerateTokenForGameMasterAsync(connectedUser);

            var output = new GameMasterLobbyOutput()
            {
                AccessToken = gameMasterToken,
                GameLobby = createdLobby
            };

            return Ok(output);
        }

    }
}
