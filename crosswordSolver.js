const crosswordSolver = (crossword, words) => {
  // Validate input crossword
  const isInvalidCrossword = typeof crossword !== "string" || !/^[.\n012]+$/.test(crossword);
  // Validate input words
  const areInvalidWords = !Array.isArray(words) ||
      words.some((word) => typeof word !== "string");

  // Return error if crossword is invalid
  if (isInvalidCrossword) {
      return "Error: invalid crossword format";
  }
  // Return error if words are invalid
  if (areInvalidWords) {
      return "Error: invalid word list format";
  }
  // Function to parse the crossword input string into a 2D array
  const parseCrossword = (crossword) => {
      // Split the input string into rows
      const rows = crossword.trim().split("\n");
      // Convert each row to an array of numbers, using -1 for the "." character
      const area = rows.map((row) => {
          return row.split("").map((cell) => {
              return cell === "." ? -1 : parseInt(cell);
          });
      });

      return area;
  };
  // Parse the input crossword into a 2D array
  const area = parseCrossword(crossword);
  // Create a 2D array to store the words in the puzzle
  const puzzleWords = area.map((row) => row.map((cell) => (cell === -1 ? "." : "")));

  // Function to add words to the crossword
  const addWords = (words, currentWordIndex = 0) => {
      // If all words are added, return true
      if (currentWordIndex === words.length) {
          return true;
      }

      // Get the current word to be added
      const word = words[currentWordIndex];

      // Iterate through all the cells in the area
      for (let rowIndex = 0; rowIndex < area.length; rowIndex++) {
          for (let colIndex = 0; colIndex < area[0].length; colIndex++) {
              // Skip cells with 0
              if (area[rowIndex][colIndex] === 0) {
                  continue;
              }

              const cell = {
                  row: rowIndex,
                  col: colIndex,
              };

              // Function to try adding a word in a direction (horizontal or vertical)
              const tryWord = (direction) => {
                  // Initialize an array to store cells that need to be restored if the word doesn't fit
                  const backupCells = [];

                  // Iterate through the characters of the word
                  for (let i = 0; i < word.length; i++) {
                      // Calculate row and col indices for the current character based on the direction
                      const row = direction === "horizontal" ? cell.row : cell.row + i;
                      const col = direction === "horizontal" ? cell.col + i : cell.col;

                      // If the current character doesn't fit, break the loop
                      if (
                          row >= area.length ||
                          col >= area[0].length ||
                          (puzzleWords[row][col] !== "" && puzzleWords[row][col] !== word[i])
                      ) {
                          break;
                      }

                      // Add the current character to the puzzle and store the cell in the backup array
                      backupCells.push({ row, col, value: puzzleWords[row][col] });
                      puzzleWords[row][col] = word[i];
                  }

                  // If the entire word fits, try adding the remaining words recursively
                  if (backupCells.length === word.length && addWords(words, currentWordIndex + 1)) {
                      return true;
                  }

                  // If the word doesn't fit, restore the backed-up cells
                  backupCells.forEach((backupCell) => {
                      puzzleWords[backupCell.row][backupCell.col] = backupCell.value;
                  });

                  return false;
              };

              // Try adding the word horizontally and vertically
              if (tryWord("horizontal") || tryWord("vertical")) {
                  return true;
              }
          }
      }
      // If the word cannot be added, return false
      return false;
  };
  // Try to add all words to the puzzle
  if (!addWords(words)) {
      return "Error: could not add all words to the puzzle.";
  }
  // Convert the puzzleWords array to a string and return the result
  const result = puzzleWords.map((row) => row.join("")).join("\n");
  return result;
};

module.exports = { crosswordSolver };