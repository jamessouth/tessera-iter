
export default class destTicket {

  route = '';
  points = 0;

  constructor(route, points) {
    this.route = route;
    this.points = points;
  }

  toString() {
    return route + ' route, value ' + points;
  }
}
