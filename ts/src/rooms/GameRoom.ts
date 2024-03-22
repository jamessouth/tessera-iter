import { Room, Client } from "@colyseus/core";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/Player";


export class GameRoom extends Room<GameState> {
  maxClients = 5;

  onCreate (options: any) {

    this.setState(new GameState());
    
    
    this.onMessage("type", (client, message) => {
        // console.log(client);
    //   console.log(message);
    //   console.log(this);
    //   this.setState(message);
    this.state.messages.push(message);
    // console.log(this.state.messages);

    });

    this.onMessage("drawTrainCardFromDeck", (client, message) => {
      let player: Player | undefined = this.state.players.find(p => 
        p.sessionId === client.sessionId
      );

      if (player === undefined) {
        console.log("Not a valid player");
        return;
      }

      if(player.canDrawTrainCard) {
        
      } else {
        return;
      }

    })

    this.onMessage("drawTrainCardFrom")
  }

  onJoin (client: Client, options: any) {
    let p1:Player = new Player();
    p1.name = "Phil";
    this.state.players.push(p1);
    
    p1.sessionId = client.sessionId;
    console.log(p1.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
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


