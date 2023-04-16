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

function tryWord(puzzle, word, row, col, direction, debug = false) {
  const puzzleCopy = puzzle.map(row => [...row]);
  let i = row;
  let j = col;

  for (let k = 0; k < word.length; k++) {
    if (puzzleCopy[i][j] === "." || puzzleCopy[i][j] === word[k]) {
      puzzleCopy[i][j] = word[k];
      if (direction === "across") {
        j++;
      } else {
        i++;
      }
    } else {
      if (debug) {
        console.log(`Cannot place ${word} at row ${row} and column ${col}`);
      }
      return null;
    }
  }

  if (debug) {
    console.log(`Placed ${word} at row ${row} and column ${col}`);
  }

  return puzzleCopy;
}

function solve(puzzle, words, blankPositions, blankIndex) {
  console.log("Blank Positions:", blankPositions);
  console.log("Blank Index:", blankIndex);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isValidWord = tryWord(word, row, col, direction, puzzle);
    if (isValidWord) {
      const newPuzzle = placeWord(word, row, col, direction, puzzle);
      const solutionObj = solve(newPuzzle, words, blankIndex + 1, debug);
      if (solutionObj !== "Error") {
        return solutionObj;
      }
    }
  }
  
  if (blankIndex === blankPositions.length) {
    console.log("Solution Found!");
    return { success: true, solution: puzzle };
  }

  const word = words.find(w => w.length === blankPositions[blankIndex].length);
  console.log("Try Word:", word, blankPositions[blankIndex]);

  if (!word) {
    console.log("No suitable word found");
    return { success: false };
  }

  for (let i = 0; i < word.length; i++) {
    puzzle[blankPositions[blankIndex][i][0]][blankPositions[blankIndex][i][1]] = word[i];
  }
  console.log("Puzzle after Try:", puzzle);

  const result = solve(puzzle, words, blankPositions, blankIndex + 1);
  if (result.success) {
    return result;
  } else {
    for (let i = 0; i < word.length; i++) {
      puzzle[blankPositions[blankIndex][i][0]][blankPositions[blankIndex][i][1]] = '.';
    }
    console.log("Puzzle after Backtrack:", puzzle);
  }

  return solve(puzzle, words, blankPositions, blankIndex);
}


function crosswordSolver(puzzleString, wordList) {
  const puzzle = puzzleString.split("\n").map(row => row.split(""));
  const words = wordList.slice();
  const blankPositions = getBlankPositions(puzzle);

  const solution = solve(puzzle, words, 0, blankPositions);

  if (solution === null) {
    return "Error";
  } else {
    const solutionObj = {
      words: wordList,
      solution: solution,
    };
    return solutionObj;
  }
}

module.exports = {
  crosswordSolver,
};

 
  //  module.exports = { crosswordSolver };
  // module.exports = crosswordSolver;
    // module.exports.tryWord = tryWord;
 // module.exports =tryWord;
 