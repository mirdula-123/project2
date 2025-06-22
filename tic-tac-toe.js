let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(index));
    boardElement.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) {
    statusElement.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusElement.textContent = `Player ${board[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusElement.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;
  renderBoard();
}

renderBoard();
