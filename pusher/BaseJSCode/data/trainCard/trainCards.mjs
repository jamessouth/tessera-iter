import TrainCard from "../../TrainCard.mjs";
import { colors } from "../colors.mjs";

export const trainCards = colors
  .flatMap((x) => Array(12).fill(new TrainCard(x)))
  .concat(Array(2).fill(new TrainCard("gray")));
