const { tryWord } = require('./crosswordSolver');

// Test Case 1 - Valid placement
const puzzle1 = [
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
];
const word1 = 'test';
const row1 = 0;
const col1 = 0;
const direction1 = 'across';
const expected1 = true;

console.log('Puzzle before word placement:');
console.log(puzzle1);

const result1 = tryWord(word1, puzzle1, row1, col1, direction1);

console.log('Puzzle after word placement:');
console.log(puzzle1);

console.log('Result:', result1);
console.log('Expected:', expected1);

  // Test Case 2 - Invalid placement (word is too long for row)
  const puzzle2 = [
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const word2 = 'longword';
  const row2 = 0;
  const col2 = 0;
  const direction2 = 'across';
  const expected2 = false;
  console.log('Puzzle before word placement:');
console.log(puzzle2);

const result2 = tryWord(word2, puzzle2, row2, col2, direction2);

console.log('Puzzle after word placement:');
console.log(puzzle2);

console.log('Result:', result2);
console.log('Expected:', expected2);
  // Test Case 3 - Invalid placement (word is too long for column)
  const puzzle3 = [
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const word3 = 'longword';
  const row3 = 0;
  const col3 = 0;
  const direction3 = 'down';
  const expected3 = false;
  console.log('Puzzle before word placement:');
console.log(puzzle3);

const result3 = tryWord(word3, puzzle3, row3, col3, direction3);

console.log('Puzzle after word placement:');
console.log(puzzle3);

console.log('Result:', result3);
console.log('Expected:', expected3);
  // Test Case 4 - Invalid placement (word intersects with different letter)
  const puzzle4 = [
    ['c', '.', '.', '.'],
    ['a', '.', '.', '.'],
    ['s', '.', '.', '.'],
    ['a', '.', '.', '.']
  ];
  const word4 = 'cool';
  const row4 = 0;
  const col4 = 0;
  const direction4 = 'down';
  const expected4 = false;
  console.log('Puzzle before word placement:');
  console.log(puzzle4);
  
  const result4 = tryWord(word4, puzzle4, row4, col4, direction4);
  
  console.log('Puzzle after word placement:');
  console.log(puzzle4);
  
  console.log('Result:', result4);
  console.log('Expected:', expected4);
  // Test Case 5 - Valid placement (word intersects with same letter)
  const puzzle5 = [
    ['c', '.', '.', '.'],
    ['a', '.', '.', '.'],
    ['s', '.', '.', '.'],
    ['a', '.', '.', '.']
  ];
  const word5 = 'coat';
  const row5 = 0;
  const col5 = 0;
  const direction5 = 'down';
  const expected5 = true;
  console.log('Puzzle before word placement:');
  console.log(puzzle5);
  
  const result5 = tryWord(word5, puzzle5, row5, col5, direction5);
  
  console.log('Puzzle after word placement:');
  console.log(puzzle5);
  
  console.log('Result:', result5);
  console.log('Expected:', expected5);
  // Test Case 6 - Valid placement (word placed in center of puzzle)
  const puzzle6 = [
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', '.']
  ];
  const word6 = 'test';
  const row6 = 1;
  const col6 = 1;
  const direction6 = 'across';
  const expected6 = true;
  console.log('Puzzle before word placement:');
  console.log(puzzle6);
  
  const result6 = tryWord(word6, puzzle6, row6, col6, direction6);
  
  console.log('Puzzle after word placement:');
  console.log(puzzle6);
  
  console.log('Result:', result6);
  console.log('Expected:', expected6);