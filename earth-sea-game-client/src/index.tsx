/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Routes from "./lib/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { EnvironmentSchema } from "./lib/Environment";

const root = document.getElementById("root");

const NewGame = lazy(() => import("./features/createLobby/CreateLobby"));
const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));
const Games = lazy(() => import("./features/lobby/lobbies"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

EnvironmentSchema.parse(import.meta.env);

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path={Routes.startingMenu} component={StartingMenu}></Route>
        <Route path={Routes.newGameLobby} component={NewGame}></Route>
        <Route path={Routes.lobbies} component={Games} />
      </Router>
    </QueryClientProvider>
  ),
  root!,
);
