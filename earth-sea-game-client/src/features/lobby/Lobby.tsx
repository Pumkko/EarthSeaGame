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
    queryFn: async () => {
      const targetUrl = new URL(
        "GameLobby/my",
        import.meta.env.VITE_API_ROOT_URL,
      );
      const response = await axios.get<GameLobby>(targetUrl.href);
      if (response.status === 204) {
        return null;
      }

      const parseResult = GameLobbySchema.safeParse(response.data);
      if (!parseResult.success) {
        throw parseResult.error;
      }

      return response.data;
    },
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
