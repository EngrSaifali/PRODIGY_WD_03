const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

const cells = [];
let currentPlayer = "X";
let gameOver = false;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
}

// Function to handle a move
function makeMove(index) {
    if (gameOver || cells[index].textContent !== "") return;

    cells[index].textContent = currentPlayer;
    cells[index].classList.add(`cell-${currentPlayer}`);

    if (checkWin()) {
        message.textContent = `${currentPlayer} Wins!`;
        gameOver = true;
    } else if (isBoardFull()) {
        message.textContent = "It's a Draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `${currentPlayer}'s Turn`;
        if (currentPlayer === "O" && !gameOver) {
            setTimeout(makeAIMove, 500); // Add a delay for the AI move
        }
    }
}

// Function to check if a player has won
function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add("cell-win");
            cells[b].classList.add("cell-win");
            cells[c].classList.add("cell-win");
            return true;
        }
    }

    return false;
}

// Function to check if the board is full
function isBoardFull() {
    return cells.every(cell => cell.textContent !== "");
}

// Function to reset the board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("cell-X", "cell-O", "cell-win");
    });

    currentPlayer = "X";
    gameOver = false;
    message.textContent = "Your Turn";
}

// Function to make an AI move (randomly)
function makeAIMove() {
    if (gameOver) return;

    const emptyCells = cells.filter(cell => cell.textContent === "");
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(parseInt(emptyCells[randomIndex].dataset.index));
}

resetButton.addEventListener("click", resetBoard);
resetBoard(); // Initialize the game

