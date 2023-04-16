const { crosswordSolver } = require("./crosswordSolver");

const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];

const filledPuzzle = crosswordSolver(emptyPuzzle, words);



if (filledPuzzle === "Error") {
  console.log("The puzzle cannot be solved");
} else {
  console.log(filledPuzzle);; // pass the crosswordSolution object to printBoard
}
