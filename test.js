const { crosswordSolver, printBoard } = require("./crosswordSolver");

const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];

// solve the crossword puzzle and get the board, rows, and cols as an object
const crosswordSolution = crosswordSolver(emptyPuzzle, words);

if (crosswordSolution === "Error") {
  console.log("The puzzle cannot be solved");
} else {
  printBoard(crosswordSolution); // pass the crosswordSolution object to printBoard
}
