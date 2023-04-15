function tryWord(word, puzzleArray, row, col, direction) {
    const wordLength = word.length;
  
    for (let i = 0; i < wordLength; i++) {
      let char = word.charAt(i);
      if (direction === 'across') {
        if (col + i >= puzzleArray.length || puzzleArray[row][col + i] !== '.' && puzzleArray[row][col + i] !== char) {
          return false;
        }
      } else {
        if (row + i >= puzzleArray.length || puzzleArray[row + i][col] !== '.' && puzzleArray[row + i][col] !== char) {
          return false;
        }
      }
    }
  
    // place the word in the puzzle
    for (let i = 0; i < wordLength; i++) {
      let char = word.charAt(i);
      if (direction === 'across') {
        puzzleArray[row][col + i] = char;
      } else {
        puzzleArray[row + i][col] = char;
      }
    }
    return true;
  }
  
  function crosswordSolver(grid, words) {
    const rows = grid.split('\n');
    const width = rows[0].length;
    const height = rows.length;
    const result = {};
  
    // Find all the horizontal and vertical word slots in the grid
    const slots = [];
    for (let i = 0; i < height; i++) {
      let slotStart = -1;
      for (let j = 0; j < width; j++) {
        if (rows[i][j] === '0') {
          if (slotStart >= 0 && j - slotStart > 1) {
            slots.push({ x: slotStart, y: i, length: j - slotStart });
          }
          slotStart = -1;
        } else if (slotStart < 0) {
          slotStart = j;
        }
      }
      if (slotStart >= 0 && width - slotStart > 1) {
        slots.push({ x: slotStart, y: i, length: width - slotStart });
      }
    }
    for (let j = 0; j < width; j++) {
      let slotStart = -1;
      for (let i = 0; i < height; i++) {
        if (rows[i][j] === '0') {
          if (slotStart >= 0 && i - slotStart > 1) {
            slots.push({ x: j, y: slotStart, length: i - slotStart });
          }
          slotStart = -1;
        } else if (slotStart < 0) {
          slotStart = i;
        }
      }
      if (slotStart >= 0 && height - slotStart > 1) {
        slots.push({ x: j, y: slotStart, length: height - slotStart });
      }
    }
  
    // Try to fill each slot with a word from the list
    for (const slot of slots) {
        // console.log(`Trying word ${slot}`);
        // console.log(`Trying word ${JSON.stringify(slot)}`);
        console.log(`Trying word "${words}" in slot [${slot.x}, ${slot.y}]`);

      for (const word of words) {
        if (word.length === slot.length) {
            console.log(word);
          // Check if the word fits in the slot horizontally
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            const x = slot.x + i;
            const y = slot.y;
            if (rows[y][x] !== '.' && rows[y][x] !== word[i]) {
              fits = false;
              break;
            }
          }
          console.log(`Trying word "${word}" in slot [${slot.x}, ${slot.y}]`);
          if (fits) {
            const newRows = rows.map(row => [...row]); // create a copy of the rows
            // Fill in the word horizontally
            for (let i = 0; i < word.length; i++) {
              const x = slot.x + i;
              const y = slot.y;
              newRows[y][x] = word[i];
              //result[`${x},${y}`] = word[i];
            }
            const remainingWords = words.filter(w => w !== word); // remove the used word from the list
        const result = tryWords(newRows, remainingWords); // try to solve the remaining puzzle recursively
        if (result !== 'Error') {
          return result;
        }
            words = words.filter(w => w !== word);
            break;
          }
          
          // Check if the word fits in the slot vertically
          fits = true;
          for (let i = 0; i < word.length; i++) {
            const x = slot.x;
            const y = slot.y + i;
            if (rows[y][x] !== '.' && rows[y][x] !== word[i]) {
              fits = false;
              break;
            }
          }
         
          if (fits) {
            // Fill in the word vertically
            for (let i = 0; i < word.length; i++) {
              const x = slot.x;
              const y = slot.y + i;
              result[`${x},${y}`] = word[i];
            }
            words = words.filter(w => w !== word);
            break;
          }
        }
      }
    }
  
    // Build the resulting grid with the filled-in words
    let output = '';
    for (let i = 0; i < height; i++) {
      let row = '';
      for (let j = 0; j < width; j++) {
        const cell = rows[i][j];
        row += (cell === '0') ? '0' : (result[`${j},${i}`] || '.');
      }
      output += row + '\n';
    }
  
    return output.trim();
  }

      function printBoard({ board, rows, cols }) {
        for (let i = 0; i < rows; i++) {
          let rowStr = "";
          for (let j = 0; j < cols; j++) {
            if (board[i][j] === "") {
              rowStr += ".";
            } else {
              rowStr += board[i][j];
            }
          }
          console.log(rowStr);
        }
      }
      
      
  
   module.exports = { crosswordSolver, tryWord, printBoard };
   //  module.exports = crosswordSolver;
   // module.exports.tryWord = tryWord;
   // module.exports =tryWord;
 