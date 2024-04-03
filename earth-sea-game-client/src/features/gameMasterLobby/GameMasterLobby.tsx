import Routes from "@lib/Routes";
import { GameLobby } from "@lib/schemas/GameLobbySchema";

import NavBarAnchor from "@components/NavBarAnchor";
import { Navigate, RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import { useLanguage } from "../LanguageProvider";
import { useAuthenticatedGameMasterLobbyContext, useGameMasterLobbyContext } from "./GameMasterLobbyContext";
export interface ManageLobbyProps {
    lobby: GameLobby;
}

function AuthenticatedGameMasterLobby(props: RouteSectionProps) {
    const context = useAuthenticatedGameMasterLobbyContext();
    const language = useLanguage();
    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-center p-4 text-2xl border-b-2 ">
                <NavBarAnchor href={Routes.gameMasterLobby.root}>{language().gameMasterLobby.homeTab()}</NavBarAnchor>
                <NavBarAnchor href={Routes.gameMasterLobby.spyChat}>
                    <Show when={context.numberOfUnreadSpyMessages() > 0}>
                        <span class="indicator-item badge">{context.numberOfUnreadSpyMessages()}</span>
                    </Show>
                    {language().gameMasterLobby.spyChatTab()}
                </NavBarAnchor>
                <NavBarAnchor href={Routes.gameMasterLobby.teamsChat}>
                    <Show when={context.numberOfUnreadTeamsMessages() > 0}>
                        <span class="indicator-item badge">{context.numberOfUnreadTeamsMessages()}</span>
                    </Show>
                    {language().gameMasterLobby.teamsChatTab()}
                </NavBarAnchor>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}

export default function GameMasterLobby(props: RouteSectionProps) {
    const context = useGameMasterLobbyContext();
    return (
        <Show when={context.isAuthenticated} fallback={<Navigate href={Routes.startingMenu} />}>
            <AuthenticatedGameMasterLobby {...props} />
        </Show>
    );
}
