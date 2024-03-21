using EarthSeaGameApi.Configs;
using EarthSeaGameApi.Inputs;
using EarthSeaGameApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("api/game/my")]
    [Authorize(AuthenticationSchemes = AppAuthenticationScheme.AzureAdBearer)]
    public class GameMasterController(IGameLobbyService gameLobbyService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetMyLobby()
        {
            var myLobby = await gameLobbyService.GetLobbyForGameMasterAsync("Pumkko");
            if (myLobby == null)
            {
                return NoContent();
            }

            return Ok(myLobby);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewLobby([FromBody] CreateGameLobby gameLobbyToCreate)
        {
            var createdLobby = await gameLobbyService.CreateLobbyForGameMasterAsync(gameLobbyToCreate, "Pumkko");
            return Ok(createdLobby);
        }

    }
}
