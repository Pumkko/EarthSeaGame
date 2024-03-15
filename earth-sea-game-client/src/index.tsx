/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { ErrorBoundary, lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { EnvironmentSchema } from "@lib/schemas/Environment";
import Routes from "@lib/Routes";
import { queryClient } from "@lib/QueryClient";
import { QueryKeys } from "@lib/QueryKeys";
const root = document.getElementById("root");

const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));
const CreateLobby = lazy(() => import("./features/lobby/createLobby/CreateLobby"));
const ManageLobbyRoot = lazy(() => import("./features/lobby/manageLobby/ManageLobby"));
const ManageLobbySpyChat = lazy(() => import("./features/lobby/manageLobby/tabs/SpyChat"));
const ManageLobbyTeamsChat = lazy(() => import("./features/lobby/manageLobby/tabs/TeamsChat"));
const ManageLobbyOptions = lazy(() => import("./features/lobby/manageLobby/tabs/Options"));
const AppError = lazy(() => import("./features/error/AppError"));

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Route path={Routes.startingMenu} component={StartingMenu} />
                <Route
                    path={Routes.createLobby}
                    component={() => (
                        <ErrorBoundary fallback={AppError}>
                            <CreateLobby />
                        </ErrorBoundary>
                    )}
                />
                <Route path={Routes.myLobby.root} component={ManageLobbyRoot}>
                    <Route path={Routes.myLobby.home} component={ManageLobbyOptions} />
                    <Route path={Routes.myLobby.spyChat} component={ManageLobbySpyChat} />
                    <Route path={Routes.myLobby.teamsChat} component={ManageLobbyTeamsChat} />
                </Route>

                <Route path="*404" component={() => <div>Not Found</div>} />
                <Route path={Routes.error} component={AppError} />
            </Router>
        </QueryClientProvider>
    ),
    root!,
);
