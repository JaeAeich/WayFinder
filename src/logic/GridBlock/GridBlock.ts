/**
 * Represents a cell in a grid.
 */
export interface CellType {
  dimension: number;
  i: number;
  j: number;
  isWall: boolean;
  isVis: boolean;
}
export default class Cell implements CellType {
  dimension: number;

  i: number;

  j: number;

  isWall: boolean;

  isVis: boolean;

  /**
   *
   * @param dimension Size of the Cell block in px
   * @param i X axis position of the Cell
   * @param j Y axiz position of the Cell
   * @param isWall Defines if a block is visitable, i.e if its a wall or path
   * @param isVis Defines if this block is visitied
   */
  constructor(
    dimension: number,
    i: number,
    j: number,
    isWall = false,
    isVis = false
  ) {
    this.dimension = dimension;
    this.i = i;
    this.j = j;
    this.isWall = isWall;
    this.isVis = isVis;
  }

  /**
   * Checks if this Cell is a wall or a path.
   * @returns True if it is a wall, false otherwise.
   */
  isWalled(): boolean {
    return this.isWall;
  }

  /**
   * Checks if the Cell has been visited.
   * @returns True if it has been visited, false otherwise.
   */
  isVisited(): boolean {
    return this.isVis;
  }
}
