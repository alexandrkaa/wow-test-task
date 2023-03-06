import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shipsReducer from "./ships-slice";

const store = configureStore({
  reducer: {
    ships: shipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export { useAppDispatch };
export default store;
