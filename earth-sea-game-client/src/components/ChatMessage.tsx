import { ChatMessageModel } from "@lib/schemas/MessageSchema";
import { useContext } from "solid-js";
import { ChatContext } from "./ChatContext";

interface ChatMessageProps {
    message: ChatMessageModel;
}

export default function ChatMessage(props: ChatMessageProps) {
    const context = useContext(ChatContext);

    return (
        <div class={`${context?.currentUser === props.message.sender ? "self-end" : "self-start"}`}>
            <div>{props.message.sender} says</div>
            <div>{props.message.content}</div>
        </div>
    );
}
