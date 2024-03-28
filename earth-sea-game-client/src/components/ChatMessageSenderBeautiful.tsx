import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { Show } from "solid-js";

interface ChatMessageSenderBeautifulProps {
    sender?: ChatMessageSender;
}

function beautifulizeSender(sender: ChatMessageSender) {
    switch (sender) {
        case "EarthNation":
            return "Earth Nation";
        case "EasternIsland":
            return "Eastern Island";
        case "GameMaster":
            return "Game Master";
        case "SeaNation":
            return "Sea Nation";
        default:
            return "Unknown";
    }
}

export default function ChatMessageSenderBeautiful(props: ChatMessageSenderBeautifulProps) {
    return (
        <>
            <Show when={!!props.sender}>{beautifulizeSender(props.sender!)}</Show>
        </>
    );
}
