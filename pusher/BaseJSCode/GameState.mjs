
// import { Player } from "./Player";
// import { TrainCard } from "./TrainCard";
// import { destCards } from "../data/destCard/destCards";
// import { DestCard } from "./DestCard";

export default class GameState {
  players = new Array();

  trainCardDeck = new Array();
  
  trainCardDiscards = new Array();
  trainCardFaceUpDeck = new Array();
  //destCardDeck = this.shuffleArray(destCards);

  constructor(numPlayers) {
    this.players.length = numPlayers;
  }

  //Method from ChatGPT using prompt "Shuffle an array of objects", manually converted to JS
  shuffleArray(array) {
    // Create a copy of the original array to avoid modifying it directly
    const shuffledArray = array.slice();

    // Iterate over each element in the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the randomly selected one
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

 
  
}

// module.exports = GameState
// export {Player};
