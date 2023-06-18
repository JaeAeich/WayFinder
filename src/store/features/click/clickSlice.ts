import { createSlice } from '@reduxjs/toolkit';

export type ClickState = {
  clickOption: string;
  positionSelectOption: string;
  startIndex: number[];
  endIndex: number[];
};

const initialState: ClickState = {
  clickOption: 'no',
  positionSelectOption: 'start',
  startIndex: [],
  endIndex: [],
};

const clickSlice = createSlice({
  name: 'click',
  initialState,
  reducers: {
    /**
     * Used to set click option to set walls in the grid.
     * @param state store, not to be passed
     * @param action object, has payload for click options : "click", "drag", "no"
     */
    setClickOption: (state, action) => {
      state.clickOption = action.payload;
    },

    /**
     * Used to enable setting position of cell, startIndex or endIndex
     * @param state store, not ot be passed
     * @param action object, has payload for position options : "start", "end"
     */
    setPositionSelectOption: (state, action) => {
      state.positionSelectOption = action.payload;
    },

    /**
     * Used to set initial position to start the algo
     * @param state store, not to be passed
     * @param action object, payload passed has start point for algo, [i,j]
     */
    setStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },

    /**
     * Used to set initial position to end the algo
     * @param state store, not to be passed
     * @param action object, payload passed has end point for algo, [i,j]
     */
    setEndIndex: (state, action) => {
      state.endIndex = action.payload;
    },
  },
});
export const {
  setClickOption,
  setStartIndex,
  setEndIndex,
  setPositionSelectOption,
} = clickSlice.actions;

export default clickSlice.reducer;
