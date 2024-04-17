import { immerable } from 'immer';
import Player from './Player';
import destTickets from './data/destTicket/destTickets';
import trainCards from './data/trainCard/trainCards';
import shuffleArray from './utils/shuffleArray';

export default class GameState {
  [immerable] = true;

  players = [];
  trainCardTable = []; //face up cards
  trainCardDiscards = [];
  trainCardDeck = shuffleArray(trainCards);
  destTicketDeck = shuffleArray(destTickets);
  isLastRound = false;

  constructor(...players) {
    //2-5 players objs with name and socketId
    //Give the players their names, need to figure out how to get user input
    for (const player of players) {
      this.players.push(new Player(player));
      //   console.log("Enter player " + (i+1) + "'s name");
      //   this.players[i].name = input
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
    while (!this.isLastRound) {
      for (current = 0; current < this.players.length; current++) {
        this.playTurn(current);
        this.isLastRound = this.players[current].numTrains < 3;
      }
    }
  }

  playTurn(current) {
    console.log('It is ' + this.players[current].name + "'s turn.\n");
    console.log(
      '[1] Draw train cards\n[2] Claim a route\n[3] Draw destination cards\n\n'
    );

    this.players[current].numTrains = 0; //TEMP
  }
}
