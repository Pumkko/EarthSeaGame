import TimelineCarousel from "@components/TimelineCarousel";
import { Match, Show, Switch, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import createEarthNationTimeline from "./timelines/earthNationTimeline";
import createSeaNationTimeline from "./timelines/seaNationTimeline";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

    const earthNationTimeline = createEarthNationTimeline();
    const seaNationTimeline = createSeaNationTimeline();

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <Show when={!!context.currentGame()}>
            <div class="h-full flex flex-col justify-between">
                <Switch>
                    <Match when={context.currentGame()?.nation === "EarthNation"}>
                        <TimelineCarousel events={earthNationTimeline()} />
                    </Match>
                    <Match when={context.currentGame()?.nation === "SeaNation"}>
                        <TimelineCarousel events={seaNationTimeline()} />
                    </Match>
                </Switch>
            </div>
        </Show>
    );
}
