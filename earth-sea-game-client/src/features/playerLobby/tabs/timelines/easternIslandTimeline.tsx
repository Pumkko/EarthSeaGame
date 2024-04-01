import { CarouselTimelineEventProps } from "@components/TimelineCarousel";
import { Accessor, createMemo } from "solid-js";
import { useLanguage } from "../../../LanguageProvider";

export default function createEasternIslandTimeline(): Accessor<CarouselTimelineEventProps[]> {
    const language = useLanguage();
    const easternIslandTimeline = () => language().timelines.easternIsland;

    const timeline = createMemo(() => {
        return [
            {
                imagePath: "/easternIslandTimeline/civil_war.webp",
                events: [
                    {
                        date: "1896",
                        event: easternIslandTimeline().collapse.event(),
                        eventDetails: easternIslandTimeline().collapse.details(),
                        eventId: "easternIslandTL_earthNationCollapse",
                    },
                    {
                        date: "1898",
                        event: easternIslandTimeline().civilWar.event(),
                        eventDetails: easternIslandTimeline().civilWar.details(),
                        eventId: "easternIslandTL_earthNationCivilWar",
                    },
                    {
                        date: "1907",
                        event: easternIslandTimeline().seaNationProtectionTreaty.event(),
                        eventDetails: easternIslandTimeline().seaNationProtectionTreaty.details(),
                        eventId: "easternIslandTL_seaNationProtectsEasternIsland",
                    },
                    {
                        date: "1918",
                        event: easternIslandTimeline().warlordEraBegins.event(),
                        eventDetails: easternIslandTimeline().warlordEraBegins.details(),
                        eventId: "easternIslandTL_warlordEraBegins",
                    },
                ],
            },
            {
                imagePath: "/easternIslandTimeline/destroyed_city.webp",
                events: [
                    {
                        date: "1940",
                        event: easternIslandTimeline().greatWarBegins.event(),
                        eventDetails: easternIslandTimeline().greatWarBegins.details(),
                        eventId: "easternIslandTL_greatWarBegins",
                    },
                    {
                        date: "1947",
                        event: easternIslandTimeline().atomicBombings.event(),
                        eventDetails: easternIslandTimeline().atomicBombings.details(),
                        eventId: "easternIslandTL_atomicBombings",
                    },
                    {
                        date: "1947",
                        event: easternIslandTimeline().greatWarEnds.event(),
                        eventDetails: easternIslandTimeline().greatWarEnds.details(),
                        eventId: "easternIslandTL_greatWarEnds",
                    },
                    {
                        date: "1950",
                        event: easternIslandTimeline().secondCivilWarBegins.event(),
                        eventDetails: easternIslandTimeline().secondCivilWarBegins.details(),
                        eventId: "easternIslandTL_secondCivilWarBegins",
                    },
                ],
            },
            {
                imagePath: "/easternIslandTimeline/rebirth_of_the_nation.jpg",
                events: [
                    {
                        date: "1957",
                        event: easternIslandTimeline().rebirthOfTheNation.event(),
                        eventDetails: easternIslandTimeline().rebirthOfTheNation.details(),
                        eventId: "easternIslandTL_rebirthOfTheNation",
                    },
                    {
                        date: "1961",
                        event: easternIslandTimeline().firstStraitCrisis.event(),
                        eventDetails: easternIslandTimeline().firstStraitCrisis.details(),
                        eventId: "easternIslandTL_firstStraitCrisis",
                    },
                    {
                        date: "1962",
                        event: easternIslandTimeline().southerNationBorderConflict.event(),
                        eventDetails: easternIslandTimeline().southerNationBorderConflict.details(),
                        eventId: "easternIslandTL_southernBorderConflict",
                    },
                    {
                        date: "1963",
                        event: easternIslandTimeline().treatyOfUnity.event(),
                        eventDetails: easternIslandTimeline().treatyOfUnity.details(),
                        eventId: "easternIslandTL_TreatyOfUnity",
                    },
                    {
                        date: "1965",
                        event: easternIslandTimeline().cohabitationTreaty.event(),
                        eventDetails: easternIslandTimeline().cohabitationTreaty.details(),
                        eventId: "easternIslandTL_cohabitationTreaty",
                    },
                ],
            },
            {
                imagePath: "/easternIslandTimeline/nuclear_reactor.webp",
                events: [
                    {
                        date: "1966",
                        event: easternIslandTimeline().southernNationIndependence.event(),
                        eventDetails: easternIslandTimeline().southernNationIndependence.details(),
                        eventId: "easternIslandTL_southernIndependence",
                    },
                    {
                        date: "1968",
                        event: easternIslandTimeline().secondStraitCrisis.event(),
                        eventDetails: easternIslandTimeline().secondStraitCrisis.details(),
                        eventId: "easternIslandTL_secondStraitCrisis",
                    },
                    {
                        date: "1979",
                        event: easternIslandTimeline().sinkingOfTheNepture.event(),
                        eventDetails: easternIslandTimeline().sinkingOfTheNepture.details(),
                        eventId: "easternIslandTL_neptuneSinks",
                    },
                ],
            },
        ];
    });

    return timeline;
}
