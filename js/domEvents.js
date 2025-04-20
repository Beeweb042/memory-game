/* ==========================================================================
                    DOM EVENTS HANDLING
   ========================================================================== 
   Manages events related to the DOM :
   - button clicks for starting a new game.
   
   Author: [Bee]
   Last Modified: 2025-04-20
   ========================================================================== */

import { initGame } from "./gameInitialization.js";

/* 
 * ============================
 * START GAME AFTER DOM CONTENT IS LOADED
 * ============================
 * This function initializes the game when the DOM is fully loaded.
 * It also sets up an event listener for the "New Game" button to start a new game */

document.addEventListener("DOMContentLoaded", () => {
    initGame();
      document.getElementById("newGameBtn").addEventListener("click", initGame);
  });

