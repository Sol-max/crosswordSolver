function crosswordSolver(puzzle, words) {
    // Convert the puzzle string to an array of arrays
    const puzzleArray = puzzle.split('\n').map(row => row.split(''));
  
    // Create an object to keep track of the number of words that start from each position
    const wordCounts = {};
  
    for (let row = 0; row < puzzleArray.length; row++) {
      for (let col = 0; col < puzzleArray[0].length; col++) {
        const currentCell = puzzleArray[row][col];
  
        // If the current cell is not blocked and is the start of a word, increment the word count
        if (currentCell !== '.' && currentCell !== '-') {
          if (puzzleArray[row - 1]?.[col] === '-' || puzzleArray[row]?.[col - 1] === '-') {
            const positionKey = `${row},${col}`;
            wordCounts[positionKey] = parseInt(currentCell);
          }
        }
      }
    }
  
    // Iterate through the list of words and try to place each one in the puzzle
    for (let word of words) {
      let wordPlaced = false;
  
      for (let row = 0; row < puzzleArray.length && !wordPlaced; row++) {
        for (let col = 0; col < puzzleArray[0].length && !wordPlaced; col++) {
          if (!puzzleArray[row][col] ||
              (puzzleArray[row][col] === '-' && (puzzleArray[row - 1]?.[col] !== '-' && puzzleArray[row][col - 1] !== '-'))) {
            if (tryWord(word, row, col, 'across') || tryWord(word, row, col, 'down')) {
              wordPlaced = true;
              const positionKey = `${row},${col}`;
              wordCounts[positionKey]--;
  
              if (wordCounts[positionKey] === 0) {
                delete wordCounts[positionKey];
              }
            }
          }
        }
      }
  
      // If a word couldn't be placed, print an error message and return
      if (!wordPlaced) {
        return 'Error';
      }
    }
  
    // Fill in any remaining empty cells with a period
    puzzleArray.forEach(row => row.forEach((cell, index) => {
      if (!cell) {
        row[index] = '.';
      }
    }));
  
    // Convert the puzzle array back to a string and return it
    return puzzleArray.map(row => row.join('')).join('\n');
  }
  
  module.exports = crosswordSolver;
    