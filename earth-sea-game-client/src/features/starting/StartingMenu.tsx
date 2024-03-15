import { useNavigate } from "@solidjs/router";
import StartingMenuButton from "./components/StartingMenuButton";
import Routes from "@lib/Routes";
import { QueryKeys } from "@lib/QueryKeys";
import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { createQuery } from "@tanstack/solid-query";
import { Match, Show, Switch } from "solid-js";

export default function StartingMenu() {
    const navigate = useNavigate();

    const query = createQuery<GameLobby | null>(() => ({
        queryKey: QueryKeys.lobby,
    }));
    const onCreateOrManageLobby = () => {
        if (query.data) {
            navigate(Routes.myLobby.root, {
                state: query.data,
            });
        } else {
            navigate(Routes.createLobby);
        }
    };

    return (
        <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
            <h1 class="text-9xl text-white">Between Earth and Seas</h1>
            <div class="flex gap-8">
                <StartingMenuButton>Join Lobby</StartingMenuButton>
                <StartingMenuButton disabled={query.isPending} onclick={onCreateOrManageLobby}>
                    <Show when={query.isPending}>
                        <svg class="animate-spin ml-1 mr-3 h-7 w-7 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                             />
                        </svg>
                    </Show>
                    <Switch>
                        <Match when={query.isPending}>Loading Lobby</Match>
                        <Match when={query.isSuccess && !query.data}>Create Lobby</Match>
                        <Match when={query.isSuccess && !!query.data}>My Lobby</Match>
                    </Switch>
                </StartingMenuButton>
            </div>
        </div>
    );
}
