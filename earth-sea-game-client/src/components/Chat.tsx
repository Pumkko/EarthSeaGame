import { ChatMessageModel, ChatMessageSender } from "@lib/schemas/MessageSchema";
import { For, createSignal } from "solid-js";
import ChatMessage from "./ChatMessage";

interface ChatProps {
    currentUser: ChatMessageSender;
    onNewMessage: (message: string) => Promise<void> | undefined;
    messages: ChatMessageModel[];
}

export default function Chat(props: ChatProps) {
    const [newMessage, setNewMessage] = createSignal("");

    return (
        <div class="flex flex-col overflow-auto">
            <h1 class="self-center">Earth Nation</h1>
            <div class="flex flex-col flex-grow justify-end">
                <For each={props.messages}>{(message) => <ChatMessage message={message} currentUser={props.currentUser} />}</For>
            </div>
            <div class="flex">
                <input
                    class="text-black border-2 rounded border-black m-2 p-2 flex-grow"
                    value={newMessage()}
                    onChange={(e) => setNewMessage(e.currentTarget.value)}
                />
                <button
                    class="border-2 px-2 mr-2 w-20"
                    onClick={async () => {
                        await props.onNewMessage(newMessage());
                        setNewMessage("");
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
