const { crosswordSolver } = require('./crosswordSolver');

// number is a word and . is a blank that need to be filled with a letter
const puzzle = [  ['2', '0', '0', '1'],
  ['0', '.', '.', '0'],
  ['1', '0', '0', '0'],
  ['0', '.', '.', '0']
];

const words = ['casa', 'alan', 'ciao', 'anta', 'ono', 'nil', 'sin'];

const solution = crosswordSolver(puzzle, words, true);

console.log(solution);
