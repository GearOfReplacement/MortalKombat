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

export { firstPlayer, secondPlayer };