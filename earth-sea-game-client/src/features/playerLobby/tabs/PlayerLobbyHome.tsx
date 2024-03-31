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
                                    event: earthNationTimeline().collapse(),
                                },
                                {
                                    date: "1898",
                                    event: earthNationTimeline().civilWar(),
                                },
                                {
                                    date: "1907",
                                    event: earthNationTimeline().seaNationProtectionTreaty(),
                                },
                                {
                                    date: "1918",
                                    event: earthNationTimeline().warlordEraBegins(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/destroyed_city.webp",
                            events: [
                                {
                                    date: "1940",
                                    event: earthNationTimeline().greatWarBegins(),
                                },
                                {
                                    date: "1947",
                                    event: earthNationTimeline().atomicBombings(),
                                },
                                {
                                    date: "1947",
                                    event: earthNationTimeline().greatWarEnds(),
                                },
                                {
                                    date: "1950",
                                    event: earthNationTimeline().secondCivilWarBegins(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/rebirth_of_the_nation.jpg",
                            events: [
                                {
                                    date: "1957",
                                    event: earthNationTimeline().rebirthOfTheNation(),
                                },
                                {
                                    date: "1961",
                                    event: earthNationTimeline().firstStraitCrisis(),
                                },
                                {
                                    date: "1962",
                                    event: earthNationTimeline().southerNationBorderConflict(),
                                },
                                {
                                    date: "1963",
                                    event: earthNationTimeline().treatyOfUnity(),
                                },
                                {
                                    date: "1965",
                                    event: earthNationTimeline().cohabitationTreaty(),
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/nuclear_reactor.webp",
                            events: [
                                {
                                    date: "1966",
                                    event: earthNationTimeline().southernNationIndependence(),
                                },
                                {
                                    date: "1968",
                                    event: earthNationTimeline().secondStraitCrisis(),
                                },
                                {
                                    date: "1978",
                                    event: earthNationTimeline().firstNuclearReactor(),
                                },
                                {
                                    date: "1979",
                                    event: earthNationTimeline().sinkingOfTheNepture(),
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </Show>
    );
}
