import { ArraySchema, Schema, Context, type } from "@colyseus/schema";
import { DestCard } from "./DestCard";
import { TrainCard } from "./TrainCard";

export class Player extends Schema {
  name = "";
  numTrains = 45;
  score = 0;
  isTurn = true;  //isTurn defaults to true? 
  trainCards = new Array()
  destCards = new Array();
  sessionId = "";
  trainCardsLeftToDrawThisTurn = 4;

  drawTrainCard(deck) {
    if (!this.isTurn) {
      return;
    }

    if (this.trainCardsLeftToDrawThisTurn === 0) {
      return;
    }

    //empty deck case (rare)
    if (deck.length === 0) {
      console.log("empty deck");
      //need to force the player to take another action
      return;
    }

    const card = deck.pop();
    this.trainCards.push(card);

    if (
      card.isFaceUp &&
      card.color === "gray" &&
      this.trainCardsLeftToDrawThisTurn === 1
    ) {
      return;
    } else if (card.isFaceUp && card.color === "gray") {
      this.trainCardsLeftToDrawThisTurn -= 2;
    } else {
      this.trainCardsLeftToDrawThisTurn -= 1;
    }
  }

  //   drawDestCard(deck: DestCard[]) {
  //     if (!this.isTurn) {
  //       return;
  //     }

  //     if (this.trainCardsLeftToDrawThisTurn === 0) {
  //       return;
  //     }

  //     //empty deck case (rare)
  //     if (deck.length === 0) {
  //       console.log("empty deck");
  //       return;
  //     }
  // // console.log("in",deck)
  //     const el = deck.pop()!;
  //     this.trainCards.push(el);
  //     this.trainCardsLeftToDrawThisTurn -= 1;
  //   }
}
