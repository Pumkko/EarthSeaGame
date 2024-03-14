import { QueryClient } from "@tanstack/solid-query";
import { ZodError } from "zod";
import { QueryKeys } from "./QueryKeys";
import axios from "axios";
import { GameLobby, GameLobbySchema } from "./schemas/GameLobbySchema";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            throwOnError: true,
            retry(failureCount, error) {
                if (error instanceof ZodError) {
                    return false;
                }
                return failureCount < 2;
            },
        },
    },
});

queryClient.setQueryDefaults(QueryKeys.lobby, {
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    queryFn: async () => {
        const targetUrl = new URL("GameLobby/my", import.meta.env.VITE_API_ROOT_URL);
        const response = await axios.get<GameLobby>(targetUrl.href);
        if (response.status === 204) {
            return null;
        }

        const parseResult = GameLobbySchema.safeParse(response.data);
        if (!parseResult.success) {
            throw parseResult.error;
        }

        return response.data;
    },
});
