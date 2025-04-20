/* ==========================================================================  
                    MAIN SCRIPT : Game Initialization  
   ==========================================================================  
   - main JavaScript file that imports and combines all game modules  
   - includes:  
        game state management (constants, deck, variables)  
        board rendering (card creation, DOM manipulation)  
        game events (card clicks, match logic, win condition)  
        DOM event listeners (new game button, initialization)  
        game initialization (shuffling, reset)  

   Author: [Bee]  
   Last Modified: 2025-04-21  
   ========================================================================== */
   
import { gameState, fullDeck, cardSymbols } from "./gameState.js";
import { initGame, shuffleCards } from "./gameInitialization.js";
import { handleCardClick, showWinScreen } from "./gameEvents.js";
import { renderBoard } from "./boardRendering.js";
import "./domEvents.js"; // domEvents.js s'exécute automatiquement via DOMContentLoaded

// Exporte les éléments nécessaires pour d'autres fichiers (si besoin)
export { gameState, initGame, handleCardClick, renderBoard, shuffleCards };
