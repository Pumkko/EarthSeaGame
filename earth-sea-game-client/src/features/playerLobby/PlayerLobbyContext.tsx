import { QueryKeys } from "@lib/QueryClient";
import { JoinGameOutput } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Resource, createContext, createResource } from "solid-js";
import { PlayerChatWithOtherPlayersResources, createPlayerChatResources } from "./PlayerChatResources";

export type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: string;
    readonly inviteCode: string;
};

function createPlayerLobbyQuery() {
    return createQuery<JoinGameOutput | null>(() => ({
        queryKey: QueryKeys.playerLobby,
    }));
}

function createSignalResource(token: () => string | undefined) {
    return createResource(token, async (accessToken) => {
        const signalRConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7071/hubs/chat", {
                accessTokenFactory: () => accessToken,
            })
            .build();

        await signalRConnection.start();
        return signalRConnection;
    });
}

interface PlayerLobbyContextProps {
    signalRConnection: Resource<HubConnection | undefined>;
    query: ReturnType<typeof createPlayerLobbyQuery>;
    teamsChat: PlayerChatWithOtherPlayersResources;
    currentGame: () => JoinGameOutput | undefined;
}

export const PlayerLobbyContext = createContext<PlayerLobbyContextProps>();

export function PlayerLobbyContextProvider(props: { children: JSXElement }) {
    const query = createPlayerLobbyQuery();

    const token = () => query.data?.accessToken;
    const currentGame = () => query.data ?? undefined;

    const [signalRConnection] = createSignalResource(token);

    const teamsChat = createPlayerChatResources(signalRConnection, currentGame);

    return (
        <PlayerLobbyContext.Provider
            value={{
                query,
                signalRConnection,
                teamsChat,
                currentGame,
            }}
        >
            {props.children}
        </PlayerLobbyContext.Provider>
    );
}
