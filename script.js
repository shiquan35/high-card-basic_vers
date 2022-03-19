let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

let cardContainer;

// HELPER FUNCTIONS

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // const suitsEmoji = ['❤️', '🔶', '♣', '♠'];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
     

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// PLAYER ACTION CALLBACKS
const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    console.log("player 1 drew: ", player1Card.rank);

    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = '';
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
    
    // update display message
    gameInfo.innerText = "It's player 2's turn. Click to draw a card!"

    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    console.log("player 2 drew: ", player2Card.rank);

    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // Empty cardContainer in case this is not the 1st round of gameplay
    // cardContainer.innerHTML = '';
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);

    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('Player 1 wins! Player 1 can draw again to continue playing!');
    } else if (player1Card.rank < player2Card.rank) {
      output('Player 2 wins! Player 1 can draw again to continue playing!');
    } else {
      output('tie');
    }
  }
};

// to display the cards drawn
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  const name = document.createElement('div');
  const card = document.createElement('div');
  card.classList.add('card');

  if (cardInfo.suit === "hearts"){
    suit.classList.add('suit', 'red');
    // suit.innerText = cardInfo.suit;
    suit.innerText = '❤';                       
    name.classList.add('name', 'red');
    name.innerText = cardInfo.name;
  }
  if (cardInfo.suit === "diamonds"){
    suit.classList.add('suit', 'red');
    // suit.innerText = cardInfo.suit;
    suit.innerText = '♦';
    name.classList.add('name', 'red');
    name.innerText = cardInfo.name;
  }
  if (cardInfo.suit === "spades"){
    suit.classList.add('suit');
    suit.innerText = '♠';
    name.classList.add('name');
    name.innerText = cardInfo.name;
  }
  if (cardInfo.suit === "clubs"){
    suit.classList.add('suit');
    suit.innerText = '♣';
    name.classList.add('name');
    name.innerText = cardInfo.name;
  }  

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};


const makeCard = (drawnName, drawnSuit, drawnRank) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = '♥️';
    
  const name = document.createElement('div');
  name.classList.add('name', 'red');
  name.innerText = '3';
    
  const card = document.createElement('div');
  card.classList.add('card');
    
  card.appendChild(name);
  card.appendChild(suit);
}


// GAME INITIALISATION
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "It's player 1's turn. Click to draw a card!";
  document.body.appendChild(gameInfo);
};

initGame();

