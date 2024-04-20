// import { immerable } from 'immer';

export default class destTicket {
//   [immerable] = true;

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
