import { getElement } from './utilities.js';

class Player {
    constructor ( {player, name, hp, img, rootSelector} ) {
        this.player = player,
        this.name = name,
        this.hp = hp,
        this.img = img,
        this.rootSelector = rootSelector
    }

    changeHp ( damage ) {
        this.hp -= damage;
        if(this.hp < 0) this.hp = 0;
    }

    elHP () {
        return document.querySelector( '.player' + this.player + ' .life' );
    }
    
    renderHP ( $lifeBar ) {
        $lifeBar.style.width = this.hp + '%';
    }

    attack () {
        alert(this.name + ' fight!');
    }

    createPlayer (  ) {
        let $player = getElement('div', 'player' + this.player);
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
    
        $life.style.width = `${this.hp}%`;
        $name.innerText = this.name
        $characterIMG.src = this.img;
    
        this.rootSelector.appendChild( $player );
    }
}

export { Player };