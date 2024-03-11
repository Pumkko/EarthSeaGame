/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";

import './index.css'
import { lazy } from 'solid-js';
import Routes from './lib/routes';
const NewGame = lazy(() => import("./features/newGame/NewGame"));
const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));


const root = document.getElementById('root')

render(() => <Router>
    <Route path={Routes.startingMenu} component={StartingMenu}></Route>
    <Route path={Routes.newGame} component={NewGame}></Route>
</Router>, root!)
