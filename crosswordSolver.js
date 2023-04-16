function crosswordSolver(puzzleString, words) {
  // Convert the puzzle string to a 2D array
  const puzzle = puzzleString.split('\n').map(row => row.split(''));

  // Recursively try to fill in the blank spaces with words
  function tryFill(puzzle, blankIndex) {
    console.log('puzzle:', puzzle);
    console.log('blankIndex:', blankIndex);
    console.log('blankPositions:', blankPositions);
    // If we've filled in all the blank spaces, return the filled puzzle
    if (blankIndex === blankPositions.length) {
      return puzzle.map(row => row.join('')).join('\n');
    }

    const [i, j] = blankPositions[blankIndex];
    for (let word of words) {
      if (tryWord(puzzle, word, i, j)) {
        const newPuzzle = tryFill(puzzle, blankIndex + 1);
        if (newPuzzle !== null) {
          return newPuzzle;
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


function tryWord(puzzle, word, i, j) {
  console.log("tryWord: ", word, i, j);
  const clonePuzzle = JSON.parse(JSON.stringify(puzzle));
  let skip = false;
  // Check if the word fits horizontally
  if (j + word.length <= clonePuzzle[i].length && clonePuzzle[i].slice(j, j + word.length).every((letter, index) => letter === '.' || letter === word[index])) {
    const newPuzzle = clonePuzzle.map(row => [...row]);
    newPuzzle[i].splice(j, word.length, ...word.split(''));
    return newPuzzle;
  }

  // Check if the word fits vertically
  if (i + word.length <= clonePuzzle.length && clonePuzzle.slice(i, i + word.length).map(row => row[j]).every((letter, index) => letter === '.' || letter === word[index])) {
    const newPuzzle = clonePuzzle.map(row => [...row]);
    for (let index = 0; index < word.length; index++) {
      newPuzzle[i + index][j] = word[index];
    }
    return newPuzzle;
  }

  // If the word doesn't fit horizontally or vertically, return null
  return null;
}




  
    module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 