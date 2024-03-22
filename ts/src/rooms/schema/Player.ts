import { ArraySchema, Schema, Context, type } from "@colyseus/schema";
import { DestCard } from "./DestCard";
import { TrainCard } from "./TrainCard";

export class Player extends Schema {
  @type("string") name: string = "";
  @type("uint8") numTrains: number = 45;
  @type("uint8") score: number = 0;
  @type("boolean") isTurn: boolean = false;
  @type([TrainCard]) trainCards = new ArraySchema<TrainCard>();
  @type([DestCard]) destCards = new ArraySchema<DestCard>();
  @type("string") sessionId: string = "";
  @type("boolean") canDrawTrainCard: boolean = true;
  
}
