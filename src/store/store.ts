import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shipsReducer from "./ships-slice";
import appReducer from "./app-slice";

const store = configureStore({
  reducer: {
    ships: shipsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export { useAppDispatch };
export default store;
