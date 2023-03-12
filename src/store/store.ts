import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import appReducer from "./app-slice";
import shipsReducer, { fetchShips } from "./ships-slice";
import shipTypesReducer, { fetchShipTypes } from "./types-slice";
import nationsReducer, { fetchNations } from "./nation-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    ships: shipsReducer,
    nations: nationsReducer,
    shipTypes: shipTypesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<typeof store.dispatch>();

store.dispatch(fetchShips());
store.dispatch(fetchNations());
store.dispatch(fetchShipTypes());

export { useAppDispatch };
export default store;
