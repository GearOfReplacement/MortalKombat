const $arenas = document.querySelector('.arenas');
const $button = document.querySelector('.button');
const $fightForm = document.querySelector('.control');
const $chatLogs = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
}

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

function getBattleTime() {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
        }

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

function checkStrikes ( attackFighter, defendFighter, defendingPlayer, attackingPlayer ) {
    if( attackFighter.hit != defendFighter.defence ){
        defendingPlayer.changeHp( attackFighter.value );
        defendingPlayer.renderHP( defendingPlayer.elHP() );

        generateBattleLog('hit', defendingPlayer, attackingPlayer, attackFighter.value);
    }
    else generateBattleLog('defence', defendingPlayer, attackingPlayer, attackFighter.value);
}

function generateBattleLog ( logType, defendingPlayer, attackingPlayer, damageValue ) {
    const time = getBattleTime();
    const randomLog = getRandom( logs[logType].length - 1 );
    let log;

    switch ( logType ) {
        case 'start':
            log = `<p>${logs[logType]}</p>`;
            log = log.replace('[time]', time)
                     .replace('[player1]',defendingPlayer.name)
                     .replace('[player2]', attackingPlayer.name);

            break;
        case 'end': 
            log = `<p>${logs[logType][randomLog]}</p>`;
            log = log.replace('[playerWins]', defendingPlayer.name)
                     .replace('[playerLose]', attackingPlayer.name);

            break;
        case 'hit':
            log = logs[logType][randomLog];
            log = log.replace('[playerDefence]', defendingPlayer.name)
                     .replace('[playerKick]', attackingPlayer.name);

            log = `<p>${time} ${log} -${damageValue} [${defendingPlayer.hp}/100]</p>`;
            break;
        case 'defence':
            log = logs[logType][randomLog];
            log = log.replace('[playerDefence]', defendingPlayer.name)
                     .replace('[playerKick]', attackingPlayer.name);
            
            log = `<p>${time} ${log}</p>`;
            break;
        case 'draw':
            log = `${logs[logType]}`;
            break;
    }

    $chatLogs.insertAdjacentHTML('afterbegin', log);
}