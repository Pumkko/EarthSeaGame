import * as i18n from "@solid-primitives/i18n";
import { Language } from "../language";
import { EarthNationTimelineFr } from "./earthNationTimeline.fr";
import { EasternNationTimeline } from "./easternIslandTimeline.fr";
import { SeaNationTimelineFr } from "./seaNationTimeline.fr";

const frDefinition = {
    gameTitle: "Entre Terres et Mers",
    messageSender: {
        EarthNation: "Nation de la Terre",
        EasternIsland: "Ile Orientale",
        GameMaster: "Maitre du Jeu",
        SeaNation: "Nation Des Mers",
    },
    createGame: {
        screenTitle: "Créer une Partie",
        gameNameFieldPlaceholder: "Nom de la Partie",
        gameNameFieldEmptyError: "Le nom de la Partie doit obligatoirement être saisi",
        submitButton: "Créer",
    },
    joinGame: {
        screenTitle: "Rejoindre une Partie",
        pickNationFieldDefaultOption: "Choisir",
        labels: {
            gameMasterFieldLabel: "Maitre du Jeu",
            inviteCodeFieldLabel: "Code d'Invitation",
            pickNationFieldLabel: "Nation",
        },
        errors: {
            emptyGameMasterNameError: "Le nom du Maître du Jeu doit obligatoirement être saisi",
            incorrectFormatInviteCodeError: "Le code d'invitation n'a pas le bon format",
            noNationSelectedError: "Une nation doit obligatoirement être choisie",
            unknownError: "Erreur Inconnue",
        },
        submitButton: "Rejoindre",
    },
    playerLobby: {
        chatTab: "Chat",
        homeTab: "Accueil",
        worldMap: "Carte du Monde",
    },
    gameMasterLobby: {
        homeTab: "Accueil",
        spyChatTab: "Espion",
        teamsChatTab: "Chat",
    },
    startingMenu: {
        joinGameButton: "Rejoindre une Partie",
        myGameButton: "Ma Partie",
    },
    timelines: {
        detailModalTitle: "En Détail",
        earthNation: EarthNationTimelineFr,
        seaNation: SeaNationTimelineFr,
        easternIsland: EasternNationTimeline,
    },
} satisfies Language;

// I use satisfies and not a classic type like const s: TYPE because if i don't then solid i18n would require to do that
// const frCast = fr as unknown as i18n.BaseRecordDict

const flat_dict = i18n.flatten(frDefinition);

const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
export const fr = i18n.chainedTranslator(frDefinition, t);
