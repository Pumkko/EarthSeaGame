import Chat from "@components/Chat";

export default function TeamsChat() {
    return (
        <div class="grid grid-cols-3 h-full">
            <Chat></Chat>
            <div class="border-x-2">Two</div>
            <div>Three</div>
        </div>
    );
}
