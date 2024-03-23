import { ArraySchema, Schema, Context, type } from "@colyseus/schema";
import { DestCard } from "./DestCard";
import { TrainCard } from "./TrainCard";

export class Player extends Schema {
  @type("string") name: string = "";
  @type("uint8") numTrains: number = 45;
  @type("uint8") score: number = 0;
  @type("boolean") isTurn: boolean = true;
  @type([TrainCard]) trainCards = new ArraySchema<TrainCard>();
  @type([DestCard]) destCards = new ArraySchema<DestCard>();
  @type("string") sessionId: string = "";
  @type("uint8") trainCardsLeftToDrawThisTurn: number = 4;

  drawTrainCard(deck: TrainCard[]) {
    if (!this.isTurn) {
      return;
    }

    if (this.trainCardsLeftToDrawThisTurn === 0) {
      return;
    }

    //empty deck case (rare)
    if (deck.length === 0) {
      console.log("empty deck");
      return;
    }

    const card = deck.pop()!;
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
