import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { shipsAPI } from "../api/ships-api";
import { TShip, TStore } from "../types/types";
import { TResponse } from "../api/ships-api";
import { StoreLoading } from "./consts";

export type TShipsStore = {
  data: TShip[] | null;
} & TStore;

const initialState: TShipsStore = {
  data: null,
  loading: "idle",
};

export const fetchShips = createAsyncThunk("ships/fetch", async (_, thunkAPI) => {
  const response = await shipsAPI.getShips();
  return response;
});

export const shipsSlice = createSlice({
  name: "ships",
  initialState,
  reducers: {
    clearShips: (state) => {
      state.data = null;
      state.loading = StoreLoading.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShips.fulfilled, (state, action) => {
      const data = action.payload as TResponse;
      const keys = Object.keys(data.data);
      state.data = keys.map((key) => {
        const ship = data.data[key as unknown as number];
        ship.id = key;
        return ship;
      });
      state.loading = StoreLoading.SUCCEED;
    });
    builder.addCase(fetchShips.pending, (state) => {
      state.loading = StoreLoading.PENDING;
    });
    builder.addCase(fetchShips.rejected, (state) => {
      state.loading = StoreLoading.FAILED;
    });
  },
});

export const selectShips = (state: TShipsStore) => state.data;
// export const selectStatus = (state: TShipsStore) => state.loading;

export default shipsSlice.reducer;
