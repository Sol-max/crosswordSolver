// Description: Crossword solver
const crosswordSolver = (crossword, words) => {
  const isInvalidCrossword = typeof crossword !== "string" || !/^[.\n012]+$/.test(crossword);
  const areInvalidWords = !Array.isArray(words) ||
  words.some((word) => typeof word !== "string");

if (isInvalidCrossword) {
  // console.log("Error: invalid crossword format");
  return "Error: invalid crossword format";
}

if (areInvalidWords) {
  // console.log("Error: invalid word list format");
  return "Error: invalid word list format";
}
  // Crossword puzzle is represented as a two-dimensional array of numbers.
  const parseCrossword = (crossword) => {
     // split the input string into an array of rows
    const rows = crossword.trim().split("\n");
    // for each row, split it into an array of cells and convert each cell to a number
    // if the cell is ".", set it to -1 instead of NaN
    const area = rows.map((row) => {
      return row.split("").map((cell) => {
        return cell === "." ? -1 : parseInt(cell);
      });
    });
  
    return area;
  };
  // parse the crossword
  const area = parseCrossword(crossword);
  
  const wordCount = area // create an array of objects 
    .map((row, rowIndex) =>
      row.map((cell, colIndex) => ({ 
        row: rowIndex,
        col: colIndex,
      }))
    )
    .flat() // flatten the array of arrays into a single array
    .filter((cell) => area[cell.row][cell.col] > 0) // filter out the cells that don't contain a number
  if ( // check if the number of words in the puzzle matches the number of words in the word list
    wordCount.reduce((acc, cell) => acc + area[cell.row][cell.col], 0) !==
    words.length
  ) {
    // console.log("Error: invalid word count")
    return "Error: invalid word count"
  }
  const puzzleWidth = area[0].length
  if (area.some((row) => row.length !== puzzleWidth)) {
    // console.log("Error:  array is not formatted correctly, with one or more rows having a different number of cells than the others.")
    return "Error: array is not formatted correctly, with one or more rows having a different number of cells than the others."
  }
  // check for duplicate words
  if (new Set(words).size !== words.length) {
    // console.log("Error: array contains one or more duplicate words, which are not allowed in the crossword puzzle.")
    return "Error: array contains one or more duplicate words, which are not allowed in the crossword puzzle."
  }
  // check for words that are too long
  words.sort((a, b) => b.length - a.length)
  
  // fill puzzle with dots and empty strings for words
  const puzzleWords = area.map((row) => row.map((cell) => (cell === -1 ? "." : "")))
    
// This function takes an array of words and tries to add them to the puzzle board
const addWords = (words) => {
  // If there are no more words to add, the puzzle is complete and we return true
  if (words.length === 0) {
    return true;
  }

  // For each word in the array of words, we iterate through all the available cells in the wordCount array
  for (const word of words) {
    for (const cell of wordCount) {
      // If the current cell is already used (i.e., has a value of 0), we move on to the next cell
      if (area[cell.row][cell.col] === 0) {
        continue;
      }

      // We define an array to keep track of the cells that need to be backed up when trying out a word
      let backupCells = [];

      // This function tries out a word in a given direction (horizontal or vertical)
      const tryWord = (direction) => {
        // We make a backup of the current row and column in case we need to restore them later
        const backupRow = puzzleWords[cell.row].slice();
        const backupCol = puzzleWords.map((row) => row[cell.col]);

        // We add the current cell to the backupCells array
        backupCells.push({ row: cell.row, col: cell.col });

        // We iterate over each character in the word, adding it to the puzzle board one cell at a time
        for (let j = 0; j < word.length; j++) {
          const row = direction === "horizontal" ? cell.row : cell.row + j;
          const col = direction === "horizontal" ? cell.col + j : cell.col;

          // If the current cell is already filled with a different character, we can't use this word in this direction
          if (puzzleWords[row][col] !== "" && puzzleWords[row][col] !== word[j]) {
            return false;
          }

          // We add the current character to the puzzle board and add the current cell to the backupCells array
          puzzleWords[row][col] = word[j];
          backupCells.push({ row, col });
        }

        // We decrement the value of the current cell in the area array since it's now used by the word we just added
        area[cell.row][cell.col]--;

        // We recursively call addWords with the remaining words in the array (i.e., the words that haven't been added yet)
        // If we successfully add all the remaining words, we return true
        if (addWords(words.filter((w) => w !== word))) {
          return true;
        }

        // If we weren't able to successfully add the remaining words, we restore the backupCells and return false
        backupCells.forEach((backupCell) => {
          puzzleWords[backupCell.row][backupCell.col] = "";
        });
        puzzleWords[cell.row] = backupRow;
        puzzleWords.forEach((row, index) => (row[cell.col] = backupCol[index]));

        return false;
      };

      // We try the word in both horizontal and vertical directions
      // If the word can be added in either direction, we return true and move on to the next word
      if (tryWord("horizontal") || tryWord("vertical")) {
        return true;
      }
    }
  }

  // If we've tried all the words in all the available cells and none of them fit, we return false
  return false;
};

  // if words cannot be added to the puzzle, return an error
  if (!addWords(words)) {
    // console.log("Error: could not add all words to the puzzle.")
    return "Error: could not add all words to the puzzle."
  } // otherwise, return the puzzle
  const result = puzzleWords.map((row) => row.join("")).join("\n") 
  // console.log(result) // for testing
  return result
}
// export the crosswordSolver function for use in node.js
module.exports = { crosswordSolver };
 