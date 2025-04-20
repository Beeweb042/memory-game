/* ==========================================================================
                    GAME INITIALIZATION
   ========================================================================== 
   Initializes and resets the game board:
   - Resets the game state variables
   - Shuffles the deck of cards
   - Renders the game board
   
   Author: [Bee]
   Last Modified: 2025-04-20
   ========================================================================== */

   import { gameState, cardSymbols, fullDeck } from "./gameState.js";
   import { renderBoard } from "./boardRendering.js";

/* 
 * ============================
 * INITIALIZE GAME
 * ============================
 * This function resets the game state and prepares the game board.
 * It clears previous game data, updates the attempts counter, 
 * and renders a shuffled deck of cards on the board */

function initGame() {
  //reset game tracking variables
  gameState.flippedCards = [];
  gameState.lockBoard = false;
  gameState.matchedPairs = 0;
  gameState.attempts = 0;
  gameState.totalPairs = cardSymbols.length;

  document.querySelector(".attempts-count").textContent = "0"; //update UI counter

  const shuffledDeck = shuffleCards(fullDeck); // shuffle and render cards

  renderBoard(shuffledDeck);
}


/* 
 * ============================
 * SHUFFLE CARDS
 * ============================
 * This function randomizes the order of the deck using the Fisher-Yates algorithm.
 * It returns a shuffled version of the deck, which is then passed to renderBoard */

function shuffleCards(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  

  export {
    initGame,
    shuffleCards
  }