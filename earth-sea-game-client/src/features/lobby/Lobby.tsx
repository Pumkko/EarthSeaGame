import { createQuery } from "@tanstack/solid-query";
import axios from "axios";
import { Match, Show, Switch, createEffect } from "solid-js";
import { GameLobby } from "../../schemas/GameLobbySchema";
import CreateLobby from "./createLobby/CreateLobby";
import { QueryKeys } from "../../lib/QueryKeys";
export default function Lobby() {
  const query = createQuery<GameLobby | null>(() => ({
    queryKey: QueryKeys.lobby,
    queryFn: async () => {
      const targetUrl = new URL(
        "GameLobby/my",
        import.meta.env.VITE_API_ROOT_URL,
      );
      const response = await axios.get<GameLobby>(targetUrl.href);
      if (response.status === 204) {
        return null;
      }
      return response.data;
    },
  }));

  createEffect(() => {
    console.log("data", query.data);
  });

  return (
    <div class="h-screen bg-rocket bg-cover bg-center flex items-center flex-col">
      <h1 class="text-9xl text-white mt-2">My Games</h1>
      <Switch>
        <Match when={query.isSuccess}>
          <Show when={!!query.data} fallback={<CreateLobby />}>
            <p class="text-white">{query.data?.lobbyName}</p>
          </Show>
        </Match>
      </Switch>
    </div>
  );
}
