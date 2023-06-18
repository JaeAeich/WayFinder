import { configureStore } from '@reduxjs/toolkit';
import cellReducer from './features/cell/cellSlice.js';
import clickReducer from './features/click/clickSlice.js';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    cellGrid: cellReducer,
    click: clickReducer,
  },
});
