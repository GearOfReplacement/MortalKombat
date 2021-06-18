import { generateBattleLog } from './battleLogs.js';
import { getElement, getRandom } from './utilities.js';

const $button = document.querySelector('.button');
const ATTACK = ['head', 'body', 'foot'];
const HIT = { head: 30, body: 25, foot: 20, }

class Game {
    start( $fightForm, firstPlayer, secondPlayer, $rootSelector ) {
        $fightForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const enemy = this.enemyAttack ();
            const player = this.playerAttack( e.target );
            
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
        
                $rootSelector.appendChild( this.getTitle ( winner ) );
                $button.disabled = true;
                $rootSelector.appendChild ( this.createReloadButton() );
            };
        });
    }

    enemyAttack () {
        let hit = ATTACK[ getRandom(3) - 1 ];
        let defence = ATTACK[ getRandom(3) - 1 ];
    
        return {
            value: getRandom( HIT[hit] ),
            hit, 
            defence,
        }
    }

    playerAttack ( target ) {
        const attack = {};
        
        for( let item of target ) {
            if( item.checked && item.name == 'hit' ) {
                attack.value = getRandom( HIT[item.value] );
                attack.hit = item.value;
            }
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
        $reloadButton.addEventListener( 'click', () => { window.location.reload() } );
    
        return $buttonWrapper;
    }

}

export {Game};