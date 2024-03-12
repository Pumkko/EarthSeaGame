import { useNavigate } from "@solidjs/router";
import StartingMenuButton from './components/StartingMenuButton';
import Routes from '../../lib/Routes';

export default function StartingMenu() {

    const navigate = useNavigate();

    const onStartNewGame = () => {
        navigate(Routes.newGame);
    }
    
    return <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
        <h1 class='text-8xl text-white'>Between Earth and Sea</h1>
        <div class='flex gap-8'>
            <StartingMenuButton title='Start New Game' onClick={onStartNewGame} />
            <StartingMenuButton title='Join Game'/>
        </div>
    </div>

}