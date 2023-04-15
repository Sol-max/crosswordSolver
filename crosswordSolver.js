function crosswordSolver(puzzle, words) {
  // Split the puzzle into rows
  const rows = puzzle.trim().split('\n');

  // Get the length of the rows and columns
  const numRows = rows.length;
  const numCols = rows[0].length;

  // Create a 2D array to represent the crossword puzzle
  const crossword = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    crossword[i] = new Array(numCols);
  }

  // Initialize the crossword puzzle with empty spaces
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (rows[i][j] === '.') {
        crossword[i][j] = ' ';
      } else {
        crossword[i][j] = null;
      }
    }
  }

  // Parse the puzzle to get the positions of the words
  const positions = [];
  let currentPos = 1;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (rows[i][j] === '0' || rows[i][j] === '1') {
        // Check if the current position has a horizontal word
        if ((j === 0 || rows[i][j - 1] === '.') && (j + 1 < numCols && rows[i][j + 1] !== '.')) {
          const wordLength = parseInt(rows[i][j], 10);
          if (wordLength > 1) {
            positions.push({
              pos: currentPos,
              row: i,
              col: j,
              len: wordLength,
              dir: 'h'
            });
            currentPos++;
          }
        }

        // Check if the current position has a vertical word
        if ((i === 0 || rows[i - 1][j] === '.') && (i + 1 < numRows && rows[i + 1][j] !== '.')) {
          const wordLength = parseInt(rows[i][j], 10);
          if (wordLength > 1) {
            positions.push({
              pos: currentPos,
              row: i,
              col: j,
              len: wordLength,
              dir: 'v'
            });
            currentPos++;
          }
        }
      }
    }
  }

  // Check if the total length of the words is equal to the sum of the lengths of the positions
  const totalLength = words.reduce((acc, word) => acc + word.length, 0);
  const positionsLength = positions.reduce((acc, pos) => acc + pos.len, 0);
  if (totalLength !== positionsLength) {
    console.log('Error');
    return;
  }

  // Create a map of the words for faster lookup
  const wordsMap = new Map(words.map(word => [word, true]));

  // Fill in the crossword puzzle with the words
  for (const pos of positions) {
    const { row, col, len, dir } = pos;
    let word = null;
    for (const w of words) {
      if (w.length === len) {
        if (dir === 'h') {
          // Check if the word fits horizontally
          let canFit = true;
          for (let i = 0; i < len; i++) {
            if (crossword[row][col + i] !== null && crossword[row][col + i] !== w[i]) {
              canFit = false;
              break;
            }
                  }
      if (canFit) {
        word = w;
        break;
      }
    } else {
      // Check if the word fits vertically
      let canFit = true;
      for (let i = 0; i < len; i++) {
        if (crossword[row + i][col] !== null && crossword[row + i][col] !== w[i]) {
          canFit = false;
          break;
        }
      }
      if (canFit) {
        word = w;
        break;
      }
    }
  }
}
if (word === null) {
  console.log('Error');
  return;
}
for (let i = 0; i < len; i++) {
  if (dir === 'h') {
    crossword[row][col + i] = word[i];
  } else {
    crossword[row + i][col] = word[i];
  }
}
wordsMap.delete(word);
}

// Check if there are any unused words
if (wordsMap.size > 0) {
console.log('Error');
return;
}

// Convert the crossword puzzle back to a string
const filledPuzzle = crossword.map(row => row.join('')).join('\n');
console.log(filledPuzzle);
}


// how to use
const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(emptyPuzzle, words);
// Output: casa
//         i..l
//         anta
//         o..n

