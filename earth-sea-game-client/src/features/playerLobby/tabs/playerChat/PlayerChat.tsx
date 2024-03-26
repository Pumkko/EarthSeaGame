import Chat from "@components/Chat";
import { ChatMessageDbModel } from "@lib/DB";
import { ENation } from "@lib/schemas/GameLobbySchema";
import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { useContext, Resource } from "solid-js";
import { PlayerLobbyContext } from "../../PlayerLobbyContext";

interface PlayerChatProps {
    chat: Resource<ChatMessageDbModel[]>;
    recipient: ChatMessageSender;
    currentNation: ENation;
    isMiddleChat?: boolean;
}

export default function PlayerChat(props: PlayerChatProps) {
    const context = useContext(PlayerLobbyContext);

    const onNewMessageFromCurrentNation = (message: string) => {
        return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer(props.recipient, message);
    };

    return (
        <Chat
            isMiddleChat={props.isMiddleChat ?? false}
            currentUser={props.currentNation}
            recipient={props.recipient}
            messages={props.chat() ?? []}
            onNewMessage={onNewMessageFromCurrentNation}
        />
    );
}
