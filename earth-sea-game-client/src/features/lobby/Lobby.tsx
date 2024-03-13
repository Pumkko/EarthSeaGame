import { createQuery } from "@tanstack/solid-query";
import axios from "axios";
import { For, Match, Switch } from "solid-js";
import { GameLobby } from "../../schemas/GameLobbySchema";

export default function Lobby() {
  const query = createQuery<GameLobby>(() => ({
    queryKey: ["lobbies"],
    queryFn: async () => {
      const targetUrl = new URL(
        "GameLobby/my",
        import.meta.env.VITE_API_ROOT_URL,
      );
      return axios.get(targetUrl.href).then((r) => r.data);
    },
  }));

  return (
    <div class="h-screen bg-rocket bg-cover bg-center flex items-center flex-col">
      <h1 class="text-9xl text-white mt-2">My Games</h1>
      <div class="flex">
        <Switch>
          <Match when={query.isSuccess}>
            <p class="text-white">{query.data?.lobbyName}</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
