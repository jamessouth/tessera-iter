import { immerable } from "immer";

import Player from "./Player.js";
import { destTickets } from "./data/destTicket/destTickets.js";
import { trainCards } from "./data/trainCard/trainCards.js";

export default class GameState {
    [immerable] = true;

  players = [];
  trainCardTable = [];//face up cards
  trainCardDiscards = [];
  trainCardDeck = this.shuffleArray(trainCards)
  destTicketDeck = this.shuffleArray(destTickets);
  isLastRound = false;

  

  constructor(numPlayers) {

    //Give the players their names, need to figure out how to get user input
    for (let i = 0; i < numPlayers; i++) {
      this.players[i] = new Player()
    //   console.log("Enter player " + (i+1) + "'s name");
    //   this.players[i].name = input
    }

    //placeholder names
    this.players[0].name = "Kappi"
    this.players[1].name = "Maour"
    // this.players[2].name = "Klo"
    // this.players[3].name = "Von"
    // this.players[4].name = "Skuggi"

    
    //for debugging purposes, prints out the destination and train cards
    // for (let i = 0 ; i < this.destTicketDeck.length; i++) {
    //   console.log(this.destTicketDeck[i])
    // }
    // for (let i = 0; i < this.trainCardDeck.length; i++) {
    //   console.log(this.trainCardDeck[i])
    // }
  }

  //Method from ChatGPT using prompt "Shuffle an array of objects", manually converted to JS
  shuffleArray(array) {
    // Create a copy of the original array to avoid modifying it directly
    const shuffledArray = array.slice();

    // Iterate over each element in the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the randomly selected one
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  runGame() {
    let current = 0;  //index of the current player
    while (!this.isLastRound) {
      for (current = 0; current < this.players.length; current++) {
        this.playTurn(current)
        this.isLastRound = (this.players[current].numTrains < 3)
      }
    }
  }
  
  playTurn(current) {
    console.log("It is " + this.players[current].name + "'s turn.\n")
    console.log("[1] Draw train cards\n[2] Claim a route\n[3] Draw destination cards\n\n")

    this.players[current].numTrains = 0 //TEMP
  }
}