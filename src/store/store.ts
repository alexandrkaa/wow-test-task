import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shipsReducer, { fetchShips } from "./ships-slice";
import appReducer from "./app-slice";
import nationsReducer, { fetchNations } from "./nation-slice";

const store = configureStore({
  reducer: {
    ships: shipsReducer,
    app: appReducer,
    nations: nationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<typeof store.dispatch>();

const promiseShips = store.dispatch(fetchShips());
const promiseNations = store.dispatch(fetchNations());

export { useAppDispatch };
export default store;
