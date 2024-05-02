import { immerable } from 'immer';
import destTickets from '../data/destTicket/destTickets.js';
import routes from '../data/route/routes.js';
import trainCards from '../data/trainCard/trainCards.js';
import shuffleArray from '../utils/shuffleArray.js';
import Player from './Player.js';

const INIT_DEST_TICKETS = 3;
const INIT_TRAIN_CARDS = 4;
const INIT_TABLE_CARDS = 5;

export default class GameState {
  [immerable] = true;

  players = [];
  trainCardDeck = shuffleArray(trainCards);
  trainCardTable = this.trainCardDeck.splice(0, INIT_TABLE_CARDS); //face up cards
  trainCardDiscards = [];
  destTicketDeck = shuffleArray(destTickets);
  isLastRound = false;
  isSmallGame = false;

//   STOPPINGPOINT
  constructor(player) {
    //1 player obj with name, socketId, color
    //Give the players their names, need to figure out how to get user input
    // for (const player of players) {
    const trainCards = this.trainCardDeck.splice(0, INIT_TRAIN_CARDS);
    const destTickets = this.destTicketDeck.splice(0, INIT_DEST_TICKETS);
    this.players.push(new Player(player, trainCards, destTickets));
    //   console.log("Enter player " + (i+1) + "'s name");
    //   this.players[i].name = input
    // }
    this.trainCardTable.forEach((c) => (c.isOnTable = true));
    if (this.players.length <= 3) {
      this.isSmallGame = true;
    }

    //placeholder names moved to back.js

    //for debugging purposes, prints out the destination and train cards
    // for (let i = 0 ; i < this.destTicketDeck.length; i++) {
    //   console.log(this.destTicketDeck[i])
    // }
    // for (let i = 0; i < this.trainCardDeck.length; i++) {
    //   console.log(this.trainCardDeck[i])
    // }
  }

  runGame() {
    let current = 0; //index of the current player

    //FIXME when one player has two or less trains, everyone including that player should get one more turn. Currently it always ends with last player in order
    while (!this.isLastRound) {
      for (current = 0; current < this.players.length; current++) {
        this.playTurn(current);
        this.isLastRound = this.players[current].numTrains < 3;
        // current %= this.players.length-1  //Should reset current to 0 after the last player in order goes
      }
    }
  }

  playTurn(current) {
    console.log('\n\nIt is ' + this.players[current].name + "'s turn.");
    console.log(
      '[1] Draw train cards\n[2] Claim a route\n[3] Draw destination cards\n'
    );

    //if(input = 2/Claim Route)
    this.selectRoute(current);

    this.players[current].numTrains = 0; //TEMP
  }

  selectRoute(current) {
    
     //Hardcoded value
    let route   //routes[0] = { rt: 'Vancouver:Calgary', length: 3, c1: 'gray' }
    let color
    switch(current) {
      case 0:
        route = routes[55];
        color = 'green';
        break;
      case 1:
        route = routes[55];
        color = 'white';
        break;
      case 2:
        route = routes[55];
        color = 'white';
        break;
      default:
        route = routes[0];
        color = 'red';
        break;
    }
    //select route to claim
    console.log(route.name)
    //(One lane, route claimed) or (Small game, route claimed) or (both routes claimed)
    if (
      (route.taken1 && route.color2 === null) ||
      (this.isSmallGame && (route.taken1 || route.taken2)) ||
      (route.taken1 && route.taken2)
    ) {
      console.log('Route already claimed!');
      return;
    }

    //any gray double routes are gray on both routes
    if (route.color1 === 'gray') {
      console.log('Which color do you want to play this route as?');
      // get player input
      // color = input color
      color = 'blue';
    } else if (
      route.color1 !== 'gray' &&
      route.color2 !== null &&
      !(route.taken1 || route.taken2)
    ) {
      console.log('Which color of the route do you want to claim?');
      console.log(
        'Attempting to claim the ' + color + ' route of ' + route.name
      );
    } else if (route.taken1) {
      color = route.color2;
    } else if (route.taken2) {
      color = route.color1;
    }

    console.log('Attempting to claim the ' + color + ' route of ' + route.name);
    if (
      color !== route.color1 &&
      color !== route.color2 &&
      route.color1 !== 'gray'
    ) {
      console.log('Cannot claim that route with that color!');
      return;
    }
    //player chooses color before the claim route method. If the route is gray, choose color they're playing before this method
    this.players[current].claimRoute(route, color);
  }
}
