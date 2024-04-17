import TrainCard from '../../TrainCard';
import colors from '../colors';

const trainCards = colors
  .flatMap((x) => Array(12).fill(new TrainCard(x)))
  .concat(Array(2).fill(new TrainCard('gray')));

export default trainCards;
