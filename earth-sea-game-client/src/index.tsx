/* @refresh reload */
import { render } from "solid-js/web";

import "./index.scss";
import { lazy } from "solid-js";
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
const GameMasterTeamsChat = lazy(() => import("./features/gameMasterLobby/tabs/GameMasterLobbyTeamsChat"));
const GameMasterLobbySettings = lazy(() => import("./features/gameMasterLobby/tabs/settings/GameMasterLobbySettings"));
const AppError = lazy(() => import("./features/error/AppError"));
const JoinGame = lazy(() => import("./features/joinGame/JoinGame"));

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <MsalInitializer>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Route path={Routes.startingMenu} component={StartingMenu} />
                    <Route path={Routes.joinLobby} component={JoinGame} />

                    <Route path={Routes.manageLobby.root} component={GameMasterLobby}>
                        <Route path={Routes.manageLobby.option} component={GameMasterLobbySettings} />
                        <Route path={Routes.manageLobby.spyChat} component={GameMasterSpyChat} />
                        <Route path={Routes.manageLobby.teamsChat} component={GameMasterTeamsChat} />
                    </Route>

                    <Route path="*404" component={() => <div>Not Found</div>} />
                    <Route path={Routes.error} component={AppError} />
                </Router>
            </QueryClientProvider>
        </MsalInitializer>
    ),
    root!,
);
