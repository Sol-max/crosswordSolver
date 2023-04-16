// Description: Crossword solver
const crosswordSolver = (crossword, words) => {
  const isInvalidCrossword = typeof crossword !== "string" || !/^[.\n012]+$/.test(crossword);
  const areInvalidWords = !Array.isArray(words) ||
  words.some((word) => typeof word !== "string");

if (isInvalidCrossword) {
  console.log("Error: invalid crossword format");
  return "Error: invalid crossword format";
}

if (areInvalidWords) {
  console.log("Error: invalid word list format");
  return "Error: invalid word list format";
}
  // Crossword puzzle is represented as a two-dimensional array of numbers.
  
  const parseCrossword = (crossword) => {
    const rows = crossword.trim().split("\n");
    const area = rows.map((row) => {
      return row.split("").map((cell) => {
        return cell === "." ? -1 : parseInt(cell);
      });
    });
  
    return area;
  };
  
  const area = parseCrossword(crossword);
  
  const wordCount = area
    .map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        row: rowIndex,
        col: colIndex,
      }))
    )
    .flat()
    .filter((cell) => area[cell.row][cell.col] > 0)
  if (
    wordCount.reduce((acc, cell) => acc + area[cell.row][cell.col], 0) !==
    words.length
  ) {
    console.log("Error: invalid word count")
    return "Error: invalid word count"
  }
  const puzzleWidth = area[0].length
  if (area.some((row) => row.length !== puzzleWidth)) {
    console.log("Error, array is not formatted correctly, with one or more rows having a different number of cells than the others.")
    return "Error, array is not formatted correctly, with one or more rows having a different number of cells than the others."
  }
  // check for duplicate words
  if (new Set(words).size !== words.length) {
    console.log("Error,  array contains one or more duplicate words, which are not allowed in the crossword puzzle.")
    return "Error,  array contains one or more duplicate words, which are not allowed in the crossword puzzle."
  }
  // check for words that are too long
  words.sort((a, b) => b.length - a.length)
  
  // fill puzzle with dots and empty strings for words
  const puzzleWords = area.map((row) => row.map((cell) => (cell === -1 ? "." : "")))
  // check if word can be added to the puzzle
  const tryWord = (word, row, col, direction) => {
    if (direction === "horizontal" && col + word.length > area[row].length) {
      return false
    }
    if (direction === "vertical" && row + word.length > area.length) {
      return false
    }
    for (let i = 0; i < word.length; i++) {
      if (puzzleWords[row][col] !== "") {
        if (puzzleWords[row][col] !== word[i]) {
          return false
        }
      }
      direction === "horizontal" ? col++ : row++
    }
    // cell after word should be unavailable (or out of the board)
    const afterWordCell = area[row]?.[col]
    return afterWordCell === -1 || afterWordCell === undefined
  }
  
  const addWords = (words) => {
    if (words.length === 0) {
      return true;
    }
  
    for (const word of words) {
      for (const cell of wordCount) {
        if (area[cell.row][cell.col] === 0) {
          continue;
        }
  
        let backupCells = [];
  
        const tryWord = (direction) => {
          const backupRow = puzzleWords[cell.row].slice();
          const backupCol = puzzleWords.map((row) => row[cell.col]);
          backupCells.push({ row: cell.row, col: cell.col });
  
          for (let j = 0; j < word.length; j++) {
            const row = direction === "horizontal" ? cell.row : cell.row + j;
            const col = direction === "horizontal" ? cell.col + j : cell.col;
  
            if (puzzleWords[row][col] !== "" && puzzleWords[row][col] !== word[j]) {
              return false;
            }
  
            puzzleWords[row][col] = word[j];
            backupCells.push({ row, col });
          }
  
          area[cell.row][cell.col]--;
          if (addWords(words.filter((w) => w !== word))) {
            return true;
          }
          area[cell.row][cell.col]++;
  
          backupCells.forEach((backupCell) => {
            puzzleWords[backupCell.row][backupCell.col] = "";
          });
          puzzleWords[cell.row] = backupRow;
          puzzleWords.forEach((row, index) => (row[cell.col] = backupCol[index]));
  
          return false;
        };
  
        if (tryWord("horizontal") || tryWord("vertical")) {
          return true;
        }
      }
    }
  
    return false;
  };
  
  if (!addWords(words)) {
    console.log("Error")
    return "Error"
  }
  const result = puzzleWords.map((row) => row.join("")).join("\n")
  console.log(result)
  return result
}

module.exports = { crosswordSolver };


 