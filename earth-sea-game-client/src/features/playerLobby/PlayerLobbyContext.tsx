import { QueryKeys } from "@lib/QueryClient";
import { JoinGameOutput } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Resource, createContext, createResource, onCleanup, useContext } from "solid-js";
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
    const [signalRConnection] = createResource(token, async (accessToken) => {
        const targetUrl = new URL("hubs/chat", import.meta.env.VITE_API_ROOT_URL);
        const signalRConnection = new HubConnectionBuilder()
            .withUrl(targetUrl.href, {
                accessTokenFactory: () => accessToken,
            })
            .build();

        await signalRConnection.start();
        return signalRConnection;
    });

    onCleanup(async () => {
        await signalRConnection()?.stop();
    });

    return [signalRConnection];
}

interface PlayerLobbyContextProps {
    signalRConnection: Resource<HubConnection | undefined>;
    query: ReturnType<typeof createPlayerLobbyQuery>;
    teamsChat: PlayerChatWithOtherPlayersResources;
    currentGame: () => JoinGameOutput | undefined;
    isAuthenticated: () => boolean;
}

const PlayerLobbyContext = createContext<PlayerLobbyContextProps>();

export function PlayerLobbyContextProvider(props: { children: JSXElement }) {
    const query = createPlayerLobbyQuery();

    const token = () => query.data?.accessToken;
    const currentGame = () => query.data ?? undefined;

    const [signalRConnection] = createSignalResource(token);

    const teamsChat = createPlayerChatResources(signalRConnection, currentGame);

    const isAuthenticated = () => !!token();

    return (
        <PlayerLobbyContext.Provider
            value={{
                query,
                signalRConnection,
                teamsChat,
                currentGame,
                isAuthenticated,
            }}
        >
            {props.children}
        </PlayerLobbyContext.Provider>
    );
}

export function usePlayerLobbyContext() {
    const context = useContext(PlayerLobbyContext);
    if (!context) {
        throw new Error("no Provider called for PlayerLobbyContext");
    }

    return context;
}
