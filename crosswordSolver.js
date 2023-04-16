
function tryWord(word, position, direction, puzzle) {
  const [row, col] = position;

  const puzzleCopy = JSON.parse(JSON.stringify(puzzle));

  for (let i = 0; i < word.length; i++) {
    if (direction === "across") {
      if (puzzleCopy[row][col + i] === "." || puzzleCopy[row][col + i] === word[i]) {
        puzzleCopy[row][col + i] = word[i];
      } else {
        return null;
      }
    } else {
      if (puzzleCopy[row + i][col] === "." || puzzleCopy[row + i][col] === word[i]) {
        puzzleCopy[row + i][col] = word[i];
      } else {
        return null;
      }
    }
  }

  return puzzleCopy;
}

function solve(words, puzzle) {
  const blankPositions = getBlankPositions(puzzle);
  let solutionObj = null;

  const result = findSolution(words, puzzle, blankPositions, 0, solutionObj);

  if (result) {
    return result.solution;
  } else {
    return null;
  }
}

function findSolution(words, puzzle, blankPositions, blankIndex, solutionObj) {
  if (blankIndex === blankPositions.length) {
    return solutionObj;
  }

  const [row, col] = blankPositions[blankIndex];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (word.length === blankPositions[blankIndex].length) {
      const newPuzzleAcross = tryWord(word, [row, col], "across", puzzle);

      if (newPuzzleAcross) {
        const newSolutionObj = {
          direction: "across",
          word: word,
          solution: newPuzzleAcross
        };
        const result = findSolution(words, newPuzzleAcross, blankPositions, blankIndex + 1, newSolutionObj);

        if (result) {
          return result;
        }
      }

      const newPuzzleDown = tryWord(word, [row, col], "down", puzzle);

      if (newPuzzleDown) {
        const newSolutionObj = {
          direction: "down",
          word: word,
          solution: newPuzzleDown
        };
        const result = findSolution(words, newPuzzleDown, blankPositions, blankIndex + 1, newSolutionObj);

        if (result) {
          return result;
        }
      }
    }
  }

  return null;
}

function getBlankPositions(puzzle, debug = false) {
  const blankPositions = [];

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === ".") {
        blankPositions.push([i, j]);
      }
    }
  }

  if (debug) {
    console.log("Blank Positions:", blankPositions);
  }

  return blankPositions;
}

function crossword(puzzle, words) {
  const blankPositions = [];

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === ".") {
        blankPositions.push([i, j]);
      }
    }
  }

  if (blankPositions.length === 0) {
    return puzzle;
  }

  const sortedWords = words.sort((a, b) => b.length - a.length);
  const result = solve(blankPositions, 0, sortedWords, puzzle);

  if (result) {
    return solutionObj.solution;
  } else {
    return null;
  }
}

module.exports = { solve, crossword };



// module.exports = { solve, crosswordSolver};

 
  //  module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 