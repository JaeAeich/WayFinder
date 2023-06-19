import { CellType } from '../GridBlock/GridBlock';

type SetVisFunction = (coordinates: { i: number; j: number }) => void;

type DFSParams = {
  cells: CellType[][];
  startIndex: number[];
  endIndex: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => void;
  setVis: SetVisFunction;
};

const depthFirstSearch = ({
  // cells,
  startIndex,
  endIndex,
}: // dispatch,
// setVis,
DFSParams) => {
  const stack: number[][] = [];

  // const numRows = cells.length;
  // const numCols = cells[0].length;

  // const isValid = (i: number, j: number) => {
  //   return i >= 0 && i < numRows && j >= 0 && j < numCols;
  // };

  stack.push(startIndex);

  while (stack.length > 0) {
    const [i, j] = stack.pop() || [0, 0];
    if (i === endIndex[0] && j === endIndex[1]) {
      console.log('end');
      // Reached the end node
      return;
    }
    // // TODO: This needs to be asynch, set thunk first
    // if (!cells[i][j].isVis && !cells[i][j].isWall) {
    //   setTimeout(() => {
    //     dispatch(setVis({ i, j }));
    //   }, 10);
    //   // setVis({ i, j });

    //   const neighbors: [number, number][] = [
    //     [i - 1, j], // Up
    //     [i + 1, j], // Down
    //     [i, j - 1], // Left
    //     [i, j + 1], // Right
    //   ];

    // for (const [ni, nj] of neighbors) {
    //   if (isValid(ni, nj) && !cells[ni][nj].isVis && !cells[ni][nj].isWall) {
    //     stack.push([ni, nj]);
    //   }
    // }
    // }
  }
};

export default depthFirstSearch;
