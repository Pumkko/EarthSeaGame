import { createForm } from "@tanstack/solid-form";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import axios from "axios";
import { GameMasterLobbySchema } from "@lib/schemas/GameLobbySchema";
import { QueryKeys } from "@lib/QueryKeys";
import PageTitle from "@components/PageTitle";
import FormFieldError from "@components/FormFieldErrror";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { loginRequest, msalInstance } from "@lib/MsalConfig";
import Dexie from "dexie";
import { DbNames } from "@lib/DB";

type CreateLobbyInput = {
    readonly lobbyName: string;
};

export default function CreateLobby() {
    const queryClient = useQueryClient();

    const createLobby = createMutation(() => ({
        mutationFn: async (lobby: CreateLobbyInput) => {
            await Dexie.delete(DbNames.gameMasterDb);
            const silentLogin = await msalInstance.acquireTokenSilent(loginRequest);
            const token = silentLogin.accessToken;

            const targetUrl = new URL("api/game/my", import.meta.env.VITE_API_ROOT_URL);
            const response = await axios.post(targetUrl.href, lobby, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const parseResult = GameMasterLobbySchema.safeParse(response.data);
            if (!parseResult.success) {
                throw parseResult.error;
            }
            return parseResult.data;
        },
        onSuccess: (response) => {
            queryClient.setQueryData(QueryKeys.gameMasterLobby, response);
        },
    }));

    const form = createForm(() => ({
        defaultValues: {
            lobbyName: "",
        } satisfies CreateLobbyInput,
        onSubmit: async ({ value }) => {
            return createLobby.mutateAsync(value);
        },
        validatorAdapter: zodValidator,
    }));

    return (
        <div class="flex flex-col items-center">
            <PageTitle>Create Lobby</PageTitle>
            <form.Provider>
                <form
                    class="flex items items-center flex-col w-1/2 text-xl font-bold"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <form.Field
                        name="lobbyName"
                        validators={{
                            onChange: z.string().min(1, "Game Master name can not be empty"),
                        }}
                        children={(field) => (
                            <>
                                <input
                                    class={`text-black rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                                    name={field().name}
                                    value={field().state.value}
                                    onBlur={field().handleBlur}
                                    onInput={(e) => field().handleChange(e.target.value)}
                                    placeholder="Lobby Name"
                                />

                                <For each={field().state.meta.errors}>
                                    {(error) => <FormFieldError error={error} />}
                                </For>
                            </>
                        )}
                    />
                    <button
                        class="text-black flex justify-center bg-opacity-75 bg-white py-2 px-8 mt-2 rounded border-2 border-white text-2xl w-1/2 hover:bg-opacity-100 duration-500"
                        type="submit"
                    >
                        <Show when={createLobby.isPending}>
                            <svg
                                class="animate-spin ml-1 mr-3 h-7 w-7 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </Show>
                        Submit
                    </button>
                </form>
            </form.Provider>
        </div>
    );
}
