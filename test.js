// Description: Test the crossword solver

// import the crossword solver
const { crosswordSolver } = require("./crosswordSolver");

const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];

// solve the crossword puzzle and get the board, rows, and cols as an object
const crosswordSolution = crosswordSolver(emptyPuzzle, words);
// if the puzzle can be solved, print the solution
console.log (crosswordSolution);
// if the puzzle cannot be solved, print an error message
if (crosswordSolution instanceof Error) {
  console.log("The puzzle cannot be solved");
} 

