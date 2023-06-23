import { RootState, store } from '../../store/store';
import { setVisAsync } from '../../store/features/cell/cellSlice';

type DFSParams = {
  startIndex: number[];
  endIndex: number[];
};

const depthFirstSearch = async ({ startIndex, endIndex }: DFSParams) => {
  const state = store.getState() as RootState;
  const numRows = state.cellGrid.cells.length;
  const numCols = state.cellGrid.cells[0].length;
  const visited: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );
  const havePushed: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  const isValid = (i: number, j: number) => {
    return (
      i >= 0 &&
      i < numRows &&
      j >= 0 &&
      j < numCols &&
      !visited[i][j] &&
      !havePushed[i][j] &&
      !state.cellGrid.cells[i][j].isVis &&
      !state.cellGrid.cells[i][j].isWall
    );
  };

  const stack: [number, number][] = [[startIndex[0], startIndex[1]]];
  havePushed[startIndex[0]][startIndex[1]] = true;
  while (stack.length > 0) {
    console.log(stack);
    const [i, j] = stack.pop() || [-1, -1];
    if (i === endIndex[0] && j === endIndex[1]) {
      console.log('end');
      return true;
    }

    await store.dispatch(setVisAsync({ i, j }));
    visited[i][j] = true;

    const neighbors: [number, number][] = [
      [i - 1, j], // Up
      [i + 1, j], // Down
      [i, j - 1], // Left
      [i, j + 1], // Right
    ];

    for (const [ni, nj] of neighbors) {
      if (isValid(ni, nj)) {
        havePushed[i][j] = true;
        stack.push([ni, nj]);
      }
    }
  }
  return false;
};

export default depthFirstSearch;
