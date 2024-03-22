import { Schema, type } from "@colyseus/schema";

export class DestCard extends Schema {
  @type("string") readonly route: string;
  @type("number") readonly points: number;

  constructor(route: string, points: number) {
    super();
    this.route = route;
    this.points = points;
  }
}
