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
  

  function crosswordSolver(puzzleArray, wordList) {
    const result = {};
  
    // loop through each word in the list
    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
  
      // loop through each position in the puzzle
      for (let row = 0; row < puzzleArray.length; row++) {
        for (let col = 0; col < puzzleArray[0].length; col++) {
  
          // try placing the word horizontally
          if (tryWord(word, puzzleArray, row, col, 'across')) {
            result[word] = { row, col, direction: 'across' };
            break;
          }
  
          // try placing the word vertically
          if (tryWord(word, puzzleArray, row, col, 'down')) {
            result[word] = { row, col, direction: 'down' };
            break;
          }
        }
        if (result[word]) break;
      }
    }
    return result;
  }
  
  
  
   module.exports = { crosswordSolver, tryWord };
   //  module.exports = crosswordSolver;
   // module.exports.tryWord = tryWord;
   // module.exports =tryWord;
 