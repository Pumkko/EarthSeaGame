/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Routes from "./lib/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { EnvironmentSchema } from "./lib/Environment";

const root = document.getElementById("root");

const NewGame = lazy(() => import("./features/newGame/NewGame"));
const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));

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
        <Route path={Routes.newGame} component={NewGame}></Route>
      </Router>
    </QueryClientProvider>
  ),
  root!,
);
