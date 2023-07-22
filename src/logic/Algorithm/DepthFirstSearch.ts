function DepthFirstSearch(start, end, setVis, isValid) {
  const dx = [0, 1, 0, -1]; // Represents the change in row index
  const dy = [1, 0, -1, 0]; // Represents the change in column index

  function dfs(row: number, col: number) {
    // Check if the current cell is the end position
    if (row === end[0] && col === end[1]) {
      // End position reached, do something (e.g., return true)
      return true;
    }

    // Mark the current cell as visited
    setVis(row, col);

    // Explore the neighbors of the current cell
    for (let i = 0; i < 4; i++) {
      const newRow = row + dx[i];
      const newCol = col + dy[i];

      // Check if the neighbor cell is valid and unvisited
      if (isValid(newRow, newCol)) {
        // Recursively explore the neighbor
        if (dfs(newRow, newCol)) {
          // If the neighbor leads to the end position, do something (e.g., return true)
          return true;
        }
      }
    }

    // If none of the neighbors lead to the end position, return false
    return false;
  }

  // Start the DFS from the 'start' position
  console.log(start[0], start[1]);
  return dfs(start[0], start[1]);
}

export default DepthFirstSearch;
