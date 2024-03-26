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

            // Justify-end breaks auto scroll, so i removed it messages will be up at first and then will move down
            // i then scrolldown after every messages
            const scrollable = document.getElementById(`ChatWith${props.recipient}`);
            if (!scrollable) {
                return;
            }
            scrollable.scrollTo(0, scrollable.scrollHeight - scrollable.clientHeight);
        },
    }));

    return (
        <div class="flex flex-col h-full overflow-auto">
            <h1 class="self-center">{beautifulNationName()}</h1>
            <div id={`ChatWith${props.recipient}`} class={`flex flex-col mb-4 flex-grow overflow-auto ${props.isMiddleChat ? "border-x-2" : ""}`}>
                <For each={props.messages}>{(message) => <ChatMessage message={message} currentUser={props.currentUser} />}</For>
            </div>
            <form.Provider>
                <form
                    class="flex w-full mb-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <form.Field
                        name="message"
                        children={(field) => (
                            <input
                                class="text-black border-2 rounded border-black m-2 p-2 flex-grow"
                                name={field().name}
                                value={field().state.value}
                                onBlur={field().handleBlur}
                                onInput={(e) => field().handleChange(e.target.value)}
                            />
                        )}
                    />
                    <button class="border-2 px-2 mr-2" type="submit">
                        Send
                    </button>
                </form>
            </form.Provider>
        </div>
    );
}
