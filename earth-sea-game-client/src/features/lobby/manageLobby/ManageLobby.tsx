import { GameLobby } from "@lib/schemas/GameLobbySchema";
import ManageLobbyAnchor from "./ManageLobbyAnchor";
import { Show, createSignal } from "solid-js";
import SpyChat from "./SpyChat";
import TeamsChat from "./TeamsChat";

export interface ManageLobbyProps {
  lobby: GameLobby;
}

export default function ManageLobby(props: ManageLobbyProps) {
  const [displayTeamsChat, setDisplayTeamsChat] = createSignal(true);

  return (
    <>
      <div class="text-2xl text-white border-b border-gray-200">
        <ul class="flex justify-center">
          <li class="m-2">
            <ManageLobbyAnchor
              isActive={displayTeamsChat()}
              onclick={() => {
                setDisplayTeamsChat(true);
              }}
            >
              Team Chat
            </ManageLobbyAnchor>
          </li>
          <li class="m-2">
            <ManageLobbyAnchor
              isActive={!displayTeamsChat()}
              onclick={() => {
                setDisplayTeamsChat(false);
              }}
            >
              Spy Chat
            </ManageLobbyAnchor>
          </li>
        </ul>
      </div>

      <Show when={displayTeamsChat()} fallback={<SpyChat />}>
        <TeamsChat />
      </Show>
    </>
  );
}
