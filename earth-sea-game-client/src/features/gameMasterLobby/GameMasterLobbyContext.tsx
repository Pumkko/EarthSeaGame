import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { SignalREvents } from "@lib/SignalR";
import { GameLobby, GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createQuery } from "@tanstack/solid-query";
import {
    Accessor,
    JSXElement,
    Match,
    Resource,
    Setter,
    Switch,
    createContext,
    createEffect,
    createResource,
    createSignal,
    onCleanup,
    useContext,
} from "solid-js";
import { GameMasterSpyChatResources, createGameMasterSpyChatResources } from "./GameMasterSpyChatResources";
import { GameMasterChatWithPlayerResources, createGameMasterTeamsChatResources } from "./GameMasterTeamsChatResources";

function createMyLobbyQuery() {
    return createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
    }));
}

function createSignalResource(token: () => string) {
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

type AuthenticatedGameMasterLobbyContextProps = {
    currentGame: () => GameLobby;
    signalRConnection: Resource<HubConnection>;
    teamsChat: GameMasterChatWithPlayerResources;
    spyChat: GameMasterSpyChatResources;
    numberOfUnreadSpyMessages: Accessor<number>;
    setNumberOfUnreadSpyMessages: Setter<number>;
    numberOfUnreadTeamsMessages: Accessor<number>;
    setNumberOfUnreadTeamsMessages: Setter<number>;
    isAuthenticated: true;
};

type UnauthenticatedGameMasterLobbyContextProps = {
    isAuthenticated: false;
};

type GameMasterLobbyContextProps =
    | AuthenticatedGameMasterLobbyContextProps
    | UnauthenticatedGameMasterLobbyContextProps;

const GameMasterLobbyContext = createContext<GameMasterLobbyContextProps>();

function AuthenticatedGameMasterLobbyContextProvider(props: { children: JSXElement; data: GameMasterLobby }) {
    const token = () => props.data.accessToken;
    const gameMaster = () => props.data.gameLobby.gameMaster;

    const [signalRConnection] = createSignalResource(token);

    const teamsChat = createGameMasterTeamsChatResources(signalRConnection, gameMaster);
    const spyChat = createGameMasterSpyChatResources(signalRConnection, gameMaster);

    const [numberOfUnreadSpyMessages, setNumberOfUnreadSpyMessages] = createSignal(0);
    const [numberOfUnreadTeamsMessages, setNumberOfUnreadTeamsMessages] = createSignal(0);

    const onPlayerSentToOtherPlayer = () => {
        if (location.pathname !== Routes.gameMasterLobby.root + "/" + Routes.gameMasterLobby.spyChat) {
            setNumberOfUnreadSpyMessages((n) => n + 1);
        }
    };

    const onPlayerSentToGameMaster = () => {
        if (location.pathname !== Routes.gameMasterLobby.root + "/" + Routes.gameMasterLobby.teamsChat) {
            setNumberOfUnreadTeamsMessages((n) => n + 1);
        }
    };

    createEffect(() => {
        signalRConnection()?.on(SignalREvents.playerSentToOtherPlayer, onPlayerSentToOtherPlayer);
        signalRConnection()?.on(SignalREvents.playerSentToGameMaster, onPlayerSentToGameMaster);
    });

    return (
        <GameMasterLobbyContext.Provider
            value={{
                currentGame: () => props.data.gameLobby,
                signalRConnection,
                teamsChat,
                spyChat,
                numberOfUnreadSpyMessages,
                numberOfUnreadTeamsMessages,
                setNumberOfUnreadSpyMessages,
                setNumberOfUnreadTeamsMessages,
                isAuthenticated: true,
            }}
        >
            {props.children}
        </GameMasterLobbyContext.Provider>
    );
}

export function GameMasterLobbyContextProvider(props: { children: JSXElement }) {
    const query = createMyLobbyQuery();

    return (
        <Switch>
            <Match when={query.isSuccess && !!query.data?.accessToken}>
                <AuthenticatedGameMasterLobbyContextProvider data={query.data!}>
                    {props.children}
                </AuthenticatedGameMasterLobbyContextProvider>
            </Match>
            <Match when={query.isSuccess && !query.data?.accessToken}>
                <GameMasterLobbyContext.Provider
                    value={{
                        isAuthenticated: false,
                    }}
                >
                    {props.children}
                </GameMasterLobbyContext.Provider>
            </Match>
        </Switch>
    );
}

export function useGameMasterLobbyContext() {
    const context = useContext(GameMasterLobbyContext);
    if (!context) {
        throw new Error("no Provider called for GameMasterLobbyContext");
    }

    return context;
}

export function useAuthenticatedGameMasterLobbyContext() {
    const context = useGameMasterLobbyContext();
    if (!context.isAuthenticated) {
        throw new Error("no authenticated user in context for GameMasterLobbyContext");
    }

    return context;
}
