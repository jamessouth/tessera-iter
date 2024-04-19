import trainCards from '../data/trainCard/trainCards.js';
import shuffleArray from './shuffleArray.js';

function prepDecks(){
    const initTableCards = 5;

    const initTrainDeck = shuffleArray(trainCards);
    const initTrainTable = initTrainDeck.splice(0,initTableCards);
    console.log(initTrainDeck);
    console.log();
    initTrainTable.forEach((c) => {
            c.isOnTable = true;
            return c;
          });
    
    
    console.log(initTrainDeck.length,initTrainTable.length);

    return [initTrainDeck,initTrainTable];

}
export default prepDecks;
