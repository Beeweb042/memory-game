/* ==========================================================================
                    BOARD RENDERING
   ========================================================================== 
   Handles the creation and the rendering of the game
   - create card elements
   - display card faces (front/back)
   - rendering the board
   - handle image fallback
   
   Author: [Bee]
   Last Modified: 2025-04-20
   ========================================================================== */

import { handleCardClick } from "./gameEvents.js";

/*
 * ============================
 * RENDER THE GAME BOARD
 * ============================
 * This function renders the game board with shuffled cards.
 * It creates card elements, displays card faces (front and back),
 * and handles fallback text in case the image fails to load */

function renderBoard(deck) {
  const boardElement = document.getElementById("gameBoard"); // reference to the game board in html (<main>)

  boardElement.innerHTML = ""; // clear existing content (when restart the game)

  const IMAGE_EXTENSION = "png"; // easily changeable format

  /** Create the cards in the deck */
  deck.forEach((symbol, index) => {
    const card = document.createElement("div"); // create card container div

    card.className = "card"; // add class for syling
    card.dataset.symbol = symbol; // store the card data as HTML attribute
    card.dataset.index = index;

    // create card faces front/back
    card.innerHTML = `
      <div class="card-face card-front">
          <img src="img/${symbol.toLowerCase()}.${IMAGE_EXTENSION}" 
               alt="${symbol}" 
               class="card-image">
          <span class="fallback-text">${symbol}</span>
      </div>
      <div class="card-face card-back">
          <img src="img/back.jpeg" 
               alt="Card Back" 
               class="card-image">
      </div>
    `;

    /** Fallback in case the image is not loaded */
    const frontImg = card.querySelector(".card-front img");
    const fallbackText = card.querySelector(".fallback-text");
    fallbackText.style.display = "none"; // Hide default text

    frontImg.onerror = () => {
      frontImg.style.display = "none"; // hide image
      fallbackText.style.display = "block"; // show text
    };

    card.addEventListener("click", handleCardClick);
    boardElement.appendChild(card); // add the card to the desk
  });
}

export { renderBoard };
