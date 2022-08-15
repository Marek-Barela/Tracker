import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const openMenuSlice = createSlice({
  name: "openMenu",
  initialState: initialState,
  reducers: {
    setMenuOpen(_, action) {
      return action.payload;
    },
  },
});

export const { setMenuOpen } = openMenuSlice.actions;
export default openMenuSlice.reducer;
