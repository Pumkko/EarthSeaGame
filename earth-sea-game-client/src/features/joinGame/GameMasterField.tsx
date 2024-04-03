import FormFieldError from "@components/FormFieldErrror";
import { For } from "solid-js";
import { z } from "zod";
import { useLanguage } from "../LanguageProvider";
import { createJoinLobbyForm } from "./CreateJoinGameForm";

interface GameMasterFieldProps {
    form: ReturnType<typeof createJoinLobbyForm>["form"];
}

export default function GameMasterField(props: GameMasterFieldProps) {
    const language = useLanguage();

    return (
        <props.form.Field
            name="gameMasterName"
            validators={{
                onChange: z.string().min(1, language().joinGame.errors.emptyGameMasterNameError()),
            }}
            children={(field) => {
                return (
                    <>
                        <label class="text-white" for={field().name}>
                            {language().joinGame.labels.gameMasterFieldLabel()}
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
