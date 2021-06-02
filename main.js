let firstPlayer = {
    name: 'Sub-Zero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Arms', 'Legs', 'Blizzard', 'Fatal Combo'],
    attack: function() {
        alert(firstPlayer.name + ' fight!');
    }
}

let secondPlayer = {
    name: 'Sonya',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Arms', 'Legs', 'Maybe some guns', 'Fatal Combo'],
    attack: function() {
        alert(secondPlayer.name + ' fight!');
    }
}


const getElement = function( className ) {
    let $element = document.createElement('div');
    $element.classList.add(className);
    return $element;
}

const createPlayer = function( playerClass, player ) {
    let $player = getElement(playerClass);
    let $progressBar = getElement('progressbar');
    let $character = getElement('character');

    $player.appendChild($progressBar);
    $player.appendChild($character);

    let $life = getElement('life');
    let $name = getElement('name');

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    let $characterIMG = document.createElement('img');
    $character.appendChild($characterIMG);

    $life.style.width = `${player.hp}%`;
    $name.innerText = player.name
    $characterIMG.src = player.img;

    let $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}

createPlayer( 'player1', firstPlayer);
createPlayer( 'player2', secondPlayer);