import TimelineCarousel from "@components/TimelineCarousel";
import { Show, useContext } from "solid-js";
import { useLanguage } from "../../LanguageProvider";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

    const language = useLanguage();

    const earthNationTimeline = () => language().timelines.earthNation;

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <Show when={!!context.currentGame()}>
            <div class="h-full flex flex-col justify-between">
                <TimelineCarousel
                    events={[
                        {
                            imagePath: "/earthNationTimeline/civil_war.webp",
                            events: [
                                {
                                    date: "1896",
                                    event: earthNationTimeline().collapse.event(),
                                    eventDetails: earthNationTimeline().collapse.details(),
                                },
                                {
                                    date: "1898",
                                    event: earthNationTimeline().civilWar.event(),
                                    eventDetails: earthNationTimeline().civilWar.details(),
                                },
                                {
                                    date: "1907",
                                    event: earthNationTimeline().seaNationProtectionTreaty.event(),
                                    eventDetails: earthNationTimeline().seaNationProtectionTreaty.details(),
                                },
                                {
                                    date: "1918",
                                    event: earthNationTimeline().warlordEraBegins.event(),
                                    eventDetails: earthNationTimeline().warlordEraBegins.details(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/destroyed_city.webp",
                            events: [
                                {
                                    date: "1940",
                                    event: earthNationTimeline().greatWarBegins.event(),
                                    eventDetails: earthNationTimeline().greatWarBegins.details(),
                                },
                                {
                                    date: "1947",
                                    event: earthNationTimeline().atomicBombings.event(),
                                    eventDetails: earthNationTimeline().atomicBombings.details(),
                                },
                                {
                                    date: "1947",
                                    event: earthNationTimeline().greatWarEnds.event(),
                                    eventDetails: earthNationTimeline().greatWarEnds.details(),
                                },
                                {
                                    date: "1950",
                                    event: earthNationTimeline().secondCivilWarBegins.event(),
                                    eventDetails: earthNationTimeline().secondCivilWarBegins.details(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/rebirth_of_the_nation.jpg",
                            events: [
                                {
                                    date: "1957",
                                    event: earthNationTimeline().rebirthOfTheNation.event(),
                                    eventDetails: earthNationTimeline().rebirthOfTheNation.details(),
                                },
                                {
                                    date: "1961",
                                    event: earthNationTimeline().firstStraitCrisis.event(),
                                    eventDetails: earthNationTimeline().collapse.details(),
                                },
                                {
                                    date: "1962",
                                    event: earthNationTimeline().southerNationBorderConflict.event(),
                                    eventDetails: earthNationTimeline().southerNationBorderConflict.details(),
                                },
                                {
                                    date: "1963",
                                    event: earthNationTimeline().treatyOfUnity.event(),
                                    eventDetails: earthNationTimeline().treatyOfUnity.details(),
                                },
                                {
                                    date: "1965",
                                    event: earthNationTimeline().cohabitationTreaty.event(),
                                    eventDetails: earthNationTimeline().cohabitationTreaty.details(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/nuclear_reactor.webp",
                            events: [
                                {
                                    date: "1966",
                                    event: earthNationTimeline().southernNationIndependence.event(),
                                    eventDetails: earthNationTimeline().southernNationIndependence.details(),
                                },
                                {
                                    date: "1968",
                                    event: earthNationTimeline().secondStraitCrisis.event(),
                                    eventDetails: earthNationTimeline().secondStraitCrisis.details(),
                                },
                                {
                                    date: "1978",
                                    event: earthNationTimeline().firstNuclearReactor.event(),
                                    eventDetails: earthNationTimeline().firstNuclearReactor.details(),
                                },
                                {
                                    date: "1979",
                                    event: earthNationTimeline().sinkingOfTheNepture.event(),
                                    eventDetails: earthNationTimeline().sinkingOfTheNepture.details(),
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </Show>
    );
}
