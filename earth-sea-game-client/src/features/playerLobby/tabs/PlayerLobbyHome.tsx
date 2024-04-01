import TimelineCarousel from "@components/TimelineCarousel";
import { Match, Show, Switch, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import createEarthNationTimeline from "./timelines/earthNationTimeline";
import createEasternIslandTimeline from "./timelines/easternIslandTimeline";
import createSeaNationTimeline from "./timelines/seaNationTimeline";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

    const earthNationTimeline = createEarthNationTimeline();
    const seaNationTimeline = createSeaNationTimeline();
    const easternIsland = createEasternIslandTimeline();

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
                    <Match when={context.currentGame()?.nation === "EasternIsland"}>
                        <TimelineCarousel events={easternIsland()} />
                    </Match>
                </Switch>
            </div>
        </Show>
    );
}
