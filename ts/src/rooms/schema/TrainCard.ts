import { Schema, type } from "@colyseus/schema";

export class TrainCard extends Schema {
  @type("string") readonly color: string;

  constructor(color: string) {
    super();
    this.color = color;
  }
}
