import './StartingMenu.scss'

import { useNavigate } from "@solidjs/router";
import StartingMenuButton from './components/StartingMenuButton';

export default function StartingMenu() {

    const navigate = useNavigate();

    return <div class="starting-menu-container">
        <h1 class='game-title'>Between Earth and Sea</h1>
        <div class='flex gap-8'>
            <StartingMenuButton/>
            <StartingMenuButton/>
        </div>
    </div>

}