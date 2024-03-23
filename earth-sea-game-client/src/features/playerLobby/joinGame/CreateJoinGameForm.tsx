import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { JoinLobbyInput, PlayerLobbyContext } from "../PlayerLobbyContext";
import { useContext } from "solid-js";

export function createJoinLobbyForm() {
    const context = useContext(PlayerLobbyContext)!;
    const form = createForm(() => ({
        defaultValues: {
            gameMasterName: "",
            nation: "Unset",
            inviteCode: "",
        } satisfies JoinLobbyInput,
        validatorAdapter: zodValidator,
        onSubmit: async ({ value }) => {
            return context.joinLobbyMutation.mutateAsync(value);
        },
    }));

    return { form };
}
