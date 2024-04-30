import GameState from "./state/GameState.js";

const gs = new GameState([
    { name: 'Kappi', socketId: 1 },
    { name: 'Maour', socketId: 2 },
  ]);

console.log("Thyrnirsjo")
// console.log(gs.destTicketDeck)
// console.log(gs.trainCardDeck)

gs.runGame()