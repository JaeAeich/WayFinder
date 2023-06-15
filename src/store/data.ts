import Cell, { CellType } from '../logic/GridBlock/GridBlock';

/**
 *
 * @param dimension The size of each cell in pixel
 * @param rowNum The number of cell in a row, ie hotizotal
 * @param colNum The number of cells in a coll, ie vertical
 * @returns Matrix of respective cell
 */
const cellInitializer = (dimension: number, rowNum: number, colNum: number) => {
  const cellGrid: CellType[][] = [];
  for (let i = 0; i < colNum; i++) {
    const row: CellType[] = [];
    for (let j = 0; j < rowNum; j++) {
      const newCell: CellType = new Cell(dimension, i, j, false, false);
      row.push(newCell);
    }
    cellGrid.push(row);
  }
  return cellGrid;
};

export default cellInitializer;
