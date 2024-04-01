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
            collapse: {
                event: "Éclatement de la Nation de la Terre",
                details:
                    "La Nation de la Terre, l'un des plus ancien et puissant état du monde, s'écroule sous son propre poids, le gouvernement central n'exerce plus qu'un contrôle limité.",
            },
            civilWar: {
                event: "Début de la Première Guerre Civile",
                details:
                    "La situation sur le continent s'embrase, le gouvernement est massacré, les plus puissantes factions du continent s'arment, le continent plonge dans la violence.",
            },
            atomicBombings: {
                event: "Bombardements Atomiques de la Nation Reculée",
                details:
                    "Acculée, reculant sur tous les fronts sans aucun espoit de victoire, la Nation Reculée continue malgré tout de combattre. La Nation des Mers décide alors d'utiliser une nouvelle arme pour mettre fin à la guerre.",
            },
            cohabitationTreaty: {
                event: "Traité de Cohabitation",
                details:
                    "le Traité de Cohabitation entre la Nation de la Terre et la Nation du Sud est signé. Celui-ci met fin à la guerre et à travers l'article 4 du traité chaque nation reconnait une différence de point de vue non résolu sur le futur du continent.",
            },
            firstNuclearReactor: {
                event: "Mise en service du R1",
                details:
                    "Le R1 premier réacteur nucléaire construit par la Nation de la Terre entre en service dans le plus grand secret.",
            },
            firstStraitCrisis: {
                event: "Première crise du détroit",
                details:
                    "La jeune Nation de la Terre, désireuse de réunifier les anciens territoires de l'ancienne Nation de la Terre, tente d'envahir l'Île Orientale. La Nation des Mers liée par traité réagit en envoyant deux porte-avions et leur escorte. La Nation de la Terre incapable de lutter contre une telle flotte se retire, humiliée.",
            },
            greatWarBegins: {
                event: "Début de la Grande Guerre",
                details:
                    "La Nation Reculée, souhaite profiter du chaos sur le continent pour en prendre le contrôle, la Nation des Mers est également attaquée, la Grande Guerre commence.",
            },
            greatWarEnds: {
                event: "Fin de la Grande Guerre",
                details:
                    "La Nation Reculée capitule après avoir vu ses trois plus grandes villes détruites par des bombardements atomiques. La Grande Guerre est terminée, plus de 80 millions de personnes y ont perdu la vie. Le Continent est ravagée, la Nation des Mers devient de très loin l'état le plus puissant du monde et seul état disposant de l'arme nucléaire.",
            },
            rebirthOfTheNation: {
                event: "Proclamation de la Renaissance de la Nation",
                details:
                    "Une Faction sort victorieuse de la deuxième guerre civile et proclame la Renaissance de la Nation de la Terre.",
            },
            seaNationProtectionTreaty: {
                event: "Traité de Protection",
                details:
                    "Face au chaos du continent, l'Île Orientale auparavant une province de la Nation de la Terre, demande la protection de la Nation des Mers en vertu de l'article 8 de la constitution.",
            },
            secondCivilWarBegins: {
                event: "Début de la Deuxième Guerre Civile",
                details:
                    "La Grande Guerre a laissé le continent ravagé, les Seigneurs de guerre qui quelques années auparavant garantissaient une paix fragile sont décimés.",
            },
            secondStraitCrisis: {
                event: "Deuxième crise du détroit",
                details:
                    "Désormais supportée par la Nation du Nord, la Nation de la Terre tente une nouvelle invasion de l'Île Orientale. La Nation des Mers réagit avec quatre porte-avions et ordonne le déploiement préventif de ses forces nucléaires.",
            },
            sinkingOfTheNepture: {
                event: "Naufrage du Nepture",
                details:
                    "Le Neptune, navire de croisière battant le pavillon de la Nation des Mers sombre à quelques milles nautiques de l'Île Orientale.",
            },
            southerNationBorderConflict: {
                event: "Guerre contre la Nation du Sud",
                details:
                    "Toujours dans le but de rétablir l'héritage de l'ancienne Nation de la Terre, le nouveau gouvernement lance une expédition vers le sud. Ce territoire contrôlé par l'un des derniers seigneurs de guerre, refuse la légitimité de la Nouvelle Nation de la Terre. Le conflit s'enlise.",
            },
            southernNationIndependence: {
                event: "Indépendance de la Nation du Sud",
                details:
                    "Considérant le traité de cohabitation comme une victoire, la Nation du Sud déclare officiellement son indépendance. Pour son premier discours le chef d'état de la nouvelle Nation exprime le besoin pour le continent de faire le deuil de l'ancienne Nation de la Terre.",
            },
            treatyOfUnity: {
                event: "Traité d'Unité",
                details:
                    "Humiliée par sa défaite lors de sa tentative d'envahir l'Île Orientalen la Nation de la Terre signe un traité d'amitié avec la Nation du Nord. La Nation du Nord devient dans les faits un état satellite de la Nation de la Terre.",
            },
            warlordEraBegins: {
                event: "Âge des Seigneurs de Guerre",
                details:
                    "La guerre civile perd en intensité, la situation se stabilise, le territoire de l'ancienne Nation de la Terre est fragmenté et contrôlé par une multitude de seigneurs de guerre à la puissance variable.",
            },
        },
    },
} satisfies Language;

// I use satisfies and not a classic type like const s: TYPE because if i don't then solid i18n would require to do that
// const frCast = fr as unknown as i18n.BaseRecordDict

const flat_dict = i18n.flatten(frDefinition);

const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);
export const fr = i18n.chainedTranslator(frDefinition, t);
