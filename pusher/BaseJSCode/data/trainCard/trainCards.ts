import { TrainCard } from "../../schema/TrainCard";
import { colors } from "../colors";

export const trainCards: TrainCard[] = colors
  .flatMap((x) => Array(12).fill(new TrainCard(x)))
  .concat(Array(2).fill(new TrainCard("gray")));
