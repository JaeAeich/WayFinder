import { setVisAsync } from '../../store/features/cell/cellSlice';
import { CellType } from '../GridBlock/GridBlock';

type DFSParams = {
  cells: CellType[][];
  startIndex: number[];
  endIndex: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => void;
};

const hash: Record<string, boolean> = {};

const depthFirstSearch = async ({
  cells,
  startIndex,
  endIndex,
  dispatch,
}: DFSParams) => {
  const numRows = cells.length;
  const numCols = cells[0].length;

  const isValid = (i: number, j: number) => {
    return (
      i >= 0 &&
      i < numRows &&
      j >= 0 &&
      j < numCols &&
      !hash[`${i}-${j}`] &&
      !cells[i][j].isVis &&
      !cells[i][j].isWall
    );
  };

  const dfsIterative = async () => {
    const stack: [number, number][] = [[startIndex[0], startIndex[1]]];
    while (stack.length > 0) {
      const [i, j] = stack.pop()!;
      if (i === endIndex[0] && j === endIndex[1]) {
        console.log('end');
        return true;
      }
      await dispatch(setVisAsync({ i, j }));
      hash[`${i}-${j}`] = true;

      const neighbors: [number, number][] = [
        [i - 1, j], // Up
        [i + 1, j], // Down
        [i, j - 1], // Left
        [i, j + 1], // Right
      ];

      for (const [ni, nj] of neighbors) {
        if (isValid(ni, nj)) {
          stack.push([ni, nj]);
        }
      }
    }
    return false;
  };

  await dfsIterative();
};

export default depthFirstSearch;
