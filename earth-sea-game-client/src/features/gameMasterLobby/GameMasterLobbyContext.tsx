import { QueryKeys } from "@lib/QueryClient";
import { GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Resource, createContext, createResource, onCleanup } from "solid-js";
import { GameMasterSpyChatResources, createGameMasterSpyChatResources } from "./GameMasterSpyChatResources";
import { GameMasterChatWithPlayerResources, createGameMasterTeamsChatResources } from "./GameMasterTeamsChatResources";

function createMyLobbyQuery() {
    return createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
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

interface GameMasterLobbyContextProps {
    query: ReturnType<typeof createMyLobbyQuery>;
    signalRConnection: Resource<HubConnection | undefined>;
    teamsChat: GameMasterChatWithPlayerResources;
    spyChat: GameMasterSpyChatResources;
}

export const GameMasterLobbyContext = createContext<GameMasterLobbyContextProps>();

export function GameMasterLobbyContextProvider(props: { children: JSXElement }) {
    const query = createMyLobbyQuery();

    const token = () => query.data?.accessToken;
    const gameMaster = () => query.data?.gameLobby.gameMaster;

    const [signalRConnection] = createSignalResource(token);

    const teamsChat = createGameMasterTeamsChatResources(signalRConnection, gameMaster);
    const spyChat = createGameMasterSpyChatResources(signalRConnection, gameMaster);

    return (
        <GameMasterLobbyContext.Provider
            value={{
                query,
                signalRConnection,
                teamsChat,
                spyChat,
            }}
        >
            {props.children}
        </GameMasterLobbyContext.Provider>
    );
}
