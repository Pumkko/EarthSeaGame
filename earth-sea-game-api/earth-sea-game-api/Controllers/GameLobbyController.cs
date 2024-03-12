using EarthSeaGameApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace EarthSeaGameApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameLobbyController : ControllerBase
    {

        private readonly ILogger<GameLobbyController> _logger;

        public GameLobbyController(ILogger<GameLobbyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<GameLobby> Get()
        {
            return new List<GameLobby>();   
        }
    }
}
