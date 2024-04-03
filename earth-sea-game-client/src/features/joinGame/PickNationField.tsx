import FormFieldError from "@components/FormFieldErrror";
import { NationArray } from "@lib/schemas/GameLobbySchema";
import { For } from "solid-js";
import { z } from "zod";
import { useLanguage } from "../LanguageProvider";
import { createJoinLobbyForm } from "./CreateJoinGameForm";
interface PickNationFieldProps {
    form: ReturnType<typeof createJoinLobbyForm>["form"];
}

export default function PickNationField(props: PickNationFieldProps) {
    const language = useLanguage();

    const FormNationSchema = z.enum(NationArray, {
        errorMap: (issue) => {
            switch (issue.code) {
                case "invalid_enum_value": {
                    return {
                        message: language().joinGame.errors.noNationSelectedError(),
                    };
                }
                default: {
                    return {
                        message: language().joinGame.errors.unknownError(),
                    };
                }
            }
        },
    });

    return (
        <props.form.Field
            name="nation"
            validators={{
                onChange: FormNationSchema,
            }}
            children={(field) => {
                return (
                    <>
                        <label class="text-white" for={field().name}>
                            {language().joinGame.labels.pickNationFieldLabel()}
                        </label>
                        <select
                            class={`text-black rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                            id={field().name}
                            name={field().name}
                            value={field().state.value}
                            onChange={(e) => field().handleChange(e.target.value)}
                        >
                            <option value="EarthNation">{language().messageSender.EarthNation()}</option>
                            <option value="SeaNation">{language().messageSender.SeaNation()}</option>
                            <option value="EasternIsland">{language().messageSender.EasternIsland()}</option>
                            <option value="Unset">{language().joinGame.pickNationFieldDefaultOption()}</option>
                        </select>
                        <For each={field().state.meta.errors}>{(error) => <FormFieldError error={error} />}</For>
                    </>
                );
            }}
        />
    );
}
