import ChatMessageSenderI18n from "@components/ChatMessageSenderI18n";
import NavBarAnchor from "@components/NavBarAnchor";
import Routes from "@lib/Routes";
import { RouteSectionProps } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { useLanguage } from "../LanguageProvider";
import { PlayerLobbyContext } from "./PlayerLobbyContext";

export default function PlayerLobby(props: RouteSectionProps) {
    const context = useContext(PlayerLobbyContext);

    const language = useLanguage();
    const currentNation = () => context?.currentGame()?.nation;

    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-between p-4 text-2xl border-b-2 ">
                <div>
                    <ChatMessageSenderI18n sender={currentNation()} />
                </div>
                <div>
                    <NavBarAnchor href={Routes.playerLobby.root}>{language().playerLobby.homeTab()}</NavBarAnchor>
                    <Show when={context?.currentGame()}>
                        <NavBarAnchor href={Routes.playerLobby.chat}>{language().playerLobby.chatTab()}</NavBarAnchor>
                    </Show>
                </div>
                <div>
                    <ChatMessageSenderI18n sender={currentNation()} />
                </div>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}
