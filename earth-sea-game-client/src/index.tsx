/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import { lazy } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Routes from './lib/Routes';

const root = document.getElementById('root')

const NewGame = lazy(() => import("./features/newGame/NewGame"));
const StartingMenu = lazy(() => import("./features/starting/StartingMenu"));


render(() => <Router>
    <Route path={Routes.startingMenu} component={StartingMenu}></Route>
    <Route path={Routes.newGame} component={NewGame}></Route>
</Router>, root!)
