import {
  ArraySchema,
  CollectionSchema,
  Schema,
  Context,
  type,
} from "@colyseus/schema";
import { Player } from "./Player";
import { TrainCard } from "./TrainCard";
import { destCards } from "../data/destCard/destCards";
import { DestCard } from "./DestCard";

export class GameState extends Schema {
  @type([Player]) players = new ArraySchema<Player>();

  @type({ collection: TrainCard }) trainCardDeck =
  new CollectionSchema<TrainCard>();
  
  @type([TrainCard]) trainCardDiscards = new ArraySchema<TrainCard>();
  @type({ collection: TrainCard }) trainCardFaceUpDeck =
    new CollectionSchema<TrainCard>();
  @type([DestCard]) destCardDeck = this.shuffleArray(destCards);

  //Method from ChatGPT using prompt "Shuffle an array of objects"
  shuffleArray<TrainCard, DestCard>(
    array: TrainCard[] | DestCard[]
  ): TrainCard[] | DestCard[] {
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

// export {Player};
