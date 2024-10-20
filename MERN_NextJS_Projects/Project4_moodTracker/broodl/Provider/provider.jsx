"use client";
import { Provider } from "react-redux"; // Correct import from react-redux
import { store } from "@/redux/store"; // Correct import for the store

export const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
