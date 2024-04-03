import { QueryKeys } from "@lib/QueryClient";
import { JoinGameOutput } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, Match, Resource, Switch, createContext, createResource, onCleanup, useContext } from "solid-js";
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

type AuthenticatedPlayerLobbyContextProps = {
    signalRConnection: Resource<HubConnection>;
    teamsChat: PlayerChatWithOtherPlayersResources;
    isAuthenticated: true;
    currentGame: () => JoinGameOutput;
};

type UnauthenticatedPlayerLobbyContextProps = {
    isAuthenticated: false;
};

type PlayerLobbyContextProps = AuthenticatedPlayerLobbyContextProps | UnauthenticatedPlayerLobbyContextProps;

const PlayerLobbyContext = createContext<PlayerLobbyContextProps | null>();

function AuthenticatedPlayerLobbyProvider(props: { children: JSXElement; data: JoinGameOutput }) {
    const token = () => props.data.accessToken;
    const currentGame = () => props.data;

    const [signalRConnection] = createSignalResource(token);

    const teamsChat = createPlayerChatResources(signalRConnection, currentGame);

    return (
        <PlayerLobbyContext.Provider
            value={{
                currentGame,
                signalRConnection,
                teamsChat,
                isAuthenticated: true,
            }}
        >
            {props.children}
        </PlayerLobbyContext.Provider>
    );
}

export function PlayerLobbyContextProvider(props: { children: JSXElement }) {
    const query = createPlayerLobbyQuery();

    return (
        <Switch>
            <Match when={query.isSuccess && !!query.data?.accessToken}>
                <AuthenticatedPlayerLobbyProvider data={query.data!}>{props.children}</AuthenticatedPlayerLobbyProvider>
            </Match>
            <Match when={query.isSuccess && !query.data?.accessToken}>
                <PlayerLobbyContext.Provider
                    value={{
                        isAuthenticated: false,
                    }}
                >
                    {props.children}
                </PlayerLobbyContext.Provider>
            </Match>
        </Switch>
    );
}

export function usePlayerLobbyContext() {
    const context = useContext(PlayerLobbyContext);
    if (!context) {
        throw new Error("no Provider called for PlayerLobbyContext");
    }

    return context;
}

export function useAuthenticatedPlayerLobbyContext() {
    const context = usePlayerLobbyContext();
    if (!context.isAuthenticated) {
        throw new Error("no authenticated user in context for PlayerLobbyContext");
    }

    return context;
}
