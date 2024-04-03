import ChatMessageSenderI18n from "@components/ChatMessageSenderI18n";
import NavBarAnchor from "@components/NavBarAnchor";
import Routes from "@lib/Routes";
import { Navigate, RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import { useLanguage } from "../LanguageProvider";
import { useAuthenticatedPlayerLobbyContext, usePlayerLobbyContext } from "./PlayerLobbyContext";

function AuthenticatedPlayerLobby(props: RouteSectionProps) {
    const context = useAuthenticatedPlayerLobbyContext();

    const language = useLanguage();
    const currentNation = () => context.currentGame().nation;

    const onShowWorldMap = () => {
        const modal = document.getElementById("world_map_modal") as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-between p-4 text-2xl border-b-2 ">
                <div>
                    <ChatMessageSenderI18n sender={currentNation()} />
                </div>
                <div class="flex">
                    <NavBarAnchor href={Routes.playerLobby.root}>{language().playerLobby.homeTab()}</NavBarAnchor>
                    <NavBarAnchor href={Routes.playerLobby.chat}>
                        <Show when={context.numberOfUnreadMessages() > 0}>
                            <span class="indicator-item badge">{context.numberOfUnreadMessages()}</span>
                        </Show>
                        {language().playerLobby.chatTab()}
                    </NavBarAnchor>
                </div>
                <div>
                    <button onClick={onShowWorldMap}>{language().playerLobby.worldMap()}</button>
                    <dialog id="world_map_modal" class="text-black modal">
                        <div class="modal-box w-[60%] max-w-[60%] h-[95%] max-h-[95%] flex">
                            <img src="/world_map.webp" />
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}

export default function PlayerLobby(props: RouteSectionProps) {
    const context = usePlayerLobbyContext();
    return (
        <>
            <Show when={context.isAuthenticated} fallback={<Navigate href={Routes.startingMenu} />}>
                <AuthenticatedPlayerLobby {...props} />
            </Show>
        </>
    );
}
