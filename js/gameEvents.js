/* ==========================================================================
                    GAME EVENTS HANDLING
   ========================================================================== 
   Handles the events triggered by the user interacting with the game:
   - Card clicks
   - Match check
   - Card visual updates (flip, match, etc.)
   
   Author: [Bee]
   Last Modified: 2025-04-20
   ========================================================================== */

import { initGame } from "./gameInitialization.js";
import { gameState } from "./gameState.js";


/*
 * ============================
 * CARD CLICK EVENTS
 * ============================
 * Detects user interaction with the cards and handles the flipping logic.
 * Triggers match checking when two cards are flipped. */

function handleCardClick(event) {
  const clickedCard = event.currentTarget; // get the clicked element
  // Check if the card can be played (board not locked, card not already flipped, not 2 times the same card)
  if (
    gameState.lockBoard ||
    clickedCard.classList.contains("flipped") ||
    clickedCard === gameState.flippedCards[0]
  )
    return;

  flipCard(clickedCard); // Flip the card (visually)
  gameState.flippedCards.push(clickedCard); // Add to flipped cards

  // Check for match when 2 cards flipped
  if (gameState.flippedCards.length === 2) {
    checkForMatch();
  }
}

/*
 *============================
 * VISUAL FLIP OF THE CARD
 * ============================
 * Flips the clicked card by toggling the "flipped" CSS class. */

function flipCard(card) {
  card.classList.toggle("flipped"); // Toggle CSS class for the flip animation
  card.setAttribute("aria-expanded", card.classList.contains("flipped"));
}

/*
 * ============================
 * MATCH CHECKING
 * ============================
 * Checks if the flipped cards match based on their symbol. */

function checkForMatch() {
  gameState.lockBoard = true; // lock the board during check (only 2 cards flipped in the same time)

  const [firstCard, secondCard] = gameState.flippedCards; // get the ref of the 2 cards flipped
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol; // compare the symbols of the 2 flipped cards

  if (isMatch) {
    handleSuccessfulMatch(firstCard, secondCard);
  } else {
    handleMisMatch(firstCard, secondCard);
  }

  updateAttemptsCounter(); // update attempt counter
}

/*
 *============================
 * HANDLING SUCCESSFUL MATCH
 * ============================
 * Actions to perform when two cards match, such as adding the "matched" class. */

function handleSuccessfulMatch(card1, card2) {
  // Add the "matched" class to both cards to trigger the match animation
  card1.classList.add("matched");
  card2.classList.add("matched");

  // Remove "matched" class after animation ends (using a reusable function)
  addAnimationEndListener(card1);
  addAnimationEndListener(card2);

  removeCardListeners(card1, card2); // Remove the event listeners for the matched cards
  gameState.matchedPairs++; // Update the game state
  checkWinCondition(); // Check if the game is over
  resetTurn(); // Prepare for the next turn
}

/*
 * ============================
 * ADDING ANIMATION END LISTENER
 * ============================
 * Adds an event listener to the card that listens for the animation end,
 * then removes the "matched" class once the animation finishes.
 * This ensures the "matched" class is removed only after the animation */

function addAnimationEndListener(card) {
  card.addEventListener(
    "animationend",
    () => {
      card.classList.remove("matched"); // Remove "matched" class after animation ends
    },
    { once: true }
  ); // Ensures the event listener is triggered only once
}

/*
 * ============================
 * REMOVING CARD LISTENERS
 * ============================
 * Removes the click event listeners from the cards that have been matched.
 * This prevents further interactions with already matched cards */

function removeCardListeners(card1, card2) {
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
}

/*
 * ============================
 * HANDLING MIS-MATCH
 * ============================
 * Actions to perform when the two flipped cards do not match. */

function handleMisMatch(card1, card2) {
  // wait the end of animation
  setTimeout(() => {
    // reset card visual
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");

    resetTurn(); // prepare for next try
  }, 600); // according to the CSS flip animation
}

/*
 * ============================
 * RESETTING TURN
 * ============================
 * Resets the game state for the next player's turn */

function resetTurn() {
  gameState.flippedCards = []; // clear flipped cards array
  gameState.lockBoard = false; // unlock the board
}

/*
 * ============================
 * UPDATING ATTEMPTS COUNTER
 * ============================
 * Updates the counter for the number of attempts made */

function updateAttemptsCounter() {
  gameState.attempts++;
  document.querySelector(".attempts-count").textContent = gameState.attempts;
}

/*
 * ============================
 * WIN CHECKING
 * ============================
 * Checks if the player has matched all pairs and won the game */

function checkWinCondition() {
  if (gameState.matchedPairs === gameState.totalPairs) {
    // delay the pop up : waits end of animation
    setTimeout(() => {
      const score = Math.max(100 - gameState.attempts, 0); // calculate score
      showWinScreen(score); // show win screen
    }, 600);
  }
}

/*
 * ============================
 * SHOWING WIN SCREEN
 * ============================
 * Displays a win screen and asks if the player wants to play again */

function showWinScreen(score) {
  console.log(`BRAVO !! Score: ${score}/100`);
  const playAgain = confirm("Tu as gagné ! Rejouer ?"); // confirmation dialog

  if (playAgain) {
    initGame();
  }
}

export {
  handleCardClick,
  flipCard,
  checkForMatch,
  handleSuccessfulMatch,
  handleMisMatch,
  updateAttemptsCounter,
  checkWinCondition,
  showWinScreen,
};
