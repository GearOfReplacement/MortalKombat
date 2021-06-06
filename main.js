const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');

let firstPlayer = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Arms', 'Legs', 'Blizzard', 'Fatal Combo'],
    attack: function() {
        alert(firstPlayer.name + ' fight!');
    }
}

let secondPlayer = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Arms', 'Legs', 'Maybe some guns', 'Fatal Combo'],
    attack: function() {
        alert(secondPlayer.name + ' fight!');
    }
}

const getElement = function( tagName, className ) {
    let $element = document.createElement(tagName);
    if(className) $element.classList.add(className);
    return $element;
}

const createPlayer = function( playerObj ) {
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

$arenas.appendChild( createPlayer( firstPlayer ) );
$arenas.appendChild( createPlayer( secondPlayer ) );

$button.addEventListener( 'click', () => {
    changeHp( firstPlayer );
    changeHp( secondPlayer );
    checkWinner( firstPlayer, secondPlayer );
});

const changeHp = function ( playerObj ) {
    let $playerLife = document.querySelector( '.player' + playerObj.player + ' .life' );
    playerObj.hp -= getDamadge();
    checkLife( playerObj );
    $playerLife.style.width = playerObj.hp + '%';
}

const checkLife = function ( playerObj ) {
    if( playerObj.hp <= 0 ) playerObj.hp = 0;
}

const getDamadge = function () {
    let damadge = Math.ceil( Math.random() * 20 );
    return damadge;
}

const getWinTitle = function ( playerObj ) {
    let $winTitle = getElement( 'div', 'winTitle' );
    $winTitle.innerText = playerObj.name + ' win';
    return $winTitle;
}

const getDrawTitle = function () {
    let $drawTitle = getElement( 'div', 'drawTitle' );
    $drawTitle.innerText = 'Draw?';
    return $drawTitle;
}

const checkWinner = function ( firstPlayerObj, secondPlayerObj ) {
    if( firstPlayerObj.hp == 0 && secondPlayerObj.hp == 0 ) {
        $arenas.appendChild( getDrawTitle() );
        $button.disabled = true;
    }
    else if ( firstPlayerObj.hp == 0 ) {
        $arenas.appendChild( getWinTitle ( secondPlayerObj ) );
        $button.disabled = true;
    }
    else if ( secondPlayerObj.hp == 0 ) {
        $arenas.appendChild( getWinTitle( firstPlayerObj ) );
        $button.disabled = true;
    }
}