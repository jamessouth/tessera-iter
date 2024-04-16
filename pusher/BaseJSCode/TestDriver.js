import GameState from "./GameState.js";

const gs = new GameState(2);

console.log("Thyrnirsjo")
console.log(gs.destTicketDeck)
console.log(gs.trainCardDeck)

gs.runGame()