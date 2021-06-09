const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');
const $fightForm = document.querySelector('.control');

const ATTACK = ['head', 'body', 'foot'];
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

let firstPlayer = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Arms', 'Legs', 'Blizzard', 'Fatal Combo'],
    attack: function() {
        alert(this.name + ' fight!');
    },

    changeHp,
    elHP, 
    renderHP,
}

let secondPlayer = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Arms', 'Legs', 'Maybe some guns', 'Fatal Combo'],
    attack: function() {
        alert(this.name + ' fight!');
    },

    changeHp,
    elHP, 
    renderHP,
}

function getElement ( tagName, className ) {
    let $element = document.createElement(tagName);
    if(className) $element.classList.add(className);
    return $element;
}

function createPlayer ( playerObj ) {
    let $player = getElement('div', 'player' + playerObj.player);
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

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name
    $characterIMG.src = playerObj.img;

    return $player;
}

function createReloadButton () {
    let $buttonWrapper = getElement( 'div', 'reloadWrap' );
    let $reloadButton = getElement( 'button', 'button' );
    $reloadButton.innerText = 'Reload';

    $buttonWrapper.appendChild( $reloadButton );
    $arenas.appendChild ( $buttonWrapper );

    $reloadButton.addEventListener( 'click', () => { window.location.reload() } );
}

function changeHp ( damage ) {
    this.hp -= damage;
    if(this.hp < 0) this.hp = 0;
}

function elHP () {
    return document.querySelector( '.player' + this.player + ' .life' );
}

function renderHP ( $lifeBar ) {
    $lifeBar.style.width = this.hp + '%';
}

function getRandom ( num ) {
    let rndNum = Math.ceil( Math.random() * num );
    return rndNum;
}

function getTitle ( playerName ) {
    let $title = getElement( 'div', 'resultTitle' );
    if( playerName == 'Draw') $title.innerText = 'Draw';
    else $title.innerText = playerName + ' wins';
    return $title;
}

const getWinner = function ( firstPlayer, secondPlayer ) {
    if( firstPlayer.hp == 0 && secondPlayer.hp == 0 ) return 'Draw';
    else if ( firstPlayer.hp == 0 ) return secondPlayer.name;   
    else if ( secondPlayer.hp == 0 ) return firstPlayer.name;
    return 0;
}

$arenas.appendChild( createPlayer( firstPlayer ) );
$arenas.appendChild( createPlayer( secondPlayer ) );

$fightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const enemy = enemyAttack ();
    const player = playerAttack( e.target );

    checkStrikes( enemy, player, firstPlayer );
    checkStrikes( player, enemy, secondPlayer );

    const winner = getWinner( firstPlayer, secondPlayer );
    if( winner ){
        $arenas.appendChild( getTitle ( winner ) );
        $button.disabled = true;
        createReloadButton();
    };
});

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

function checkStrikes ( attackFighter, defendFighter, defendingPlayer ) {
    if( attackFighter.hit != defendFighter.defence ){
        defendingPlayer.changeHp( attackFighter.value );
        defendingPlayer.renderHP( defendingPlayer.elHP() );
    }
}