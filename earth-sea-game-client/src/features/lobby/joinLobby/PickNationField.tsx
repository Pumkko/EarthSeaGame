import FormFieldError from "@components/FormFieldErrror";
import { For } from "solid-js";
import { createJoinLobbyForm } from "./JoinLobbyFormFactory";
import { z } from "zod";
interface PickNationFieldProps {
    form: ReturnType<typeof createJoinLobbyForm>;
}

const possibleNationsSchema = z.enum(["EarthNation", "SeaNation", "EasternIsland"], {
    invalid_type_error: "Must pick a specific nation",
    required_error: "Aaaah",
    description: "No",
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
                        <select id={field().name} name={field().name} value={field().state.value} onChange={(e) => field().handleChange(e.target.value)}>
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
