import GameState from "./state/GameState.js";
import routes from "./data/route/routes.js";

const gs = new GameState(
    { name: 'Kappi', socketId: 1, color: 'Black' }
  );

  gs.joinPlayer({ name: 'Maour', socketId: 2, color: 'Green' })
  gs.joinPlayer({ name: 'Klo', socketId: 3, color: 'Yellow'})
  gs.joinPlayer({ name: 'Von', socketId: 4, color: 'Blue'})
  gs.joinPlayer({ name: 'Skuggi', socketId: 5, color: 'Red'})

// console.log("Thyrnirsjo")
// console.log(gs.destTicketDeck)
// console.log(gs.trainCardDeck)

gs.runGame()