import { ChatMessageModel, ChatMessageSender } from "@lib/schemas/MessageSchema";
import ChatMessageSenderBeautiful from "./ChatMessageSenderBeautiful";

interface ChatMessageProps {
    message: ChatMessageModel;
    currentUser: ChatMessageSender;
}

export default function ChatMessage(props: ChatMessageProps) {
    const isSenderMe = () => props.currentUser === props.message.sender;

    return (
        <div class={`${isSenderMe() ? "self-end mr-2" : "ml-2"}  w-1/2  my-2 `}>
            <div class="text-white ml-2 italic">
                <ChatMessageSenderBeautiful sender={props.message.sender} />
            </div>
            <div class="bg-white text-black bg-opacity-75 px-4 py-2 rounded">{props.message.content}</div>
        </div>
    );
}
