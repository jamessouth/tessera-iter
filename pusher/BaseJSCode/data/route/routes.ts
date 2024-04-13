import { Route } from "../../schema/Route";

let arr = [
  { rt: "Vancouver:Calgary", pts: 3, c1: "gray" },
  { rt: "Vancouver:Seattle", pts: 1, c1: "gray", c2: "gray" },
  { rt: "Seattle:Calgary", pts: 4, c1: "gray" },
  { rt: "Seattle:Helena", pts: 6, c1: "yellow" },
  { rt: "Seattle:Portland", pts: 1, c1: "gray", c2: "gray" },
  { rt: "Portland:Salt Lake City", pts: 6, c1: "blue" },
  { rt: "Portland:San Francisco", pts: 5, c1: "green", c2: "pink" },
  { rt: "San Francisco:Salt Lake City", pts: 5, c1: "orange", c2: "white" },
  { rt: "San Francisco:Los Angeles", pts: 3, c1: "yellow", c2: "pink" },
  { rt: "Los Angeles:Las Vegas", pts: 2, c1: "gray" },
  { rt: "Los Angeles:Phoenix", pts: 3, c1: "gray" },
  { rt: "Los Angeles:El Paso", pts: 6, c1: "black" },
  { rt: "Calgary:Winnipeg", pts: 6, c1: "white" },
  { rt: "Calgary:Helena", pts: 4, c1: "gray" },
  { rt: "Helena:Winnipeg", pts: 4, c1: "blue" },
  { rt: "Helena:Salt Lake City", pts: 3, c1: "pink" },
  { rt: "Helena:Denver", pts: 4, c1: "green" },
  { rt: "Helena:Duluth", pts: 6, c1: "orange" },
  { rt: "Helena:Omaha", pts: 5, c1: "red" },
  { rt: "Salt Lake City:Denver", pts: 3, c1: "red", c2: "yellow" },
  { rt: "Las Vegas:Salt Lake City", pts: 3, c1: "orange" },
  { rt: "Phoenix:Denver", pts: 5, c1: "white" },
  { rt: "Phoenix:Santa Fe", pts: 3, c1: "gray" },
  { rt: "Phoenix:El Paso", pts: 3, c1: "gray" },
  { rt: "Winnipeg:Sault St. Marie", pts: 6, c1: "gray" },
  { rt: "Winnipeg:Duluth", pts: 4, c1: "black" },
  { rt: "Duluth:Sault St. Marie", pts: 3, c1: "gray" },
  { rt: "Duluth:Toronto", pts: 6, c1: "pink" },
  { rt: "Duluth:Chicago", pts: 3, c1: "red" },
  { rt: "Duluth:Omaha", pts: 2, c1: "gray", c2: "gray" },
  { rt: "Omaha:Chicago", pts: 4, c1: "blue" },
  { rt: "Omaha:Kansas City", pts: 1, c1: "gray", c2: "gray" },
  { rt: "Kansas City:Saint Louis", pts: 2, c1: "blue", c2: "pink" },
  { rt: "Kansas City:Oklahoma City", pts: 2, c1: "gray", c2: "gray" },
  { rt: "Oklahoma City:Little Rock", pts: 2, c1: "gray" },
  { rt: "Oklahoma City:Dallas", pts: 2, c1: "gray", c2: "gray" },
  { rt: "Dallas:Little Rock", pts: 2, c1: "gray" },
  { rt: "Dallas:Houston", pts: 1, c1: "gray", c2: "gray" },
  { rt: "Houston:New Orleans", pts: 2, c1: "gray" },
  { rt: "El Paso:Houston", pts: 6, c1: "green" },
  { rt: "El Paso:Dallas", pts: 4, c1: "red" },
  { rt: "El Paso:Oklahoma City", pts: 5, c1: "yellow" },
  { rt: "El Paso:Santa Fe", pts: 2, c1: "gray" },
  { rt: "Santa Fe:Oklahoma City", pts: 3, c1: "blue" },
  { rt: "Oklahoma City:Denver", pts: 4, c1: "red" },
  { rt: "Santa Fe:Denver", pts: 2, c1: "gray" },
  { rt: "Denver:Kansas City", pts: 4, c1: "black", c2: "orange" },
  { rt: "Denver:Omaha", pts: 4, c1: "pink" },
  { rt: "New Orleans:Miami", pts: 6, c1: "red" },
  { rt: "New Orleans:Atlanta", pts: 4, c1: "orange", c2: "yellow" },
  { rt: "New Orleans:Little Rock", pts: 3, c1: "green" },
  { rt: "Little Rock:Nashville", pts: 3, c1: "white" },
  { rt: "Little Rock:Saint Louis", pts: 2, c1: "gray" },
  { rt: "Saint Louis:Nashville", pts: 2, c1: "gray" },
  { rt: "Saint Louis:Pittsburgh", pts: 5, c1: "green" },
  { rt: "Saint Louis:Chicago", pts: 2, c1: "green", c2: "white" },
  { rt: "Chicago:Pittsburgh", pts: 3, c1: "black", c2: "orange" },
  { rt: "Chicago:Toronto", pts: 4, c1: "white" },
  { rt: "Sault St. Marie:Montreal", pts: 5, c1: "black" },
  { rt: "Toronto:Montreal", pts: 3, c1: "gray" },
  { rt: "Sault St. Marie:Toronto", pts: 2, c1: "gray" },
  { rt: "Toronto:Pittsburgh", pts: 2, c1: "gray" },
  { rt: "Pittsburgh:New York", pts: 2, c1: "white", c2: "green" },
  { rt: "Pittsburgh:Washington", pts: 2, c1: "gray" },
  { rt: "Pittsburgh:Raleigh", pts: 2, c1: "gray" },
  { rt: "Nashville:Raleigh", pts: 3, c1: "black" },
  { rt: "Nashville:Atlanta", pts: 1, c1: "gray" },
  { rt: "Nashville:Pittsburgh", pts: 4, c1: "yellow" },
  { rt: "Atlanta:Miami", pts: 5, c1: "blue" },
  { rt: "Atlanta:Charleston", pts: 2, c1: "gray" },
  { rt: "Atlanta:Raleigh", pts: 2, c1: "gray", c2: "gray" },
  { rt: "Charleston:Miami", pts: 4, c1: "pink" },
  { rt: "Raleigh:Charleston", pts: 2, c1: "gray" },
  { rt: "Raleigh:Washington", pts: 2, c1: "gray", c2: "gray" },
  { rt: "Washington:New York", pts: 2, c1: "orange", c2: "black" },
  { rt: "New York:Boston", pts: 2, c1: "yellow", c2: "red" },
  { rt: "New York:Montreal", pts: 3, c1: "blue" },
  { rt: "Boston:Montreal", pts: 2, c1: "gray", c2: "gray" },
];

export const routes: Route[] = arr.map(
  (x) => new Route(x.rt, x.pts, x.c1, x.c2)
);
