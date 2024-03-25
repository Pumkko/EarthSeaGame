import GameMasterChatWithPlayer from "./GameMasterChatWithPlayer";

export default function GameMasterLobbyTeamsChat() {
    return (
        <div class="grid grid-cols-3 h-full">
            <GameMasterChatWithPlayer nation="EarthNation" />
            <GameMasterChatWithPlayer isMiddleChat={true} nation="SeaNation" />
            <GameMasterChatWithPlayer nation="EasternIsland" />
        </div>
    );
}
