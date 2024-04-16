
export default class destTicket {
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