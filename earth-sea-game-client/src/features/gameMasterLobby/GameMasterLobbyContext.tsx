import { QueryKeys } from "@lib/QueryKeys";
import { GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Resource, createContext, createEffect, createResource, createSignal } from "solid-js";

function createMyLobbyQuery() {
    return createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
    }));
}

function createSignalResource(query: ReturnType<typeof createMyLobbyQuery>) {
    // Could not make it work creating a signal like () => {query.data}, with that it triggers the createResource three times
    // I'll try to make it better
    const [queryData, setQueryData] = createSignal<GameMasterLobby | undefined>(undefined);
    createEffect(() => {
        if (query.isSuccess && !!query.data) {
            setQueryData(query.data);
        }
    });

    return createResource(queryData, async (data) => {
        if (!data) {
            return undefined;
        }

        const accessToken = data.accessToken;
        const signalRConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7071/hubs/chat", {
                accessTokenFactory: () => accessToken,
            })
            .build();

        await signalRConnection.start();

        signalRConnection.on("Echo", () => {
            console.log("Received Echo");
        });

        return signalRConnection;
    });
}

interface GameMasterLobbyContextProps {
    query: ReturnType<typeof createMyLobbyQuery>;
    signalRConnection: Resource<HubConnection | undefined>;
}

export const GameMasterLobbyContext = createContext<GameMasterLobbyContextProps>();

export function GameMasterLobbyContextProvider(props: { children: JSXElement }) {
    const query = createMyLobbyQuery();
    const [signalRConnection] = createSignalResource(query);

    return (
        <GameMasterLobbyContext.Provider
            value={{
                query,
                signalRConnection: signalRConnection,
            }}
        >
            {props.children}
        </GameMasterLobbyContext.Provider>
    );
}
