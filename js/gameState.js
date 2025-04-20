/* ==========================================================================
                    GAME STATE MANAGEMENT
   ========================================================================== 
   Manages the global game state constants:
   - card deck
   - fiipped cards
   - matched pairs
   - attempts
   
   Author: [Bee]
   Last Modified: 2025-04-20
   ========================================================================== */

/* 
 * ============================
 * ARRAY OF CARD SYMBOLS
 * ============================ */
const cardSymbols = ["CSS3", "JS", "PHP", "SASS", "WP", "NODE"];

/* 
 * ============================
 * DUPLICATE & MERGE THE ARRAY
 * ============================
 * Duplicates the cardSymbols array and merges the two arrays to create a full deck with pairs.
 * The resulting deck will be used to randomize and display the cards during gameplay */
const fullDeck = [...cardSymbols, ...cardSymbols];

/* 
 * ============================
 * GAME STATE OBJECT
 * ============================
 * Stores the core game state data */
const gameState = {
  flippedCards: [], // stores currently flipped cards
  lockBoard: false, // locks the board during animations to prevent other interactions
  totalPairs: cardSymbols.length, // total of pairs
  matchedPairs: 0, // counts successfully matched pairs
  attempts: 0, // tracks total attempts
};

export {
    gameState,
    fullDeck,
    cardSymbols
}