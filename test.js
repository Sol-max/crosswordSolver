const crosswordSolver  = require('./crosswordSolver.js');

const emptyPuzzle = `2001
0..0
1000
0..0`
// const emptyPuzzle = 
// "2001\n0..0\n1000\n0..0";

const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);
