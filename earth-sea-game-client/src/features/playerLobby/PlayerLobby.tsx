import ChatMessageSenderBeautiful from "@components/ChatMessageSenderBeautiful";
import NavBarAnchor from "@components/NavBarAnchor";
import Routes from "@lib/Routes";
import { RouteSectionProps } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "./PlayerLobbyContext";

export default function PlayerLobby(props: RouteSectionProps) {
    const context = useContext(PlayerLobbyContext);

    const currentNation = () => context?.currentGame()?.nation;

    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-between p-4 text-2xl border-b-2 ">
                <div>
                    <ChatMessageSenderBeautiful sender={currentNation()} />
                </div>
                <div>
                    <NavBarAnchor href={Routes.playerLobby.root}>Home</NavBarAnchor>
                    <Show when={context?.currentGame()}>
                        <NavBarAnchor href={Routes.playerLobby.chat}>Chat</NavBarAnchor>
                    </Show>
                </div>
                <div>
                    <ChatMessageSenderBeautiful sender={currentNation()} />
                </div>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}
