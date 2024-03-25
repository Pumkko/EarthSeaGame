import { ChatMessageModel, ChatMessageSender } from "@lib/schemas/MessageSchema";
import { For } from "solid-js";
import ChatMessage from "./ChatMessage";
import { createForm } from "@tanstack/solid-form";

interface ChatProps {
    currentUser: ChatMessageSender;
    recipient: ChatMessageSender;
    onNewMessage: (message: string) => Promise<void> | undefined;
    messages: ChatMessageModel[];
    isMiddleChat: boolean;
}

export default function Chat(props: ChatProps) {
    const beautifulNationName = () => {
        switch (props.recipient) {
            case "EarthNation":
                return "Earth Nation";
            case "EasternIsland":
                return "Eastern Island";
            case "SeaNation":
                return "Sea Nation";
            default:
                return "Unknown";
        }
    };

    const form = createForm(() => ({
        defaultValues: {
            message: "",
        },
        onSubmit: async ({ value, formApi }) => {
            await props.onNewMessage(value.message);
            formApi.setFieldValue("message", "");
        },
    }));

    return (
        <div class={`flex flex-col overflow-auto ${props.isMiddleChat ? "border-x-2" : ""}`}>
            <h1 class="self-center">{beautifulNationName()}</h1>
            <div class="flex flex-col flex-grow justify-end p">
                <For each={props.messages}>{(message) => <ChatMessage message={message} currentUser={props.currentUser} />}</For>
            </div>
            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <div>
                        <form.Field
                            name="message"
                            children={(field) => (
                                <input
                                    class="text-black w-full border-2 rounded border-black m-2 p-2 flex-grow"
                                    name={field().name}
                                    value={field().state.value}
                                    onBlur={field().handleBlur}
                                    onInput={(e) => field().handleChange(e.target.value)}
                                />
                            )}
                        />
                    </div>
                    <button class="border-2 px-2 mr-2 w-20" type="submit">
                        Submit
                    </button>
                </form>
            </form.Provider>
        </div>
    );
}
