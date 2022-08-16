import { createSlice } from "@reduxjs/toolkit";
import { IpInfoTypes } from "types/ipInfo";

export interface History {
  id: number;
  primaryText: string;
  secondaryText: string;
}

export type HistoryTypes = History & IpInfoTypes;

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
        ...action.payload,
      });
    },
  },
});

export const { historyAdded } = historySlice.actions;
export default historySlice.reducer;
