import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: string;
    readonly inviteCode: string;
};

export function createJoinLobbyForm() {
    return createForm(() => ({
        defaultValues: {
            gameMasterName: "",
            nation: "Unset",
            inviteCode: "",
        } satisfies JoinLobbyInput,
        validatorAdapter: zodValidator,
    }));
}
