import Chat from "@components/Chat";

export default function PlayerLobbyChat() {
    return (
        <div class="grid grid-cols-3 h-full">
            <Chat />
            <div class="border-x-2">Two</div>
            <div>Three</div>
        </div>
    );
}
