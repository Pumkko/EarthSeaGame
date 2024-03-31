import * as i18n from "@solid-primitives/i18n";
import { Language } from "./language";

const frDefinition = {
    gameTitle: "Entre Terres et Mers",
    messageSender: {
        EarthNation: "Nation de la Terre",
        EasternIsland: "Ile Orientale",
        GameMaster: "Maitre du Jeu",
        SeaNation: "Nation de la Mer",
    },
    playerLobby: {
        chatTab: "Chat",
        homeTab: "Accueil",
    },
    gameMasterLobby: {
        homeTab: "Accueil",
        spyChatTab: "Chat Espion",
        teamsChatTab: "Chat Equipe",
    },
    startingMenu: {
        joinGameButton: "Rejoindre un Jeu",
        myGameButton: "Mon Jeu",
    },
    timelines: {
        earthNation: {
            earthNationCollapse: "Eclatement de la Nation de la Terre",
        },
    },
} satisfies Language;

// I use satisfies and not a classic type like const s: TYPE because if i don't then solid i18n would require to do that
// const frCast = fr as unknown as i18n.BaseRecordDict

const flat_dict = i18n.flatten(frDefinition);

const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
export const fr = i18n.chainedTranslator(frDefinition, t);
