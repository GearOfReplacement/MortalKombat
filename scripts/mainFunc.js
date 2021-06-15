import { generateBattleLog } from './battleLogs.js';
import { getElement, getRandom } from './utilities.js';

const ATTACK = ['head', 'body', 'foot'];
const HIT = { head: 30, body: 25, foot: 20, }

function createPlayer ( playerObj ) {
    let { player, name, hp, img } = playerObj;
    let $player = getElement('div', 'player' + player);
    let $progressBar = getElement('div', 'progressbar');
    let $character = getElement('div', 'character');

    $player.appendChild($progressBar);
    $player.appendChild($character);

    let $life = getElement('div', 'life');
    let $name = getElement('div', 'name');

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    let $characterIMG = getElement('img');
    $character.appendChild($characterIMG);

$life.style.width = `${hp}%`;
    $name.innerText = name
    $characterIMG.src = img;

    return $player;
}

function enemyAttack () {
    let hit = ATTACK[ getRandom(3) - 1 ];
    let defence = ATTACK[ getRandom(3) - 1 ];

    return {
        value: getRandom( HIT[hit] ),
        hit, 
        defence,
    }
}

function playerAttack ( target ) {
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

function checkStrikes ( attackFighter, defendFighter, defendingPlayer, attackingPlayer ) {
    let { hit, value: dmgValue } = attackFighter;
    let { defence } = defendFighter;
    
    if( hit != defence ){
        defendingPlayer.changeHp( dmgValue );
        defendingPlayer.renderHP( defendingPlayer.elHP() );

        generateBattleLog('hit', defendingPlayer, attackingPlayer, dmgValue);
    }
    else generateBattleLog('defence', defendingPlayer, attackingPlayer, dmgValue);
}

const getWinner = function ( firstPlayer, secondPlayer ) {
    if( firstPlayer.hp == 0 && secondPlayer.hp == 0 ) return 'Draw';
    else if ( firstPlayer.hp == 0 ) return secondPlayer.name;   
    else if ( secondPlayer.hp == 0 ) return firstPlayer.name;
    return 0;
}

function getTitle ( playerName ) {
    let $title = getElement( 'div', 'resultTitle' );
    if( playerName == 'Draw') $title.innerText = 'Draw';
    else $title.innerText = `${playerName} wins`;
    return $title;
}

function createReloadButton () {
    let $buttonWrapper = getElement( 'div', 'reloadWrap' );
    let $reloadButton = getElement( 'button', 'button' );
    $reloadButton.innerText = 'Reload';

    $buttonWrapper.appendChild( $reloadButton );
    $reloadButton.addEventListener( 'click', () => { window.location.reload() } );

    return $buttonWrapper;
}

export { createPlayer, playerAttack, enemyAttack, checkStrikes, getWinner, getTitle, getRandom, createReloadButton };