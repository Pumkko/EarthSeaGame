import { GameLobby } from "@lib/schemas/GameLobbySchema";

export interface ManageLobbyProps {
  lobby: GameLobby;
}

export default function ManageLobby(props: ManageLobbyProps) {
  return <div>{props.lobby.lobbyName}</div>;
}
