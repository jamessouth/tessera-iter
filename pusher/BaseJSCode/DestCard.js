
export class DestCard extends Schema {
  route;
  points;

  constructor(route, points) {
    super();
    this.route = route;
    this.points = points;
  }
}
