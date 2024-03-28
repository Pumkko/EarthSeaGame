import { PlayerTokenLocalStorageKey } from "@lib/AuthConfig";
import { EarthSeaGamePlayerDb } from "@lib/DB";
import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { JoinGameOutputSchema } from "@lib/schemas/GameLobbySchema";
import { useNavigate } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import axios, { HttpStatusCode } from "axios";
import { JoinLobbyInput } from "../playerLobby/PlayerLobbyContext";

function createJoinLobbyMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return createMutation(() => ({
        mutationFn: async (value: JoinLobbyInput) => {
            try {
                const gameMasterDb = new EarthSeaGamePlayerDb();
                await gameMasterDb.clearGameTable();
                const targetUrl = new URL("api/game/join", import.meta.env.VITE_API_ROOT_URL);
                const response = await axios.post(targetUrl.href, value);

                const parseResult = JoinGameOutputSchema.safeParse(response.data);
                if (!parseResult.success) {
                    console.error(parseResult.error);
                    throw new Error("Failed to interpret operation result");
                }

                return parseResult.data;
            } catch (e) {
                if (axios.isAxiosError(e) && e.response?.status === HttpStatusCode.Unauthorized) {
                    throw new Error("Invalid credentials");
                }
                throw new Error("Something wrong happened, contact the Maker");
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(QueryKeys.playerLobby, data);
            localStorage.setItem(PlayerTokenLocalStorageKey, data.accessToken);
            navigate(Routes.playerLobby.root, {
                replace: true,
            });
        },
    }));
}

export function createJoinLobbyForm() {
    const joinLobbyMutation = createJoinLobbyMutation();

    const form = createForm(() => ({
        defaultValues: {
            gameMasterName: "",
            nation: "Unset",
            inviteCode: "",
        } satisfies JoinLobbyInput,
        validatorAdapter: zodValidator,
        onSubmit: async ({ value }) => {
            return joinLobbyMutation.mutateAsync(value);
        },
    }));

    return { form, joinLobbyMutation };
}
