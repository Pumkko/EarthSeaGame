import TimelineCarousel from "@components/TimelineCarousel";
import { Show, useContext } from "solid-js";
import { useLanguage } from "../../LanguageProvider";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

    const language = useLanguage();

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
                                    event: language().timelines.earthNation.earthNationCollapse(),
                                },
                                {
                                    date: "1898",
                                    event: "Earth Nations plunges into Civil War",
                                },
                                {
                                    date: "1907",
                                    event: "Eastern Island asks Sea Nation for protection",
                                },
                                {
                                    date: "1918",
                                    event: "Warlord Era begins",
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/destroyed_city.webp",
                            events: [
                                {
                                    date: "1940",
                                    event: "Great War begins",
                                },
                                {
                                    date: "1947",
                                    event: "Atomic Bombings of the Far Away Nation",
                                },
                                {
                                    date: "1947",
                                    event: "Great War ends",
                                },
                                {
                                    date: "1950",
                                    event: "Second Civil War Begins",
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/naval_task_force.webp",
                            events: [
                                {
                                    date: "1957",
                                    event: "Rebirth of the Earth Nation",
                                },
                                {
                                    date: "1961",
                                    event: "First Strait Crisis",
                                },
                                {
                                    date: "1962",
                                    event: "Border Conflict with the Southern Nation",
                                },
                                {
                                    date: "1963",
                                    event: "Treaty of Unity is signed",
                                },
                                {
                                    date: "1965",
                                    event: "Cordial Treaty is signed",
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/nuclear_reactor.webp",
                            events: [
                                {
                                    date: "1966",
                                    event: "Southern Nation Declares Independance",
                                },
                                {
                                    date: "1968",
                                    event: "Second Strait Crisis",
                                },
                                {
                                    date: "1978",
                                    event: "First Nuclear Reactor enters service",
                                },
                                {
                                    date: "1979",
                                    event: "Sinking of the Nepture",
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </Show>
    );
}
