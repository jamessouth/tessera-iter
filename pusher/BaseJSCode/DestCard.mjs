
export default class DestCard {
  route;
  points;

  constructor(route, points) {
    this.route = route;
    this.points = points;
  }

  toString() {
    return route + " route, value " + points
  }
}