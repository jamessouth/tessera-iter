import { Room, Client } from "@colyseus/core";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/Player";
// import { DestCard } from "./schema/DestCard";
// import { TrainCard } from "./schema/TrainCard";
import { trainCards } from "./data/trainCard/trainCards";


export class GameRoom extends Room<GameState> {
  maxClients = 5;
  initialTrainCards = 4;

  onCreate (options: any) {

    this.setState(new GameState());

    this.state.shuffleArray(trainCards).forEach(c => this.state.trainCardDeck.add(c));


    console.log(this.state.trainCardDeck.size);
    this.state.trainCardDeck.forEach(c => {
        console.log(c.isFaceUp)
    });
    console.log();

    // .map(c => {c.isFaceUp = true;return c})
    
    for (let i = 0; i < 5; i++) {
        let k = this.state.trainCardDeck.at(i)!;
        this.state.trainCardFaceUpDeck.add(k);
        this.state.trainCardDeck.delete(k);
    }

 

    this.state.trainCardFaceUpDeck.forEach(c => c.isFaceUp = true);
    
    
    console.log(this.state.trainCardDeck.size);
    this.state.trainCardDeck.forEach(c => {
        console.log(c.isFaceUp)
    });
    
    this.onMessage("type", (client, message) => {
        // console.log(client);
    //   console.log(message);
    //   console.log(this);
    //   this.setState(message);
    //this.state.messages.push(message);
    // console.log(this.state.messages);

    });

    //incomplete
    this.onMessage("drawTrainCardFromDeck", (client, message) => {
      //checks to see if the player is in this game room
      let player = this.getPlayer(client);
      if (player === undefined) {return;}
      
// console.log(this.state.trainCardDeck);
      
    // player.drawTrainCard(this.state.trainCardDeck);

    // if(this.state.trainCardDeck.length === 0) {
    //     console.log("time to reshuffle deck");

    //     const discardPileSize = this.state.trainCardDiscards.length;

    //     const shuffledDiscardPile = this.state.shuffleArray(this.state.trainCardDiscards.splice(0,discardPileSize));

    //     this.state.trainCardDeck.splice(0,0,...shuffledDiscardPile);
        
    //   }
    });

    //incomplete
    // this.onMessage("drawTrainCardFromField", (client, message) => {
    //   let player = this.getPlayer(client)
    //   if (player === undefined) {return;}
      
    //   //Code for player to draw from the five face up cards
    // });

    // this.onMessage("discard", (client, message) => {
    //     console.log(message);
    //   const crds = this.state.trainCardDeck.splice(0,message.cards);
    //   this.state.trainCardDiscards.push(...crds);

        
    // });
    
    //incomplete
    // this.onMessage("drawDestCard", (client, message) => {
    //   let player = this.getPlayer(client);
    //   if (player === undefined) {return;}
    // });

  }

  onJoin (client: Client, options: any) {
    let p1:Player = new Player();
    p1.name = "Phil";
    
    
    p1.sessionId = client.sessionId;
    console.log(p1.sessionId, "joined!");

    // for (let i = 0; i < this.initialTrainCards; i++) {
    //     p1.drawTrainCard(this.state.trainCardDeck);
    // }

    
    
    // p1.isTurn = false;
    p1.trainCardsLeftToDrawThisTurn = 2;
    this.state.players.push(p1);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }
  

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  getPlayer(c: Client) {
    //checks to see if a player is in the active game room
        let player: Player | undefined = this.state.players.find(p =>
                p.sessionId === c.sessionId
              );

          if (player === undefined) {
            console.log("Not a valid player");
            return undefined;
          } else {
            return player;
          }
  }


}

// player
// ------------------------------------
// startTurn() {
//     this.isTurn = true
// }

// drawTrainCard(card) {
//     if (!this.isTurn) { //Prevents taking action out of turn
//         return 'Not your turn'
//     } else {
//         this.trainCards.push(card)
//     }
// }

// sortTrainCards() {
//     this.trainCards.sort()
// }


