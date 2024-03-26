import { JoinGameOutput, JoinGameOutputSchema } from "@lib/schemas/GameLobbySchema";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createMutation } from "@tanstack/solid-query";
import axios from "axios";
import { JSXElement, Resource, createContext, createResource } from "solid-js";
import { PlayerChatWithOtherPlayersResources, createPlayerChatResources } from "./PlayerChatResources";

export type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: string;
    readonly inviteCode: string;
};

function createJoinLobbyMutation() {
    return createMutation(() => ({
        mutationFn: async (value: JoinLobbyInput) => {
            const targetUrl = new URL("api/game/join", import.meta.env.VITE_API_ROOT_URL);
            const response = await axios.post(targetUrl.href, value);

            const parseResult = JoinGameOutputSchema.safeParse(response.data);
            if (!parseResult.success) {
                throw parseResult.error;
            }

            return parseResult.data;
        },
    }));
}

function createSignalResource(mutation: ReturnType<typeof createJoinLobbyMutation>) {
    return createResource(
        () => ({
            data: mutation.data,
            isSuccess: mutation.isSuccess,
        }),
        async (mutation) => {
            if (mutation.data === null || mutation.data === undefined || !mutation.isSuccess) {
                return undefined;
            }

            const token = mutation.data.accessToken;
            const signalRConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7071/hubs/chat", {
                    accessTokenFactory: () => token,
                })
                .build();

            await signalRConnection.start();
            return signalRConnection;
        },
    );
}

interface PlayerLobbyContextProps {
    signalRConnection: Resource<HubConnection | undefined>;
    joinLobbyMutation: ReturnType<typeof createJoinLobbyMutation>;
    teamsChat: PlayerChatWithOtherPlayersResources;
    currentGame: () => JoinGameOutput | undefined;
}

export const PlayerLobbyContext = createContext<PlayerLobbyContextProps>();

export function PlayerLobbyContextProvider(props: { children: JSXElement }) {
    const mutation = createJoinLobbyMutation();
    const [signalRConnection] = createSignalResource(mutation);

    const currentGame = () => mutation.data;
    const teamsChat = createPlayerChatResources(signalRConnection, currentGame);

    return (
        <PlayerLobbyContext.Provider
            value={{
                joinLobbyMutation: mutation,
                signalRConnection: signalRConnection,
                teamsChat,
                currentGame,
            }}
        >
            {props.children}
        </PlayerLobbyContext.Provider>
    );
}
