import { GameLobby } from "@lib/schemas/GameLobbySchema";

export interface ManageLobbyProps {
  lobby: GameLobby;
}

export default function ManageLobby(props: ManageLobbyProps) {
  return (
    <div class="text-white  flex items-center flex-col">
      {props.lobby.lobbyName}
    </div>
  );
}
