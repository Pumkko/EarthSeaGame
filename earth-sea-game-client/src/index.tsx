/* @refresh reload */
import { render } from "solid-js/web";

import { queryClient } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { EnvironmentSchema } from "@lib/schemas/Environment";
import { Route, Router } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { Suspense, lazy } from "solid-js";
import MsalInitializer from "./features/MsalInitializer";
import { GameMasterLobbyContextProvider } from "./features/gameMasterLobby/GameMasterLobbyContext";
import { PlayerLobbyContextProvider } from "./features/playerLobby/PlayerLobbyContext";
import "./index.scss";
const root = document.getElementById("root");

const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));
const GameMasterLobby = lazy(() => import("./features/gameMasterLobby/GameMasterLobby"));
const GameMasterSpyChat = lazy(() => import("./features/gameMasterLobby/tabs/GameMasterLobbySpyChat"));
const GameMasterTeamsChat = lazy(() => import("./features/gameMasterLobby/tabs/GameMasterLobbyTeamsChat"));
const GameMasterLobbySettings = lazy(() => import("./features/gameMasterLobby/tabs/GameMasterLobbySettings"));
const GameMasterCreateLobby = lazy(() => import("./features/createGame/CreateLobby"));
const GameMasterLobbyGateway = lazy(() => import("./features/gameMasterLobby/GameMasterLobbyGateway"));

const PlayerLobby = lazy(() => import("./features/playerLobby/PlayerLobby"));
const PlayerLobbyHome = lazy(() => import("./features/playerLobby/tabs/PlayerLobbyHome"));
const PlayerLobbyChat = lazy(() => import("./features/playerLobby/tabs/PlayerLobbyChat"));
const PlayerLobbygateway = lazy(() => import("./features/playerLobby/PlayerLobbyGateway"));
const PlayerLobbyJoinLobby = lazy(() => import("./features/playerLobby/joinGame/JoinGame"));

const AppError = lazy(() => import("./features/error/AppError"));

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <MsalInitializer>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Route path={Routes.startingMenu} component={StartingMenu} />
                    <Route path={Routes.gameMasterLobby.createLobby} component={GameMasterCreateLobby} />
                    <Route path={Routes.playerLobby.joinLobby} component={PlayerLobbyJoinLobby} />
                    <Route
                        path={Routes.gameMasterLobby.gateway}
                        component={() => (
                            <Suspense fallback={<div>Loading Game Master Lobby...</div>}>
                                <GameMasterLobbyGateway />
                            </Suspense>
                        )}
                    />

                    <Route
                        path={Routes.playerLobby.gateway}
                        component={() => (
                            <Suspense fallback={<div>Loading Player Lobby...</div>}>
                                <PlayerLobbygateway />
                            </Suspense>
                        )}
                    />

                    <Route
                        path={Routes.playerLobby.root}
                        component={(props) => (
                            <Suspense fallback={<div>Loading Player Lobby....</div>}>
                                <PlayerLobbyContextProvider>
                                    <PlayerLobby {...props} />
                                </PlayerLobbyContextProvider>
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
                                <GameMasterLobbyContextProvider>
                                    <GameMasterLobby {...props} />
                                </GameMasterLobbyContextProvider>
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
