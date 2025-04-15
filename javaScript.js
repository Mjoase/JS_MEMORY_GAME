const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [...letters, ...letters];
cards = cards.sort(() => 0.5 - Math.random());

let moveCounter = document.getElementById("move-counter");
let resetButton = document.getElementById("reset-button");
let moves = 0;

const board = document.getElementById("gameBoard");
let flippedCards = [];
let lockBoard = false;

cards.forEach((letter) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.letter = letter;

  card.innerHTML = `
        <div class="front">8</div>
        <div class="back">${letter}</div>
    `;

  card.addEventListener("click", flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (lockBoard || this.classList.contains("flip")) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    moveCounter.textContent = moves;
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  flippedCards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
  resetBoard();
  checkForWin();
}

function unflipCards() {
  setTimeout(() => {
    flippedCards.forEach((card) => card.classList.remove("flip"));
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCards, lockBoard] = [[], false];
}

function checkForWin() {
  if (
    document.querySelectorAll(".card.flip").length ===
    document.querySelectorAll(".card").length
  ) {
    setTimeout(() => {
      if (
        confirm(
         "You won! You matched All cards"
        )
      ) {
        resetGame();
      }
    }, 500);
  }
}

function resetGame() {
  board.innerHTML = "";
  flippedCards = [];
  lockBoard = false;
  moves = 0;
  moveCounter.textContent = moves;

  cards = [...letters, ...letters];
  cards = cards.sort(() => 0.5 - Math.random());

  cards.forEach((letter) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.letter = letter;
    card.innerHTML = `
        <div class = "front">8</div>
        <div class = "back">${letter}</div>
        `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

resetButton.addEventListener("click", resetGame);
