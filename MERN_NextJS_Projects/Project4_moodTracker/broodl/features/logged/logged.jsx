import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false, // Represents the logged-in state, false by default
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.value = true;
    },
    setLoggedOut: (state) => {
      state.value = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;
