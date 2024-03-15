import { ChatMessageModel } from "@lib/schemas/MessageSchema";
import { useContext } from "solid-js";
import { ChatContext } from "./ChatContext";

interface ChatMessageProps {
    message: ChatMessageModel;
}

export default function ChatMessage(props: ChatMessageProps) {
    const context = useContext(ChatContext);

    const isSenderMe = () => context?.currentUser === props.message.sender;

    return (
        <div class={`${isSenderMe() ? "self-end mr-2" : "ml-2"} bg-white w-1/2 text-black bg-opacity-75 px-4 py-2 my-2 rounded`}>
            <div>{props.message.content}</div>
        </div>
    );
}
