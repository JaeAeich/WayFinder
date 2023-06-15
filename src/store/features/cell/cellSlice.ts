import { createSlice } from '@reduxjs/toolkit';
import { CellType } from '../../../logic/GridBlock/GridBlock';
import cellInitializer from '../../data';

export type CellState = {
  cells: CellType[][];
  isLoading: boolean;
};

const initialState: CellState = {
  cells: cellInitializer(10, 10, 4),
  isLoading: false,
};

const cellSlice = createSlice({
  name: 'cellGrid',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setLoading } = cellSlice.actions;

export default cellSlice.reducer;
