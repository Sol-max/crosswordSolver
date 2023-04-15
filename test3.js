const { crosswordSolver } = require('./crosswordSolver');

// define the crossword puzzle
const puzzleArray = [  ['c', 'a', 's', 'a'],
  ['?', 'l', '?', 'a'],
  ['?', 'i', 'a', 'o'],
  ['?', 'a', 'n', 't'],
];

// define the words to try
const wordList = ['ciao', 'alan', 'casa', 'anta'];

// solve the crossword puzzle
const solution = crosswordSolver(puzzleArray, wordList);

// log the solution to the console
console.log(solution);
