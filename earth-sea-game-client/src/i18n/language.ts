import { ChatMessageSender } from "@lib/schemas/MessageSchema";

type MessageSenderToLanguage = {
    [key in ChatMessageSender]: string;
};

type TimelineEventI18n = {
    event: string;
    details: string;
};

export interface Language {
    gameTitle: string;
    startingMenu: {
        joinGameButton: string;
        myGameButton: string;
    };
    messageSender: MessageSenderToLanguage;
    playerLobby: {
        homeTab: string;
        chatTab: string;
        worldMap: string;
    };
    createGame: {
        screenTitle: string;
        gameNameFieldPlaceholder: string;
        gameNameFieldEmptyError: string;
        submitButton: string;
    };
    joinGame: {
        screenTitle: string;
        labels: {
            pickNationFieldLabel: string;
            gameMasterFieldLabel: string;
            inviteCodeFieldLabel: string;
        };
        errors: {
            emptyGameMasterNameError: string;
            incorrectFormatInviteCodeError: string;
            noNationSelectedError: string;
            unknownError: string;
        };
        pickNationFieldDefaultOption: string;
        submitButton: string;
    };
    gameMasterLobby: {
        homeTab: string;
        spyChatTab: string;
        teamsChatTab: string;
    };
    timelines: {
        detailModalTitle: string;
        earthNation: {
            collapse: TimelineEventI18n;
            civilWar: TimelineEventI18n;
            seaNationProtectionTreaty: TimelineEventI18n;
            warlordEraBegins: TimelineEventI18n;
            greatWarBegins: TimelineEventI18n;
            atomicBombings: TimelineEventI18n;
            greatWarEnds: TimelineEventI18n;
            secondCivilWarBegins: TimelineEventI18n;
            rebirthOfTheNation: TimelineEventI18n;
            firstStraitCrisis: TimelineEventI18n;
            southerNationBorderConflict: TimelineEventI18n;
            treatyOfUnity: TimelineEventI18n;
            cohabitationTreaty: TimelineEventI18n;
            southernNationIndependence: TimelineEventI18n;
            secondStraitCrisis: TimelineEventI18n;
            firstNuclearReactor: TimelineEventI18n;
            sinkingOfTheNepture: TimelineEventI18n;
        };
        seaNation: {
            seaNationConstitution: TimelineEventI18n;
            earthNationCivilWar: TimelineEventI18n;
            easternIslandAsksForProtection: TimelineEventI18n;
            greatWarBegins: TimelineEventI18n;
            atomicBombings: TimelineEventI18n;
            greatWarEnds: TimelineEventI18n;
            earthNationRebirthProclamation: TimelineEventI18n;
            firstStraitCrisis: TimelineEventI18n;
            southernNationConflict: TimelineEventI18n;
            earthNationTreatyWithNeighbor: TimelineEventI18n;
            secondStraitCrisis: TimelineEventI18n;
            sinkingOfTheNeptune: TimelineEventI18n;
        };
        easternIsland: {
            collapse: TimelineEventI18n;
            civilWar: TimelineEventI18n;
            seaNationProtectionTreaty: TimelineEventI18n;
            warlordEraBegins: TimelineEventI18n;
            greatWarBegins: TimelineEventI18n;
            atomicBombings: TimelineEventI18n;
            greatWarEnds: TimelineEventI18n;
            secondCivilWarBegins: TimelineEventI18n;
            rebirthOfTheNation: TimelineEventI18n;
            firstStraitCrisis: TimelineEventI18n;
            southerNationBorderConflict: TimelineEventI18n;
            treatyOfUnity: TimelineEventI18n;
            cohabitationTreaty: TimelineEventI18n;
            southernNationIndependence: TimelineEventI18n;
            secondStraitCrisis: TimelineEventI18n;
            sinkingOfTheNepture: TimelineEventI18n;
        };
    };
}
