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
                            imagePath: "/earthNationTimeline/army_marching.webp",
                            events: [
                                {
                                    date: "1804",
                                    event: "Sea Nation Adopts new Constitution",
                                },
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
                                {
                                    date: "1959",
                                    event: "First Strait Crisis",
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </Show>
    );
}
