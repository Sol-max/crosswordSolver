const { solve } = require("./crosswordSolver");

const puzzle = [  ['2', '0', '0', '1'],
  ['0', '.', '.', '0'],
  ['1', '0', '0', '0'],
  ['0', '.', '.', '0']
];

const words = ['casa', 'il', 'anta', 'on'];

const solution = solve(puzzle, words);

console.log(solution ? solution.join("\n") : "The puzzle cannot be solved");
