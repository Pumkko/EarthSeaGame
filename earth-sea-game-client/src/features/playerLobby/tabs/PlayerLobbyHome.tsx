import TimelineCarousel from "@components/TimelineCarousel";
import { Match, Switch } from "solid-js";
import { useAuthenticatedPlayerLobbyContext } from "../PlayerLobbyContext";
import createEarthNationTimeline from "./timelines/earthNationTimeline";
import createEasternIslandTimeline from "./timelines/easternIslandTimeline";
import createSeaNationTimeline from "./timelines/seaNationTimeline";
export default function PlayerLobbyHome() {
    const context = useAuthenticatedPlayerLobbyContext();

    const earthNationTimeline = createEarthNationTimeline();
    const seaNationTimeline = createSeaNationTimeline();
    const easternIsland = createEasternIslandTimeline();

    return (
        <div class="h-full flex flex-col justify-between">
            <Switch>
                <Match when={context.currentGame().nation === "EarthNation"}>
                    <TimelineCarousel events={earthNationTimeline()} />
                </Match>
                <Match when={context.currentGame().nation === "SeaNation"}>
                    <TimelineCarousel events={seaNationTimeline()} />
                </Match>
                <Match when={context.currentGame().nation === "EasternIsland"}>
                    <TimelineCarousel events={easternIsland()} />
                </Match>
            </Switch>
        </div>
    );
}
