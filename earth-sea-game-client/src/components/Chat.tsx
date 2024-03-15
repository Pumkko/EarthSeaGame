import { ChatMessageModel } from "@lib/schemas/MessageSchema";
import { For, createSignal } from "solid-js";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "./ChatContext";

export default function Chat() {
    const [messages] = createSignal<ChatMessageModel[]>([
        {
            content: "Hello",
            date: new Date(),
            recipient: "referee",
            sender: "EarthNation",
        },
        {
            content: "Hello Earth Nation",
            date: new Date(),
            recipient: "EarthNation",
            sender: "Referee",
        },
    ]);

    return (
        <div class="flex flex-col justify-between">
            <h1>Earth Nation</h1>
            <div class="flex-grow flex flex-col justify-end">
                <ChatContext.Provider
                    value={{
                        currentUser: "Referee",
                    }}
                >
                    <For each={messages()}>{(message) => <ChatMessage message={message} />}</For>
                </ChatContext.Provider>
            </div>
            <input class="text-black border-2 border-black p-2 mt-2" />
        </div>
    );
}
