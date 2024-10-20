import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}, // Represents the logged-in state, empty object by default
};

export const userDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload; // Access payload from action
    },
    emptyUserData: (state) => {
      state.value = {}; // Reset state to empty object
    },
  },
});

export const { setUserData, emptyUserData } = userDataSlice.actions;

export default userDataSlice.reducer; // Correct the slice name
