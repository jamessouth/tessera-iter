import { immerable } from 'immer';

export default class Route {
  [immerable] = true;

  isSmallGame = true;
  name = '';
  points = 0;
  color1 = '';
  color2 = '';
  taken1 = false;
  taken2 = false;

  constructor(name, points, color1, color2 = null) {
    this.name = name;
    this.points = points;
    this.color1 = color1;
    this.color2 = color2;
  }
}
