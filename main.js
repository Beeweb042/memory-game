/** 
 * Main game state object
 * tracks all dynamic game variables
 ****************************************/

// Array of cards
const cardSymbols = ["CSS3", "JS", "PHP", "SASS", "WP", "NODE"];
// Create pairs : cards duplication + merge of the array
const fullDeck = [...cardSymbols, ...cardSymbols];


const gameState = {
  // stores currently flipped cards
  flippedCards: [],
  // locks board during animations to prevent interactions
  lockBoard: false,
  // total of pairs
  totalPairs: cardSymbols.length,
  // counts successfully matched pairs
  matchedPairs: 0,
  // tracks total attempts
  attempts: 0,
};

/** 
 * Initializes game board
 * Resets state and create card deck
 ****************************************/
function initGame() {
  //reset game tracking variables
  gameState.flippedCards = [];
  gameState.lockBoard = false;
  gameState.matchedPairs = 0;
  gameState.attempts = 0;
  gameState.totalPairs = cardSymbols.length;

  //update UI counter
  document.querySelector(".attempts-count").textContent = "0";

  // shuffle and render cards
//   const deckToShuffle = [...cardSymbols, ...cardSymbols];
  const shuffledDeck = shuffleCards(fullDeck);

  renderBoard(shuffledDeck);
}



// Shuffle the cards
function shuffleCards(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/** 
 * Rendering the game board
 * with suffled cards
 ****************************************/
function renderBoard(deck) {
  // refering to the game board in html (<main>)
  const boardElement = document.getElementById('gameBoard');
  // clear existing content (mostly for the restart function)
  boardElement.innerHTML = '';

  /** Create the cards in the deck
   * @param {string} symbol - The card's symbol
   * @param {number} index - Position of the card in the desk
   */
  deck.forEach((symbol, index) => {
    // create card container div
    const card = document.createElement('div');

    // add class for syling
    card.className = 'card';

    // store the card data as HTML attribute
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    // create card faces front/back
    card.innerHTML = `
    <div class="card-face card-front">
        <img src="img/${symbol.toLowerCase()}.png" 
             alt="${symbol}" 
             class="card-image"
             onerror="this.onerror=null; this.parentElement.textContent='${symbol}'">
    </div>
    <div class="card-face card-back">
        <img src="img/back.jpeg" 
             alt="Card Back" 
             class="card-image">
    </div>
`;

card.addEventListener('click', handleCardClick);
    // add the card to the desk
    boardElement.appendChild(card);
  });
}

/** 
 * Card click events
 ****************************************/
function handleCardClick(event) {
    // get the clicked element
    const clickedCard = event.currentTarget;

    // Check if the card can be played (board not locked, card not already flipped, not 2 times the same card)
    if (gameState.lockBoard) return;
    if (clickedCard.classList.contains('flipped')) return;
    if (clickedCard === gameState.flippedCards[0]) return;

    // Flip the card (visually)
    flippedCardVisual(clickedCard);
    // Add to flipped cards
    gameState.flippedCards.push(clickedCard);

    // Check for match when 2 cards flipped
    if (gameState.flippedCards.length === 2) {
        checkForMatch();
    }
}


/** 
 * Apply visual flip to the cards
 ****************************************/
function flippedCardVisual(card) {
    // Toggle CSS class for the flip animation
    card.classList.toggle('flipped');
    card.setAttribute('aria-expanded', card.classList.contains('flipped'));
}


/** 
 * Check is flipped cards match
 * update game state
 ****************************************/
function checkForMatch() {
    // lock the board during check (only 2 cards flipped in the same time)
    gameState.lockBoard = true;

    // get the ref of the 2 cards flipped
    const [firstCard, secondCard] = gameState.flippedCards;

    // compare the symbols of the 2 flipped cards
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        handleSuccessfulMatch(firstCard, secondCard);
    } else {
        handleMisMatch(firstCard,secondCard)
    }

    // update attempt counter
    updateAttemptsCounter();
}

/** 
 * If cards match
 ****************************************/
function handleSuccessfulMatch(card1, card2) {
    // add permanent matched state
    card1.classList.add('matched');
    card2.classList.add('matched');

    // prevent other interaction
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);

    // update game progress
    gameState.matchedPairs++;

    // check win condition
    checkWinCondition();
    
    // prepare for next turn
    resetTurn();
}

/** 
 * If cards don't match
 * with reset animation
 ****************************************/
function handleMisMatch(card1, card2) {
    // wait the end of animation
    setTimeout(() => {
        // reset card visual
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');

        // prepare for next try
        resetTurn();
    }, 1000);
}

/**
 * Reset game state for next player turn
 ****************************************/
function resetTurn() {
    // clear flipped cards array
    gameState.flippedCards = [];
    // unlock the board
    gameState.lockBoard = false;
}

/** 
 * Update the attempts counter
 ****************************************/
function updateAttemptsCounter() {
    gameState.attempts++;
    document.querySelector('.attempts-count').textContent = gameState.attempts;
}

/**
 * Check if all pairs have been found
 * (triggered after each successfull match)
 ****************************************/
function checkWinCondition() {
    if (gameState.matchedPairs === gameState.totalPairs) {
        // delay the pop up : waits end of animation
        setTimeout(() => {
        // calculate score
        const score = Math.max(100 - gameState.attempts, 0);
        // show win screen
        showWinScreen(score);
        }, 600);
    }
}


/**
 * Display a win message with the score
 ****************************************/
function showWinScreen(score) {
    console.log(`BRAVO !! Score: ${score}/100`);
    // confirmation dialog
    const playAgain = confirm('Tu as gagné ! Rejouer ?');

    if (playAgain) {
        resetGame();
    }
}


/**
 * Full reset of the game
 ****************************************/
function resetGame() {
    // reset visual
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    // Rebind event listeners
    bindCardEvents();

    // reset the states
    gameState.matchedPairs = 0;
    gameState.attempts = 0;
    gameState.lockBoard = false;
    gameState.flippedCards = [];

    // update attempts counter
    updateAttemptsCounter();
}

/**
 * Attach click handlers to all cards
 ****************************************/
function bindCardEvents() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.addEventListener('click', handleCardClick);
    })
}


/**
 * START GAME after the DOM is loaded
 ****************************************/
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    bindCardEvents();

document.getElementById('newGameBtn').addEventListener('click', resetGame)

});
