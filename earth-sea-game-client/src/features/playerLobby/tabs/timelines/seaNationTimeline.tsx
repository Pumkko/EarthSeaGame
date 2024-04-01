import { CarouselTimelineEventProps } from "@components/TimelineCarousel";
import { Accessor, createMemo } from "solid-js";
import { useLanguage } from "../../../LanguageProvider";

export default function createSeaNationTimeline(): Accessor<CarouselTimelineEventProps[]> {
    const language = useLanguage();
    const seaNationTimeline = () => language().timelines.seaNation;

    const timeline = createMemo(() => {
        return [
            {
                imagePath: "/timeline/seaNation/protection_treaty.webp",
                events: [
                    {
                        date: "1896",
                        event: seaNationTimeline().seaNationConstitution.event(),
                        eventDetails: seaNationTimeline().seaNationConstitution.details(),
                        eventId: "seaNationTL_seaNationConstitution",
                    },
                    {
                        date: "1898",
                        event: seaNationTimeline().earthNationCivilWar.event(),
                        eventDetails: seaNationTimeline().earthNationCivilWar.details(),
                        eventId: "seaNationTL_earthNationCivilWar",
                    },
                    {
                        date: "1907",
                        event: seaNationTimeline().easternIslandAsksForProtection.event(),
                        eventDetails: seaNationTimeline().easternIslandAsksForProtection.details(),
                        eventId: "seaNationTL_seaNationProtectsEasternIsland",
                    },
                ],
            },
            {
                imagePath: "/timeline/seaNation/sea_nation_mobilization.webp",
                events: [
                    {
                        date: "1940",
                        event: seaNationTimeline().greatWarBegins.event(),
                        eventDetails: seaNationTimeline().greatWarBegins.details(),
                        eventId: "seaNationTL_greatWarBegins",
                    },
                    {
                        date: "1947",
                        event: seaNationTimeline().atomicBombings.event(),
                        eventDetails: seaNationTimeline().atomicBombings.details(),
                        eventId: "seaNationTL_atomicBombings",
                    },
                    {
                        date: "1947",
                        event: seaNationTimeline().greatWarEnds.event(),
                        eventDetails: seaNationTimeline().greatWarEnds.details(),
                        eventId: "seaNationTL_greatWarEnds",
                    },
                ],
            },
            {
                imagePath: "/timeline/seaNation/naval_task_force.webp",
                events: [
                    {
                        date: "1957",
                        event: seaNationTimeline().earthNationRebirthProclamation.event(),
                        eventDetails: seaNationTimeline().earthNationRebirthProclamation.details(),
                        eventId: "seaNationTL_rebirthOfTheEarthNation",
                    },
                    {
                        date: "1961",
                        event: seaNationTimeline().firstStraitCrisis.event(),
                        eventDetails: seaNationTimeline().firstStraitCrisis.details(),
                        eventId: "seaNationTL_firstStraitCrisis",
                    },
                    {
                        date: "1962",
                        event: seaNationTimeline().southernNationConflict.event(),
                        eventDetails: seaNationTimeline().southernNationConflict.details(),
                        eventId: "seaNationTL_southernConflict",
                    },
                ],
            },
            {
                imagePath: "/timeline/neptune_attack.webp",
                events: [
                    {
                        date: "1966",
                        event: seaNationTimeline().earthNationTreatyWithNeighbor.event(),
                        eventDetails: seaNationTimeline().earthNationTreatyWithNeighbor.details(),
                        eventId: "seaNationTL_continentalPeace",
                    },
                    {
                        date: "1968",
                        event: seaNationTimeline().secondStraitCrisis.event(),
                        eventDetails: seaNationTimeline().secondStraitCrisis.details(),
                        eventId: "seaNationTL_secondStraitCrisis",
                    },
                    {
                        date: "1979",
                        event: seaNationTimeline().sinkingOfTheNeptune.event(),
                        eventDetails: seaNationTimeline().sinkingOfTheNeptune.details(),
                        eventId: "seaNationTL_neptuneSinks",
                    },
                ],
            },
        ];
    });

    return timeline;
}
