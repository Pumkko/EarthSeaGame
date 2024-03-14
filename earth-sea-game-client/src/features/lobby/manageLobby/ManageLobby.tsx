import { GameLobby } from "@lib/schemas/GameLobbySchema";

export interface ManageLobbyProps {
  lobby: GameLobby;
}

export default function ManageLobby(props: ManageLobbyProps) {
  return <div class="text-white">{props.lobby.lobbyName}</div>;
}
