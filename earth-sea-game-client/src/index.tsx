/* @refresh reload */
import { render } from "solid-js/web";

import "./index.scss";
import { Suspense, lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { EnvironmentSchema } from "@lib/schemas/Environment";
import Routes from "@lib/Routes";
import { queryClient } from "@lib/QueryClient";
import MsalInitializer from "./features/MsalInitializer";
const root = document.getElementById("root");

const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));
const GameMasterLobby = lazy(() => import("./features/gameMasterLobby/GameMasterLobby"));
const GameMasterSpyChat = lazy(() => import("./features/gameMasterLobby/tabs/GameMasterLobbySpyChat"));
const GameMasterTeamsChat = lazy(() => import("./features/gameMasterLobby/tabs/teamsChat/GameMasterLobbyTeamsChat"));
const GameMasterLobbySettings = lazy(() => import("./features/gameMasterLobby/tabs/settings/GameMasterLobbySettings"));

const PlayerLobby = lazy(() => import("./features/playerLobby/PlayerLobby"));
const PlayerLobbyHome = lazy(() => import("./features/playerLobby/tabs/PlayerLobbyHome"));
const PlayerLobbyChat = lazy(() => import("./features/playerLobby/tabs/PlayerLobbyChat"));

const AppError = lazy(() => import("./features/error/AppError"));

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <MsalInitializer>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Route path={Routes.startingMenu} component={StartingMenu} />
                    <Route
                        path={Routes.playerLobby.root}
                        component={(props) => (
                            <Suspense fallback={<div>Loading Player Lobby....</div>}>
                                <PlayerLobby {...props} />
                            </Suspense>
                        )}
                    >
                        <Route path={Routes.playerLobby.playerHome} component={PlayerLobbyHome} />
                        <Route path={Routes.playerLobby.chat} component={PlayerLobbyChat} />
                    </Route>

                    <Route
                        path={Routes.gameMasterLobby.root}
                        component={(props) => (
                            <Suspense fallback={<div>Loading Game Master Lobby...</div>}>
                                <GameMasterLobby {...props} />
                            </Suspense>
                        )}
                    >
                        <Route path={Routes.gameMasterLobby.option} component={GameMasterLobbySettings} />
                        <Route path={Routes.gameMasterLobby.spyChat} component={GameMasterSpyChat} />
                        <Route path={Routes.gameMasterLobby.teamsChat} component={GameMasterTeamsChat} />
                    </Route>

                    <Route path="*404" component={() => <div>Not Found</div>} />
                    <Route path={Routes.error} component={AppError} />
                </Router>
            </QueryClientProvider>
        </MsalInitializer>
    ),
    root!,
);
