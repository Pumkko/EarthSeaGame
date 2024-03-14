import { createQuery } from "@tanstack/solid-query";
import axios from "axios";
import { Match, Show, Switch } from "solid-js";
import CreateLobby from "./createLobby/CreateLobby";
import ManageLobby from "./manageLobby/ManageLobby";
import { QueryKeys } from "@lib/QueryKeys";
import { GameLobby, GameLobbySchema } from "@lib/schemas/GameLobbySchema";
export default function Lobby() {
  const query = createQuery<GameLobby | null>(() => ({
    queryKey: QueryKeys.lobby,
  }));

  return (
    <div class="h-screen bg-rocket bg-cover bg-center">
      <Switch>
        <Match when={query.isSuccess}>
          <Show when={!!query.data} fallback={<CreateLobby />}>
            <ManageLobby lobby={query.data!}></ManageLobby>
          </Show>
        </Match>
      </Switch>
    </div>
  );
}
