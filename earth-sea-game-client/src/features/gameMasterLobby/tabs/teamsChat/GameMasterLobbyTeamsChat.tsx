import GameMasterChatWithPlayer from "./GameMasterChatWithPlayer";

export default function GameMasterLobbyTeamsChat() {
    return (
        <div class="grid grid-cols-3 h-full">
            <GameMasterChatWithPlayer nation="EarthNation" />
            <div class="border-x-2">Two</div>
            <div>Three</div>
        </div>
    );
}
