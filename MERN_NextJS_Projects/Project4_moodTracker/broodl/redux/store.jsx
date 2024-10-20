import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "@/features/logged/logged";
import dataReducer from "@/features/user/user";

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    data: dataReducer,
  },
});
