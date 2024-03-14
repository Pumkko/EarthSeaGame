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
const Lobby = lazy(() => import("./features/lobby/Lobby"));
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
          path={Routes.myLobby}
          component={() => (
            <ErrorBoundary fallback={AppError}>
              <Lobby />
            </ErrorBoundary>
          )}
        />
        <Route path={Routes.error} component={AppError} />
      </Router>
    </QueryClientProvider>
  ),
  root!,
);
