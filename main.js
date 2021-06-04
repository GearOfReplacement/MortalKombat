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

$button.addEventListener( 'click', () => { changeHp( firstPlayer, secondPlayer ) });

const changeHp = function ( firstPlayerObj, secondPlayerObj ) {
    let selectedPlayer = selectPlayer();
    let $hpCount = document.querySelector( '.player' + selectedPlayer + ' .life' );

    if( selectedPlayer === 1 ) {
        firstPlayerObj.hp -= getDamadge();
        
        if( firstPlayerObj.hp <= 0 ){
            firstPlayerObj.hp = 0;
            
            $arenas.appendChild( getWinTitle( secondPlayerObj ) );
            $button.disabled = true;
        }

        $hpCount.style.width = firstPlayerObj.hp + '%';
    }
    else if ( selectedPlayer === 2) {
        secondPlayerObj.hp -= getDamadge();

        if( secondPlayerObj.hp <= 0 ){
            secondPlayerObj.hp = 0;
            
            $arenas.appendChild( getWinTitle( firstPlayerObj ) );
            $button.disabled = true;
        }

        $hpCount.style.width = secondPlayerObj.hp + '%';
    }
}

const selectPlayer = function () {
    return Math.ceil( Math.random() * 2 );
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

const getLoseTitle = function( playerObj ) {
    let $loseTitle = getElement( 'div', 'loseTitle' );
    $loseTitle.innerText = playerObj.name + ' lose';
    return $loseTitle;
}