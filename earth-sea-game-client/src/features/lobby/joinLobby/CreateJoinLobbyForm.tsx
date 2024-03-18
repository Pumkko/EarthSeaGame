import { signalRConnection } from "@lib/SignalR";
import { createForm } from "@tanstack/solid-form";
import { createMutation } from "@tanstack/solid-query";
import { zodValidator } from "@tanstack/zod-form-adapter";

type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: string;
    readonly inviteCode: string;
};

export function createJoinLobbyForm() {
    const joinLobby = createMutation(() => ({
        mutationFn: async (value: JoinLobbyInput) => {
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
