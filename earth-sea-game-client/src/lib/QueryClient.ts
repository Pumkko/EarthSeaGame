import { BrowserAuthError } from "@azure/msal-browser";
import { QueryClient } from "@tanstack/solid-query";
import axios, { HttpStatusCode } from "axios";
import { ZodError } from "zod";
import { PlayerTokenLocalStorageKey, loginRequest, msalInstance } from "./AuthConfig";
import { GameMasterLobbySchema, JoinGameOutput, JoinGameOutputWithTokenSchema } from "./schemas/GameLobbySchema";

export const QueryKeys = {
    gameMasterLobby: ["gameMasterLobby"],
    playerLobby: ["playerLobby"],
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            throwOnError: true,
            retry(failureCount, error) {
                if (error instanceof ZodError || error instanceof BrowserAuthError) {
                    return false;
                }
                return failureCount < 1;
            },
        },
    },
});

queryClient.setQueryDefaults(QueryKeys.gameMasterLobby, {
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    queryFn: async () => {
        const silentLogin = await msalInstance.acquireTokenSilent(loginRequest);
        const token = silentLogin.accessToken;

        const targetUrl = new URL("api/game/my", import.meta.env.VITE_API_ROOT_URL);
        const response = await axios.get(targetUrl.href, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 204) {
            return null;
        }

        const parseResult = GameMasterLobbySchema.safeParse(response.data);
        if (!parseResult.success) {
            throw parseResult.error;
        }

        return parseResult.data;
    },
});

async function joinWithToken(existingToken: string): Promise<JoinGameOutput | null> {
    try {
        const targetUrl = new URL("api/game/joinWithToken", import.meta.env.VITE_API_ROOT_URL);
        const response = await axios.get(targetUrl.href, {
            headers: {
                Authorization: `Bearer ${existingToken}`,
            },
        });
        const parseResult = JoinGameOutputWithTokenSchema.safeParse(response.data);
        if (!parseResult.success) {
            console.error(parseResult.error);
            throw new Error("Failed to interpret operation result");
        }

        return { ...parseResult.data, accessToken: existingToken };
    } catch (e) {
        const isUnauthorizedError = axios.isAxiosError(e) && e.response?.status === HttpStatusCode.Unauthorized;
        if (!isUnauthorizedError) {
            console.error(e);
            throw e;
        } else {
            return null;
        }
    }
}

queryClient.setQueryDefaults(QueryKeys.playerLobby, {
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    queryFn: async (): Promise<JoinGameOutput | null> => {
        const existingToken = localStorage.getItem(PlayerTokenLocalStorageKey);
        if (!existingToken) {
            return null;
        }

        const joinWithExistingToken = await joinWithToken(existingToken);
        return joinWithExistingToken;
    },
});
