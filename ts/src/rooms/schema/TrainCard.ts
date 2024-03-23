import { Schema, type } from "@colyseus/schema";

export class TrainCard extends Schema {
  @type("string") readonly color: string;
  @type("boolean")  isFaceUp: boolean = false;

  constructor(color: string) {
    super();
    this.color = color;
  }
}
