const  {crosswordSolver, tryWord} = require('./crosswordSolver');


const emptyPuzzle = `2001
0..0
1000
0..0`;

// const puzzleArray = emptyPuzzle.split('\n').map(row => row.split(''));


const words = ['casa', 'alan', 'ciao', 'anta'];

// solve the crossword puzzle
const solution = crosswordSolver(emptyPuzzle, words); // crosswordSolver(puzzleArray, wordList);

if (solution === 'Error') {
  console.log('The puzzle cannot be solved');
} else {
  console.log(solution);
}
