import { CarouselTimelineEventProps } from "@components/TimelineCarousel";
import { Accessor, createMemo } from "solid-js";
import { useLanguage } from "../../../LanguageProvider";

export default function createEarthNationTimeline(): Accessor<CarouselTimelineEventProps[]> {
    const language = useLanguage();
    const earthNationTimeline = () => language().timelines.earthNation;

    const timeline = createMemo(() => {
        return [
            {
                imagePath: "/timeline/civil_war.webp",
                events: [
                    {
                        date: "1896",
                        event: earthNationTimeline().collapse.event(),
                        eventDetails: earthNationTimeline().collapse.details(),
                        eventId: "earthNationTL_earthNationCollapse",
                    },
                    {
                        date: "1898",
                        event: earthNationTimeline().civilWar.event(),
                        eventDetails: earthNationTimeline().civilWar.details(),
                        eventId: "earthNationTL_earthNationCivilWar",
                    },
                    {
                        date: "1907",
                        event: earthNationTimeline().seaNationProtectionTreaty.event(),
                        eventDetails: earthNationTimeline().seaNationProtectionTreaty.details(),
                        eventId: "earthNationTL_seaNationProtectsEasternIsland",
                    },
                    {
                        date: "1918",
                        event: earthNationTimeline().warlordEraBegins.event(),
                        eventDetails: earthNationTimeline().warlordEraBegins.details(),
                        eventId: "earthNationTL_warlordEraBegins",
                    },
                ],
            },
            {
                imagePath: "/timeline/destroyed_city.webp",
                events: [
                    {
                        date: "1940",
                        event: earthNationTimeline().greatWarBegins.event(),
                        eventDetails: earthNationTimeline().greatWarBegins.details(),
                        eventId: "earthNationTL_greatWarBegins",
                    },
                    {
                        date: "1947",
                        event: earthNationTimeline().atomicBombings.event(),
                        eventDetails: earthNationTimeline().atomicBombings.details(),
                        eventId: "earthNationTL_atomicBombings",
                    },
                    {
                        date: "1947",
                        event: earthNationTimeline().greatWarEnds.event(),
                        eventDetails: earthNationTimeline().greatWarEnds.details(),
                        eventId: "earthNationTL_greatWarEnds",
                    },
                    {
                        date: "1950",
                        event: earthNationTimeline().secondCivilWarBegins.event(),
                        eventDetails: earthNationTimeline().secondCivilWarBegins.details(),
                        eventId: "earthNationTL_secondCivilWarBegins",
                    },
                ],
            },
            {
                imagePath: "/timeline/rebirth_of_the_nation.webp",
                events: [
                    {
                        date: "1957",
                        event: earthNationTimeline().rebirthOfTheNation.event(),
                        eventDetails: earthNationTimeline().rebirthOfTheNation.details(),
                        eventId: "earthNationTL_rebirthOfTheNation",
                    },
                    {
                        date: "1961",
                        event: earthNationTimeline().firstStraitCrisis.event(),
                        eventDetails: earthNationTimeline().firstStraitCrisis.details(),
                        eventId: "earthNationTL_firstStraitCrisis",
                    },
                    {
                        date: "1962",
                        event: earthNationTimeline().southerNationBorderConflict.event(),
                        eventDetails: earthNationTimeline().southerNationBorderConflict.details(),
                        eventId: "earthNationTL_southernBorderConflict",
                    },
                    {
                        date: "1963",
                        event: earthNationTimeline().treatyOfUnity.event(),
                        eventDetails: earthNationTimeline().treatyOfUnity.details(),
                        eventId: "earthNationTL_TreatyOfUnity",
                    },
                    {
                        date: "1965",
                        event: earthNationTimeline().cohabitationTreaty.event(),
                        eventDetails: earthNationTimeline().cohabitationTreaty.details(),
                        eventId: "earthNationTL_cohabitationTreaty",
                    },
                ],
            },
            {
                imagePath: "/timeline/earthNation/nuclear_reactor.webp",
                events: [
                    {
                        date: "1966",
                        event: earthNationTimeline().southernNationIndependence.event(),
                        eventDetails: earthNationTimeline().southernNationIndependence.details(),
                        eventId: "earthNationTL_southernIndependence",
                    },
                    {
                        date: "1968",
                        event: earthNationTimeline().secondStraitCrisis.event(),
                        eventDetails: earthNationTimeline().secondStraitCrisis.details(),
                        eventId: "earthNationTL_secondStraitCrisis",
                    },
                    {
                        date: "1978",
                        event: earthNationTimeline().firstNuclearReactor.event(),
                        eventDetails: earthNationTimeline().firstNuclearReactor.details(),
                        eventId: "earthNationTL_firstNuclearReactor",
                    },
                    {
                        date: "1979",
                        event: earthNationTimeline().sinkingOfTheNepture.event(),
                        eventDetails: earthNationTimeline().sinkingOfTheNepture.details(),
                        eventId: "earthNationTL_neptuneSinks",
                    },
                ],
            },
        ];
    });

    return timeline;
}
