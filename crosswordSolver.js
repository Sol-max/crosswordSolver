function crosswordSolver(puzzle, words, debug = false) {
  const blankPositions = getBlankPositions(puzzle, debug);

  let solutionObj = null;

  solve(blankPositions, 0);

  if (solutionObj !== null) {
    const solutionBoard = solutionObj.solution.map(row => row.join('')).join('\n');
    console.log(solutionBoard);
    return solutionBoard;
  } else {
    console.log("The puzzle cannot be solved");
    return null;
  }
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

  function tryWord(word, [row, col], direction, puzzle) {
    const wordArr = [...word];

    for (let i = 0; i < wordArr.length; i++) {
      const newRow = direction === "down" ? row + i : row;
      const newCol = direction === "across" ? col + i : col;

      if (puzzle[newRow][newCol] !== "." && puzzle[newRow][newCol] !== wordArr[i]) {
        return false;
      }
    }

    const newPuzzle = puzzle.map(row => [...row]);

    for (let i = 0; i < wordArr.length; i++) {
      const newRow = direction === "down" ? row + i : row;
      const newCol = direction === "across" ? col + i : col;

      newPuzzle[newRow][newCol] = wordArr[i];
    }

    return newPuzzle;
}

function solve(blankPositions, blankIndex, puzzle, words) {
  if (blankIndex === blankPositions.length) {
    return true;
  }

  const [row, col] = blankPositions[blankIndex];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (word.length === blankPositions[blankIndex].length) {
      const newPuzzleAcross = tryWord(word, [row, col], "across", puzzle);

      if (newPuzzleAcross) {
        const result = solve(blankPositions, blankIndex + 1, newPuzzleAcross, words);

        if (result) {
          solutionObj = {
            direction: "across",
            word: word,
            solution: newPuzzleAcross
          };
          return true;
        }
      }

      const newPuzzleDown = tryWord(word, [row, col], "down", puzzle);

      if (newPuzzleDown) {
        const result = solve(blankPositions, blankIndex + 1, newPuzzleDown, words);

        if (result) {
          solutionObj = {
            direction: "down",
            word: word,
            solution: newPuzzleDown
          };
          return true;
        }
      }
    }
  }

  return false;
}


module.exports = { solve, crosswordSolver};

 
  //  module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 