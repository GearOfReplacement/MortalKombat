import { getRandom } from './utilities.js';

class Query {
    async getEnemy () {
        const compChoice = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
        .then( result => result.json() );
        return compChoice;
    }

    async getBattleResult ( playerChoice ) {
        return await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify( playerChoice )
        }).then( result => result.json());
    }
};

export { Query }