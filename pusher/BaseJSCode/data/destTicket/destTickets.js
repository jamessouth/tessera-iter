import destTicket from '../../destTicket';

let arr = [
  { rt: 'Boston:Miami', pts: 12 },
  { rt: 'Calgary:Phoenix', pts: 13 },
  { rt: 'Calgary:Salt Lake City', pts: 7 },
  { rt: 'Chicago:New Orleans', pts: 7 },
  { rt: 'Chicago:Santa Fe', pts: 9 },
  { rt: 'Dallas:New York', pts: 11 },
  { rt: 'Denver:El Paso', pts: 4 },
  { rt: 'Denver:Pittsburgh', pts: 11 },
  { rt: 'Duluth:El Paso', pts: 10 },
  { rt: 'Duluth:Houston', pts: 8 },
  { rt: 'Helena:Los Angeles', pts: 8 },
  { rt: 'Kansas City:Houston', pts: 5 },
  { rt: 'Los Angeles:Chicago', pts: 16 },
  { rt: 'Los Angeles:Miami', pts: 20 },
  { rt: 'Los Angeles:New York', pts: 21 },
  { rt: 'Montréal:Atlanta', pts: 9 },
  { rt: 'Montréal:New Orleans', pts: 13 },
  { rt: 'New York:Atlanta', pts: 6 },
  { rt: 'Portland:Nashville', pts: 17 },
  { rt: 'Portland:Phoenix', pts: 11 },
  { rt: 'San Francisco:Atlanta', pts: 17 },
  { rt: 'Sault St. Marie:Nashville', pts: 8 },
  { rt: 'Sault St. Marie:Oklahoma City', pts: 9 },
  { rt: 'Seattle:Los Angeles', pts: 9 },
  { rt: 'Seattle:New York', pts: 22 },
  { rt: 'Toronto:Miami', pts: 10 },
  { rt: 'Vancouver:Montréal', pts: 20 },
  { rt: 'Vancouver:Santa Fe', pts: 13 },
  { rt: 'Winnipeg:Houston', pts: 12 },
  { rt: 'Winnipeg:Little Rock', pts: 11 },
];

const destTickets = arr.map((x) => new destTicket(x.rt, x.pts));

export default destTickets;
