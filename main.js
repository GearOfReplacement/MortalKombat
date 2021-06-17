import { generateBattleLog } from './scripts/battleLogs.js';
import { Player } from './scripts/characters.js';
import { Game } from './scripts/mainFunc.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');
const game = new Game;

const firstPlayer = new Player ( { 
    player: 1, 
    name: 'Sup-Zero', 
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    hp: 100,
    rootSelector: $arenas
} );
const secondPlayer = new Player ( {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    rootSelector: $arenas
} );

firstPlayer.createPlayer();
secondPlayer.createPlayer();

game.start( $fightForm, firstPlayer, secondPlayer, $arenas );
generateBattleLog( 'start', firstPlayer, secondPlayer );