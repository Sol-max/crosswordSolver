function crosswordSolver(puzzleString, words) {
  // Convert the puzzle string to a 2D array
  const puzzle = puzzleString.split('\n').map(row => row.split(''));

  // Recursively try to fill in the blank spaces with words
  function tryFill(puzzle, blankIndex) {
    // If we've filled in all the blank spaces, return the filled puzzle
    if (blankIndex === blankPositions.length) {
      return puzzle.map(row => row.join('')).join('\n');
    }
  
    const [i, j] = blankPositions[blankIndex];
    for (let word of words) {
      if (tryWord(puzzle, word, i, j)) {
        const newPuzzle = puzzle.map(row => [...row]);
        // If the word fits horizontally, add it horizontally
        if (j + word.length <= puzzle[i].length) {
          newPuzzle[i].splice(j, word.length, ...word.split(''));
        }
        // If the word fits vertically, add it vertically
        else if (i + word.length <= puzzle.length) {
          for (let index = 0; index < word.length; index++) {
            newPuzzle[i + index][j] = word[index];
          }
        }
        const filledPuzzle = tryFill(newPuzzle, blankIndex + 1);
        if (filledPuzzle !== null) {
          return filledPuzzle;
        }
      }
    }
  
    // If we've tried all the words and none of them worked, return null
    return null;
  }
  

  // Find the positions of the blank spaces in the puzzle
  const blankPositions = [];
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === '.') {
        blankPositions.push([i, j]);
      }
    }
  }

  console.log('Blank Positions:', blankPositions);

  // Try to fill in the blank spaces with words
  const filledPuzzle = tryFill(puzzle, 0);

  return filledPuzzle;
}

// Check if a word can be placed in a specific position in the puzzle
function tryWord(puzzle, word, i, j) {
  // Check if the word fits horizontally
  if (j + word.length <= puzzle[i].length && puzzle[i].slice(j, j + word.length).every((letter, index) => letter === '.' || letter === word[index])) {
    const newPuzzle = puzzle.map(row => [...row]);
    newPuzzle[i].splice(j, word.length, ...word.split(''));
    return newPuzzle;
  }

  // Check if the word fits vertically
  if (i + word.length <= puzzle.length && puzzle.slice(i, i + word.length).map(row => row[j]).every((letter, index) => letter === '.' || letter === word[index])) {
    const newPuzzle = puzzle.map(row => [...row]);
    for (let index = 0; index < word.length; index++) {
      newPuzzle[i + index][j] = word[index];
    }
    return newPuzzle;
  }

  // If the word doesn't fit horizontally or vertically, return false
  return false;
}




  
    module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 