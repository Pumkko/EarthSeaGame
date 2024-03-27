import { ChatMessageModel, ChatMessageSender } from "@lib/schemas/MessageSchema";
import { For } from "solid-js";
import ChatMessage from "./ChatMessage";
import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

interface ChatProps {
    title: string;
    currentUser: ChatMessageSender;
    key: string;
    onNewMessage?: (message: string) => Promise<void> | undefined;
    messages: ChatMessageModel[];
}

export default function Chat(props: ChatProps) {
    const gameChatDivId = () => `ChatWith${props.key}`;

    const form = createForm(() => ({
        defaultValues: {
            message: "",
        },
        validatorAdapter: zodValidator,
        onSubmit: async ({ value, formApi }) => {
            await props.onNewMessage?.(value.message);
            formApi.setFieldValue("message", "");

            // Justify-end breaks auto scroll, so i removed it messages will be up at first and then will move down
            // i then scrolldown after every messages
            const scrollable = document.getElementById(gameChatDivId());
            if (!scrollable) {
                return;
            }
            scrollable.scrollTo(0, scrollable.scrollHeight - scrollable.clientHeight);
        },
    }));

    return (
        <div class="flex flex-col h-full overflow-auto earth-sea-game-chat-container">
            <h1 class="self-center text-xl">{props.title}</h1>
            <div id={gameChatDivId()} class={`flex flex-col mb-4 flex-grow overflow-auto earth-sea-game-chat`}>
                <For each={props.messages}>
                    {(message) => <ChatMessage message={message} currentUser={props.currentUser} />}
                </For>
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
                        validators={{
                            onChange: z.string().min(1),
                        }}
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
