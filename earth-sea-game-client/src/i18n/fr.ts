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
            collapse: "Éclatement de la Nation de la Terre",
            civilWar: "Première Guerre Civile",
            atomicBombings: "Bombardements Atomiques de la Nation Reculée",
            cohabitationTreaty: "Signature du Traité de Cohabitation",
            firstNuclearReactor: "Mise en service du R1",
            firstStraitCrisis: "Première crise du détroit",
            greatWarBegins: "Début de la Grande Guerre",
            greatWarEnds: "Fin de la Grande Guerre",
            rebirthOfTheNation: "Proclamation de la Renaissance de la Nation",
            seaNationProtectionTreaty: "Signature du Traité de Protection",
            secondCivilWarBegins: "Deuxième Guerre Civile",
            secondStraitCrisis: "Deuxième crise du détroit",
            sinkingOfTheNepture: "Naufrage du Nepture",
            southerNationBorderConflict: "Conflit frontalier avec la Nation du Sud",
            southernNationIndependence: "Indépendance de la Nation du Sud",
            treatyOfUnity: "Signature du Traité d'Unité",
            warlordEraBegins: "Âge des Seigneurs de Guerre",
        },
    },
} satisfies Language;

// I use satisfies and not a classic type like const s: TYPE because if i don't then solid i18n would require to do that
// const frCast = fr as unknown as i18n.BaseRecordDict

const flat_dict = i18n.flatten(frDefinition);

const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
export const fr = i18n.chainedTranslator(frDefinition, t);
