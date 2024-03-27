import { QueryKeys } from "@lib/QueryKeys";
import { GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Resource, createContext, createResource } from "solid-js";
import { GameMasterChatWithPlayerResources, createGameMasterTeamsChatResources } from "./GameMasterTeamsChatResources";
import { GameMasterSpyChatResources, createGameMasterSpyChatResources } from "./GameMasterSpyChatResources";

function createMyLobbyQuery() {
    return createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
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
