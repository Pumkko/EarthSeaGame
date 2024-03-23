import { For } from "solid-js";
import { createJoinLobbyForm } from "./CreateJoinGameForm";
import { z } from "zod";
import FormFieldError from "@components/FormFieldErrror";

interface GameMasterFieldProps {
    form: ReturnType<typeof createJoinLobbyForm>["form"];
}

export default function GameMasterField(props: GameMasterFieldProps) {
    return (
        <props.form.Field
            name="gameMasterName"
            validators={{
                onChange: z.string().min(1, "Game Master can not be empty"),
            }}
            children={(field) => {
                return (
                    <>
                        <label class="text-white" for={field().name}>
                            Game Master
                        </label>
                        <input
                            class={`text-black rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                            id={field().name}
                            name={field().name}
                            value={field().state.value}
                            onBlur={field().handleBlur}
                            onInput={(e) => field().handleChange(e.target.value)}
                        />
                        <For each={field().state.meta.errors}>{(error) => <FormFieldError error={error} />}</For>
                    </>
                );
            }}
        />
    );
}
