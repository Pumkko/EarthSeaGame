using EarthSeaGameApi.Inputs;
using EarthSeaGameApi.Models;

namespace EarthSeaGameApi.Services
{
    public interface IGameLobbyService
    {
        public Task<GameLobby?> GetLobbyForGameMasterAsync(string gameMasterName);


        public Task<GameLobby> CreateLobbyForGameMasterAsync(CreateGameLobby gameLobbyToCreate, string gameMasterName);

        /// <summary>
        /// Join the given lobby Id, invalidate the invite code for the given nation
        /// </summary>
        /// <param name="nation">Nation to join, see ENation to get the possible values</param>
        /// <param name="lobbyToJoinId">Id of the lobby to join</param>
        /// <param name="lobbyToJoinGameMasterName">Game master name of the lobby, must match the one found for the lobby with the given id</param>
        /// <returns></returns>
        public Task JoinLobbyAsync(string nation, string lobbyToJoinId, string lobbyToJoinGameMasterName);
    }
}