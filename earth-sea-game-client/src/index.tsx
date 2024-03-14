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
const ManageLobbySpyChat = lazy(() => import("./features/lobby/manageLobby/SpyChat"));
const ManageLobbyTeamsChat = lazy(() => import("./features/lobby/manageLobby/TeamsChat"));
const ManageLobbyOptions = lazy(() => import("./features/lobby/manageLobby/Options"));
const AppError = lazy(() => import("./features/error/AppError"));

queryClient.prefetchQuery({
    queryKey: QueryKeys.lobby,
});

EnvironmentSchema.parse(import.meta.env);

render(
    () => (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Route path={Routes.startingMenu} component={StartingMenu}></Route>
                <Route
                    path={Routes.createLobby}
                    component={() => (
                        <ErrorBoundary fallback={AppError}>
                            <CreateLobby />
                        </ErrorBoundary>
                    )}
                />
                <Route path={Routes.myLobby.root} component={ManageLobbyRoot}>
                    <Route path={Routes.myLobby.option} component={ManageLobbyOptions}></Route>
                    <Route path={Routes.myLobby.spyChat} component={ManageLobbySpyChat}></Route>
                    <Route path={Routes.myLobby.teamsChat} component={ManageLobbyTeamsChat}></Route>
                </Route>

                <Route path="*404" component={() => <div>Not Found</div>} />
                <Route path={Routes.error} component={AppError} />
            </Router>
        </QueryClientProvider>
    ),
    root!,
);
