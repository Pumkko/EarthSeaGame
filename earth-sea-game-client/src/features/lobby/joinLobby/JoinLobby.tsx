import FormFieldError from "@components/FormFieldErrror";
import PageTitle from "@components/PageTitle";
import { FieldApi, createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { For } from "solid-js";
import { z } from "zod";

type JoinLobbyInput = {
    readonly gameMasterName: string;
    readonly nation: "EarthNation" | "SeaNation" | "EasternIsland" | undefined;
    readonly inviteCode: string;
};

interface FieldInfoProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: FieldApi<any, any, any, any>;
}

function FieldInfo(props: FieldInfoProps) {
    return <For each={props.field.state.meta.errors}>{(error) => <FormFieldError error={error} />}</For>;
}

export default function JoinLobby() {
    const form = createForm(() => ({
        defaultValues: {
            gameMasterName: "",
            nation: undefined,
            inviteCode: "",
        } satisfies JoinLobbyInput,
        validatorAdapter: zodValidator,
    }));

    return (
        <div class="bg-aircraft bg-cover h-screen flex flex-col items-center">
            <PageTitle>Join Lobby</PageTitle>

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
                        name="gameMasterName"
                        validators={{
                            onChange: z.string().min(1, "Game Master name can not be empty"),
                        }}
                        children={(field) => {
                            return (
                                <>
                                    <label class="text-white" for={field().name}>
                                        Game Master
                                    </label>
                                    <input
                                        class={`rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                                        id={field().name}
                                        name={field().name}
                                        value={field().state.value}
                                        onBlur={field().handleBlur}
                                        onInput={(e) => field().handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field()} />
                                </>
                            );
                        }}
                    />
                </form>
            </form.Provider>
        </div>
    );
}
