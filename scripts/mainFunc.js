import { generateBattleLog } from './battleLogs.js';
import { getElement, getRandom } from './utilities.js';
import { Player } from './characters.js';
import { Query } from './queries.js';

const $arenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control');
const $button = document.querySelector('.button');

class Game {
    async start() {
        this.createArena();
        const queries = new Query();

        const player1 = JSON.parse(localStorage.getItem('player1'));
        const player2 = await queries.getEnemy();

        let firstPlayer = new Player ({
            ...player1,
            player: 1,
            rootSelector: $arenas
        });

        let secondPlayer = new Player ({
            ...player2,
            player: 2,
            rootSelector: $arenas
        });

        firstPlayer.createPlayer();
        secondPlayer.createPlayer();
        generateBattleLog( 'start', firstPlayer, secondPlayer );

        $fightForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const playerChoice = this.getPlayerAttack( e.target );
            const resultBattle = await queries.getBattleResult( playerChoice );
            
            const player = resultBattle.player1;
            const enemy = resultBattle.player2;
            
            this.checkStrikes( player, enemy, secondPlayer, firstPlayer );
            this.checkStrikes( enemy, player, firstPlayer, secondPlayer );
            
            const winner = this.getWinner( firstPlayer, secondPlayer );
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
        
                $arenas.appendChild( this.getTitle ( winner ) );
                $button.disabled = true;
                $arenas.appendChild ( this.createReloadButton() );
            };
        });
    }

    createArena () {
        $arenas.classList.add( `arena${getRandom(5)}` );
    }

    getPlayerAttack ( target ) {
        const attack = {};
        
        for( let item of target ) {
            if( item.checked && item.name == 'hit' ) attack.hit = item.value;
            if( item.checked && item.name == 'defence') attack.defence = item.value;
    
            item.checked = false;
        }

        return attack;
    }

    checkStrikes ( attackFighter, defendFighter, defendingPlayer, attackingPlayer ) {
        let { hit, value: dmgValue } = attackFighter;
        let { defence } = defendFighter;
        
        if( hit != defence ){
            defendingPlayer.changeHp( dmgValue );
            defendingPlayer.renderHP( defendingPlayer.elHP() );
    
            generateBattleLog('hit', defendingPlayer, attackingPlayer, dmgValue);
        }
        else generateBattleLog('defence', defendingPlayer, attackingPlayer, dmgValue);
    }

    getWinner ( firstPlayer, secondPlayer ) {
        if( firstPlayer.hp == 0 && secondPlayer.hp == 0 ) return 'Draw';
        else if ( firstPlayer.hp == 0 ) return secondPlayer.name;   
        else if ( secondPlayer.hp == 0 ) return firstPlayer.name;
        return 0;
    }

    getTitle ( playerName ) {
        let $title = getElement( 'div', 'resultTitle' );
        if( playerName == 'Draw') $title.innerText = 'Draw';
        else $title.innerText = `${playerName} wins`;
        return $title;
    }

    createReloadButton () {
        let $buttonWrapper = getElement( 'div', 'reloadWrap' );
        let $reloadButton = getElement( 'button', 'button' );
        $reloadButton.innerText = 'Reload';
    
        $buttonWrapper.appendChild( $reloadButton );
        $reloadButton.addEventListener( 'click', () => { window.location.pathname = 'index.html'; } );
    
        return $buttonWrapper;
    }
}

export {Game};