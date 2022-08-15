import { createSlice } from "@reduxjs/toolkit";

export interface HistoryTypes {
  id: number;
  primaryText: string;
  secondaryText: string;
}

const initialState: HistoryTypes[] = [];

const historySlice = createSlice({
  name: "searchHistory",
  initialState: initialState,
  reducers: {
    historyAdded(state, action) {
      state.push({
        id: Date.now(),
        primaryText: action.payload.primaryText,
        secondaryText: action.payload.secondaryText,
      });
    },
  },
});

export const { historyAdded } = historySlice.actions;
export default historySlice.reducer;
