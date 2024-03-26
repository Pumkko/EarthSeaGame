import { ENation } from "@lib/schemas/GameLobbySchema";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";
import Chat from "@components/Chat";
import { useContext, Resource } from "solid-js";
import { ChatMessageDbModel } from "@lib/DB";

interface GameMasterChatWithPlayerProps {
    nation: ENation;
    chat: Resource<ChatMessageDbModel[]>;
    isMiddleChat?: boolean;
}

export default function GameMasterChatWithPlayer(props: GameMasterChatWithPlayerProps) {
    const context = useContext(GameMasterLobbyContext);

    const onNewMessageFromGameMaster = (message: string) => {
        return context?.teamsChat.onNewMessageFromGameMasterToPlayer(props.nation, message);
    };

    return (
        <Chat
            isMiddleChat={props.isMiddleChat ?? false}
            currentUser="GameMaster"
            recipient={props.nation}
            messages={props.chat() ?? []}
            onNewMessage={onNewMessageFromGameMaster}
        />
    );
}
