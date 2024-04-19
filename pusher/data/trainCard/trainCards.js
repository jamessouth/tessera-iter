import TrainCard from '../../TrainCard.js';
import colors from '../colors.js';

const trainCards = colors
  .flatMap((x) => Array(12).fill(new TrainCard(x)))
  .concat(Array(2).fill(new TrainCard('gray')));

export default trainCards;
