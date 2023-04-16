const { crosswordSolver } = require("./crosswordSolver");

const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];

const solutionObj = crosswordSolver(emptyPuzzle, words);

if (solutionObj === "Error" || solutionObj === null) {
  console.log("The puzzle cannot be solved");
} else {
  const solutionBoard = solutionObj.solution.map(row => row.join('')).join('\n');
  console.log(solutionBoard);
}
