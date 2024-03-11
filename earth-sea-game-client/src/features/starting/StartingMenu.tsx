import { Button } from '~/components/ui/button'
import './StartingMenu.scss'

import { useNavigate } from "@solidjs/router";
import Routes from '~/lib/routes';

export default function StartingMenu() {

    const navigate = useNavigate();

    return <div class="starting-menu-container">
        <h1 class='game-title'>Between Earth and Sea</h1>
        <div class='starting-menu-buttons'>
            <Button variant={'secondary'} onclick={() => {
                navigate(Routes.newGame);

            }}>Start New Game</Button>
            <Button variant={'secondary'}>Join Game</Button>
        </div>
    </div>

}