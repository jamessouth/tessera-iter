import { Room, Client } from "@colyseus/core";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/Player";
import { DestCard } from "./schema/DestCard";
import { TrainCard } from "./schema/TrainCard";


export class GameRoom extends Room<GameState> {
  maxClients = 5;

  onCreate (options: any) {

    this.setState(new GameState());
    
    
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
      

      if(player.canDrawTrainCard) {
        player.dealCard(this.state.trainCardDeck, 1);

      } else {
        return;
      }

    })

    //incomplete
    this.onMessage("drawTrainCardFromField", (client, message) => {
      let player = this.getPlayer(client)
      if (player === undefined) {return;}
      
      //Code for player to draw from the five face up cards
    })
    
    //incomplete
    this.onMessage("drawDestCard", (client, message) => {
      let player = this.getPlayer(client);
      if (player === undefined) {return;}
    })

  }

  onJoin (client: Client, options: any) {
    let p1:Player = new Player();
    p1.name = "Phil";
    this.state.players.push(p1);
    
    p1.sessionId = client.sessionId;
    console.log(p1.sessionId, "joined!");
    p1.dealCard(this.state.trainCardDeck, 4)
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


