import { immerable } from 'immer';

export default class TrainCard {
  [immerable] = true;

  color = '';
  isOnTable = false;

  constructor(color) {
    this.color = color;
  }
}
