import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { Show } from "solid-js";
import { useLanguage } from "../features/LanguageProvider";

interface ChatMessageSenderBeautifulProps {
    sender?: ChatMessageSender;
}

export default function ChatMessageSenderI18n(props: ChatMessageSenderBeautifulProps) {
    const language = useLanguage();
    return (
        <>
            <Show when={!!props.sender}>{language().messageSender[props.sender!]()}</Show>
        </>
    );
}
