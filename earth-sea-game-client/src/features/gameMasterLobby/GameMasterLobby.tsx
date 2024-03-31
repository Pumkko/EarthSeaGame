import Routes from "@lib/Routes";
import { GameLobby } from "@lib/schemas/GameLobbySchema";

import NavBarAnchor from "@components/NavBarAnchor";
import { RouteSectionProps } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { useLanguage } from "../LanguageProvider";
import { GameMasterLobbyContext } from "./GameMasterLobbyContext";
export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function GameMasterLobby(props: RouteSectionProps) {
    const context = useContext(GameMasterLobbyContext);
    const language = useLanguage();
    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-center p-4 text-2xl border-b-2 ">
                <NavBarAnchor href={Routes.gameMasterLobby.root}>{language().gameMasterLobby.homeTab()}</NavBarAnchor>
                <Show when={!!context?.signalRConnection()}>
                    <NavBarAnchor href={Routes.gameMasterLobby.spyChat}>
                        {language().gameMasterLobby.spyChatTab()}
                    </NavBarAnchor>
                    <NavBarAnchor href={Routes.gameMasterLobby.teamsChat}>
                        {language().gameMasterLobby.teamsChatTab()}
                    </NavBarAnchor>
                </Show>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}
