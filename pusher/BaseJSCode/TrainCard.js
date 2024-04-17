import { immerable } from 'immer';

export default class TrainCard {
  [immerable] = true;

  color = '';
  table = false;
}
