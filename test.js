const { crosswordSolver } = require("./crosswordSolver");

function printBoard(board) {
  for (let row of board) {
    let rowString = "";
    for (let cell of row) {
      if (cell === null) {
        rowString += ".";
      } else {
        rowString += board.meta[cell].char;
      }
    }
    console.log(rowString);
  }
}

const emptyPuzzle = `2001
0..0
1000
0..0`;

const rows = emptyPuzzle.trim().split('\n');
const words = ["casa", "alan", "ciao", "anta"];

// solve the crossword puzzle and get the board, rows, and cols as an object
const crosswordSolution = crosswordSolver(emptyPuzzle, words);

if (crosswordSolution === "Error") {
  console.log("The puzzle cannot be solved");
} else {
  printBoard(crosswordSolution.board); // pass the crosswordSolution object to printBoard
}
