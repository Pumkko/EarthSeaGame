import { QueryKeys } from "@lib/QueryKeys";
import { GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { createQuery } from "@tanstack/solid-query";
import { JSXElement, createContext } from "solid-js";

function createMyLobbyQuery() {
    return createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
    }));
}

interface GameMasterLobbyContextProps {
    query: ReturnType<typeof createMyLobbyQuery>;
}

export const GameMasterLobbyContext = createContext<GameMasterLobbyContextProps>();

export function GameMasterLobbyContextProvider(props: { children: JSXElement }) {
    const query = createMyLobbyQuery();

    return (
        <GameMasterLobbyContext.Provider
            value={{
                query,
            }}
        >
            {props.children}
        </GameMasterLobbyContext.Provider>
    );
}
