import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CellType } from '../../../logic/GridBlock/GridBlock';
import cellInitializer from '../../data';
import { RootState } from '../../store';

export type CellState = {
  cells: CellType[][];
  isLoading: boolean;
};

const initialState: CellState = {
  cells: cellInitializer(10, 10, 10),
  isLoading: false,
};

/**
 * Async thunk for setting isVis of a cell.
 */
export const setVisAsync = createAsyncThunk(
  'cell/setWall',
  async ({ i, j }: { i: number; j: number }, { getState }) => {
    const state = getState() as RootState; // Define rootState with appropriate type
    return new Promise<{ i: number; j: number }>((resolve, reject) => {
      // TODO: Maybe I can use setTimeout to set speed of the algo.
      setTimeout(() => {
        if (state.cellGrid.cells[i][j].isVis === false) resolve({ i, j });
        else reject();
      }, 1);
    });
  }
);

const cellSlice = createSlice({
  name: 'cellGrid',
  initialState,
  reducers: {
    /**
     * This action sets a new grid of cells
     * @param state Store
     * @param action object, takes in "dimension" of the new cell, number
     * of rows, "rowNum" of new grid, and number of columns "colNum", in new grid.
     */
    resizeCellGrid: (state, action) => {
      state.isLoading = true;
      const { dimension, rowNum, colNum } = action.payload;
      state.cells = cellInitializer(dimension, rowNum, colNum);
      state.isLoading = false;
    },

    /**
     * This action sets if the gridCell is Loading or not
     * @param state store, nothing to pass
     */
    setLoading: (state) => {
      state.isLoading = true;
    },

    /**
     * This action is used to set a cell as wall
     * @param state store, no to be passes
     * @param action object, takes in i, j of the cell to set it as wall
     */
    setWall: (state, action) => {
      const { i, j } = action.payload;
      const updatedCells = [...state.cells]; // Create a shallow copy of the cells array
      updatedCells[i] = [...state.cells[i]]; // Create a shallow copy of the row array
      updatedCells[i][j] = {
        ...state.cells[i][j], // Create a shallow copy of the cell object
        isWall: !state.cells[i][j].isWall, // Update the isWall property
      };
      state.cells = updatedCells;
    },

    /**
     * This action is used to set the cell as visited
     * @param state store, not to be passed
     * @param action object, takes in i, j of the cell to set is as visited
     */
    setVis: (state, action) => {
      const { i, j } = action.payload;
      const updatedCells = [...state.cells]; // Create a shallow copy of the cells array
      updatedCells[i] = [...state.cells[i]]; // Create a shallow copy of the row array
      updatedCells[i][j] = {
        ...state.cells[i][j], // Create a shallow copy of the cell object
        isVis: !state.cells[i][j].isVis, // Update the isVis property
      };
      state.cells = updatedCells;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setVisAsync.pending, () => {
      // Perform actions in pending if need be in future
    });
    builder.addCase(setVisAsync.fulfilled, (state, action) => {
      const { i, j } = action.payload;

      // Create a shallow copy of the cells array
      const updatedCells = [...state.cells];

      // Create a shallow copy of the row array
      updatedCells[i] = [...state.cells[i]];
      updatedCells[i][j] = {
        // Create a shallow copy of the cell object
        ...state.cells[i][j],
        // Update the isVis property
        isVis: !state.cells[i][j].isVis,
      };
      state.cells = updatedCells;
    });
    builder.addCase(setVisAsync.rejected, () => {
      // Perform actions in rejected if need be in future
    });
  },
});

export const { setLoading, resizeCellGrid, setWall, setVis } =
  cellSlice.actions;

export default cellSlice.reducer;
