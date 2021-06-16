import { generateBattleLog } from './scripts/battleLogs.js';
import { firstPlayer,  secondPlayer } from './scripts/characters.js';
import { createPlayer, playerAttack, enemyAttack, checkStrikes, 
         getWinner, getTitle, createReloadButton } from './scripts/mainFunc.js';

const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');
const $fightForm = document.querySelector('.control');

$arenas.appendChild( createPlayer( firstPlayer ) );
$arenas.appendChild( createPlayer( secondPlayer ) );
generateBattleLog('start', firstPlayer, secondPlayer);

$fightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const enemy = enemyAttack ();
    const player = playerAttack( e.target );
    
    checkStrikes( player, enemy, secondPlayer, firstPlayer );
    checkStrikes( enemy, player, firstPlayer, secondPlayer );
    
    const winner = getWinner( firstPlayer, secondPlayer );
    if( winner ){
        switch ( winner ) {
            case 'Draw':
                generateBattleLog('draw');
                break;
            case firstPlayer.name:
                generateBattleLog('end', firstPlayer, secondPlayer);
                break;
            case secondPlayer.name:
                generateBattleLog('end', secondPlayer, firstPlayer);
                break;
            default: generateBattleLog();
        }

        $arenas.appendChild( getTitle ( winner ) );
        $button.disabled = true;
        $arenas.appendChild ( createReloadButton() );
    };
});