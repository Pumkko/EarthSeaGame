import FormFieldError from "@components/FormFieldErrror";
import { For } from "solid-js";
import { createJoinLobbyForm } from "./CreateJoinGameForm";
import { z } from "zod";
interface PickNationFieldProps {
    form: ReturnType<typeof createJoinLobbyForm>["form"];
}

const possibleNationsSchema = z.enum(["EarthNation", "SeaNation", "EasternIsland"], {
    errorMap: (issue) => {
        switch (issue.code) {
            case "invalid_enum_value": {
                return {
                    message: "Must Pick a valid Nation",
                };
            }
            default: {
                return {
                    message: "Something's wrong though I can't tell what",
                };
            }
        }
    },
});

export default function PickNationField(props: PickNationFieldProps) {
    return (
        <props.form.Field
            name="nation"
            validators={{
                onChange: possibleNationsSchema,
            }}
            children={(field) => {
                return (
                    <>
                        <label class="text-white" for={field().name}>
                            Nation
                        </label>
                        <select
                            class={`text-black rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                            id={field().name}
                            name={field().name}
                            value={field().state.value}
                            onChange={(e) => field().handleChange(e.target.value)}
                        >
                            <option value="EarthNation">Earth Nation</option>
                            <option value="SeaNation">Sea Nation</option>
                            <option value="EasternIsland">Eastern Island</option>
                            <option value="Unset">Pick One</option>
                        </select>
                        <For each={field().state.meta.errors}>{(error) => <FormFieldError error={error} />}</For>
                    </>
                );
            }}
        />
    );
}
