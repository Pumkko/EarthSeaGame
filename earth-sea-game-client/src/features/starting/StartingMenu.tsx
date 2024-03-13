import { useNavigate } from "@solidjs/router";
import StartingMenuButton from "./components/StartingMenuButton";
import Routes from "../../lib/Routes";

export default function StartingMenu() {
  const navigate = useNavigate();

  const onStartNewGame = () => {
    navigate(Routes.newGameLobby);
  };

  const onJoinGame = () => {
    navigate(Routes.lobbies);
  };

  return (
    <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
      <h1 class="text-9xl text-white">Between Earth and Sea</h1>
      <div class="flex gap-8">
        <StartingMenuButton onClick={onStartNewGame}>
          Start New Game
        </StartingMenuButton>
        <StartingMenuButton onclick={onJoinGame}>Join Game</StartingMenuButton>
      </div>
    </div>
  );
}
