import { configureStore } from '@reduxjs/toolkit';
import cellReducer from './features/cell/cellSlice.js';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    cellGrid: cellReducer,
  },
});
