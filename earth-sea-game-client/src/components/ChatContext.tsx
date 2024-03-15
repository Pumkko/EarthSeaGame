import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { createContext } from "solid-js";

type ChatContextProps = {
    currentUser: ChatMessageSender;
};

export const ChatContext = createContext<ChatContextProps>();
