import { Button } from '~/components/ui/button'
import './StartingMenu.scss'

export default function StartingMenu() {
    return <div class="starting-menu-container">
        <p class='game-title'>Between Earth and Sea</p>
        <div class='starting-menu-buttons'>
            <Button variant={'secondary'}>Start New Game</Button>
            <Button variant={'secondary'}>Join Game</Button>
        </div>
    </div>

}