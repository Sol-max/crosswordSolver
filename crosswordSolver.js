// importing the necessary modules
const readline = require('readline');
const fs = require('fs');

// modifying the function signature to include input file argument and output file argument
function crosswordSolver(inputFile, outputFile) {

  // reading the input file
  const input = fs.readFileSync(inputFile, 'utf-8');

  // splitting the input string on newlines and creating an array
  const inputArray = input.split('\n');

  // retrieving the size of the matrix from the first element of the array
  const matrixSize = inputArray[0];

  // retrieving the words to fill from the remaining elements of the array
  const words = inputArray.slice(1, inputArray.length);

  // an array in which we will construct the final crossword grid
  const filledGrid = [];

  // constructing a filledGrid full of spaces (empty)
  for (let i = 0; i < matrixSize; i += 1) {
    filledGrid.push([]);
    for (let j = 0; j < matrixSize; j += 1) {
      filledGrid[i].push(' ');
    }
  }

  // getting the empty spaces in the crossword and adding their x, y coordinates and direction (horizontal/vertical) to an array
  const emptySpaces = [];

  for (let i = 0; i < matrixSize; i += 1) {
    for (let j = 0; j < matrixSize; j += 1) {
      // if the current slot is a number, it's the beginning of a new word, so add it
      if (inputArray[i][j] !== '.') {
        if (i + 1 < matrixSize && inputArray[i + 1][j] !== '.') {
          // vertical word here, so we want to include everything from here down
          let wordLength = 1;
          while (i + wordLength < matrixSize && inputArray[i + wordLength][j] !== '.') {
            wordLength += 1;
          }
          emptySpaces.push({
            x: i,
            y: j,
            length: wordLength,
            direction: 'down',
          });
        }
        if (j + 1 < matrixSize && inputArray[i][j + 1] !== '.') {
          // horizontal word here, so we want to include everything from here right
          let wordLength = 1;
          while (j + wordLength < matrixSize && inputArray[i][j + wordLength] !== '.') {
            wordLength += 1;
          }
          emptySpaces.push({
            x: i,
            y: j,
            length: wordLength,
            direction: 'across',
          });
        }
      }
    }
  }

  // sorting the empty spaces by length (in descending order)
  emptySpaces.sort((a, b) => b.length - a.length);

  // creating an array of all possible word placements
  const possiblePlacements = [];

  // going through each empty space
  for (let i = 0; i < emptySpaces.length; i += 1) {
    const { x, y, length, direction } = emptySpaces[i];

// getting all the words the right length that can fit here
const possibleWords = [];
for (let j = 0; j < words.length; j += 1) {
  if (words[j].length === length) {
    if (direction === 'across') {
      if (y + length <= matrixSize) {
        let isPossible = true;
        for (let k = 0; k < length; k += 1) {
          if (filledGrid[x][y + k] !== ' ' && filledGrid[x][y + k] !== words[j][k]) {
            isPossible = false;
            break;
          }
        }
        if (isPossible) {
          possibleWords.push(words[j]);
        }
      }
    } else {
      if (x + length <= matrixSize) {
        let isPossible = true;
        for (let k = 0; k < length; k += 1) {
          if (filledGrid[x + k][y] !== ' ' && filledGrid[x + k][y] !== words[j][k]) {
            isPossible = false;
            break;
          }
        }
        if (isPossible) {
          possibleWords.push(words[j]);
        }
      }
    }
  }
}
  }}
