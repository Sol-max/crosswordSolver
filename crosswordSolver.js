
function crossword(puzzle, words) {
  const directions = ["across", "down"];
  let solutionObj = null;

  function tryWord(word, position, direction, puzzle) {
    const [row, col] = position;
    const wordLength = word.length;

    if (direction === "across") {
      if (col + wordLength > puzzle[row].length) {
        return null;
      }

      for (let i = 0; i < wordLength; i++) {
        const puzzleChar = puzzle[row][col + i];
        const wordChar = word[i];

        if (puzzleChar !== "." && puzzleChar !== wordChar) {
          return null;
        }
      }

      const newPuzzle = JSON.parse(JSON.stringify(puzzle));

      for (let i = 0; i < wordLength; i++) {
        newPuzzle[row] = newPuzzle[row].substring(0, col + i) + word[i] + newPuzzle[row].substring(col + i + 1);
      }

      return newPuzzle;
    }

    if (direction === "down") {
      if (row + wordLength > puzzle.length) {
        return null;
      }

      for (let i = 0; i < wordLength; i++) {
        const puzzleChar = puzzle[row + i][col];
        const wordChar = word[i];

        if (puzzleChar !== "." && puzzleChar !== wordChar) {
          return null;
        }
      }

      const newPuzzle = JSON.parse(JSON.stringify(puzzle));

      for (let i = 0; i < wordLength; i++) {
        newPuzzle[row + i] = newPuzzle[row + i].substring(0, col) + word[i] + newPuzzle[row + i].substring(col + 1);
      }

      return newPuzzle;
    }

    return null;
  }

  function solve(puzzle, words, blankIndex) {
    if (blankIndex === blankPositions.length) {
      return true;
    }

    const [row, col] = blankPositions[blankIndex];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (word.length === blankPositions[blankIndex].length) {
        for (let j = 0; j < directions.length; j++) {
          const direction = directions[j];

          const newPuzzle = tryWord(word, [row, col], direction, puzzle);

          if (newPuzzle) {
            const result = solve(newPuzzle, words, blankIndex + 1);

            if (result) {
              solutionObj = {
                direction: direction,
                word: word,
                solution: newPuzzle
              };
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  const blankPositions = [];

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === ".") {
        blankPositions.push([i, j]);
      }
    }
  }

  solve(puzzle, words, 0);

  return solutionObj ? solutionObj.solution : null;
}

module.exports = { crossword };




// module.exports = { solve, crosswordSolver};

 
  //  module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 