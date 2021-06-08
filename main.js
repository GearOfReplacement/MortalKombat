const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');

let firstPlayer = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Arms', 'Legs', 'Blizzard', 'Fatal Combo'],
    attack: function() {
        alert(this.name + ' fight!');
    },

    changeHp: changeHp,
    elHP: elHP, 
    renderHP: renderHP,
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

    changeHp: changeHp,
    elHP: elHP, 
    renderHP: renderHP,
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

function getDamage () {
    let damage = Math.ceil( Math.random() * 20 );
    return damage;
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

$button.addEventListener( 'click', () => {
    firstPlayer.changeHp( getDamage() );
    secondPlayer.changeHp( getDamage() );

    firstPlayer.renderHP( firstPlayer.elHP() );
    secondPlayer.renderHP( secondPlayer.elHP() );

    const winner = getWinner( firstPlayer, secondPlayer );
    if( winner ){
        $arenas.appendChild( getTitle ( winner ) );
        $button.disabled = true;
        createReloadButton();
    };
});

