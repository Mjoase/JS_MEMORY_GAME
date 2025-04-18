const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = shuffle([...letters, ...letters]);

let moveCounter = document.getElementById("move-counter");
let resetButton = document.getElementById("reset-button");
let timeDisplay = document.getElementById("timer");
let moves = 0;
let seconds = 0;
let timer = null;
let gameStarted = false;

const board = document.getElementById("gameBoard");
let flippedCards = [];
let lockBoard = false;

initGame();

function flipCard() {
  if (lockBoard || this.classList.contains("flip")) return;

  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

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
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    disableCards();
  } else {
    firstCard.classList.add("mismatch");
    secondCard.classList.add("mismatch");
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
    flippedCards.forEach((card) => {
      card.classList.remove("flip", "mismatch");
    });
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCards, lockBoard] = [[], false];
}

function checkForWin() {
  const allCards = document.querySelectorAll(".card");
  const flipped = document.querySelectorAll(".card.flip");

  if (allCards.length === flipped.length) {
    setTimeout(() => {
      stopTimer()
      showWinMessage();
    }, 500);
  }
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timeDisplay.textContent = `${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function initGame() {
  board.innerHTML = "";
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
}

function resetGame() {
  stopTimer();
  seconds = 0;
  moves = 0;
  gameStarted = false;
  flippedCards = [];
  lockBoard = false;

  moveCounter.textContent = "0";
  timeDisplay.textContent = "0s";

  cards = shuffle([...letters, ...letters]);
  initGame();
}

function showWinMessage() {
  const winMessage = document.getElementById("win-message");
  winMessage.classList.remove("hidden");

  setTimeout(() => {
    winMessage.classList.add("hidden");
  }, 5000);
}

resetButton.addEventListener("click", resetGame);
