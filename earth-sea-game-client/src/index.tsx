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
const ManageLobbyRoot = lazy(() => import("./features/lobby/manageLobby/ManageLobby"));
const ManageLobbySpyChat = lazy(() => import("./features/lobby/manageLobby/tabs/SpyChat"));
const ManageLobbyTeamsChat = lazy(() => import("./features/lobby/manageLobby/tabs/TeamsChat"));
const ManageLobbyOptions = lazy(() => import("./features/lobby/manageLobby/tabs/Options"));
const AppError = lazy(() => import("./features/error/AppError"));
const JoinLobby = lazy(() => import("./features/lobby/joinLobby/JoinLobbyForm"));

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <MsalInitializer>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Route path={Routes.startingMenu} component={StartingMenu} />
                    <Route path={Routes.joinLobby} component={JoinLobby} />

                    <Route path={Routes.manageLobby.root} component={ManageLobbyRoot}>
                        <Route path={Routes.manageLobby.option} component={ManageLobbyOptions} />
                        <Route path={Routes.manageLobby.spyChat} component={ManageLobbySpyChat} />
                        <Route path={Routes.manageLobby.teamsChat} component={ManageLobbyTeamsChat} />
                    </Route>

                    <Route path="*404" component={() => <div>Not Found</div>} />
                    <Route path={Routes.error} component={AppError} />
                </Router>
            </QueryClientProvider>
        </MsalInitializer>
    ),
    root!,
);
