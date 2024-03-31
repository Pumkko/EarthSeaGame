import TimelineCarousel from "@components/TimelineCarousel";
import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

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
                                    event: "Earth Nation Explodes",
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
                                {
                                    date: "1940",
                                    event: "Great War begins",
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/destroyed_city.webp",
                            events: [
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
                                {
                                    date: "1957",
                                    event: "Rebirth of the Earth Nation",
                                },
                            ],
                        },
                        {
                            imagePath: "/earthNationTimeline/naval_task_force.webp",
                            events: [
                                {
                                    date: "1958",
                                    event: "First Strait Crisis",
                                },
                                {
                                    date: "1959",
                                    event: "Treaty of Unity is signed",
                                },
                                {
                                    date: "1965",
                                    event: "Second Strait Crisis",
                                },
                                {
                                    date: "1968",
                                    event: "Cordial Treaty is signed",
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </Show>
    );
}
