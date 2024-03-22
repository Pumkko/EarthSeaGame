import { createForm } from "@tanstack/solid-form";
import { createMutation } from "@tanstack/solid-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";

type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: string;
    readonly inviteCode: string;
};

export function createJoinLobbyForm() {
    const joinLobby = createMutation(() => ({
        mutationFn: async (value: JoinLobbyInput) => {
            const targetUrl = new URL("api/game/join", import.meta.env.VITE_API_ROOT_URL);
            const response = await axios.post<string>(targetUrl.href, value);
            const token = response.data;

            const signalRConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7071/hubs/chat", {
                    accessTokenFactory: () => token,
                })
                .build();

            await signalRConnection.start();

            signalRConnection.on("joinLobby", () => {
                console.log("Received joinLobby");
            });

            signalRConnection.send("JoinLobby", value);
        },
    }));

    const form = createForm(() => ({
        defaultValues: {
            gameMasterName: "",
            nation: "Unset",
            inviteCode: "",
        } satisfies JoinLobbyInput,
        validatorAdapter: zodValidator,
        onSubmit: async ({ value }) => {
            return joinLobby.mutateAsync(value);
        },
    }));

    return { joinLobby, form };
}
