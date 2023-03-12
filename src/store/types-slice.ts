import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { shipsAPI } from "../api/ships-api";
import { TStore, TShipTypes } from "../types/types";
import { TShipTypesResponse } from "../api/ships-api";
import { StoreLoading } from "./consts";

export type TShipTypesStore = {
  data: TShipTypes | null;
  types: string[];
} & TStore;

const initialState: TShipTypesStore = {
  data: null,
  types: [],
  loading: "idle",
};

export const fetchShipTypes = createAsyncThunk("shipsTypes/fetch", async (_, thunkAPI) => {
  const response = await shipsAPI.getShipTypes();
  return response;
});

export const shipTypesSlice = createSlice({
  name: "shipsTypes",
  initialState,
  reducers: {
    clearShipTypes: (state) => {
      state.data = null;
      state.loading = StoreLoading.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShipTypes.fulfilled, (state, action) => {
      const data = action.payload as TShipTypesResponse;
      state.data = data.data;
      state.types = Object.keys(data.data);
      state.loading = StoreLoading.SUCCEED;
    });
    builder.addCase(fetchShipTypes.pending, (state) => {
      state.loading = StoreLoading.PENDING;
    });
    builder.addCase(fetchShipTypes.rejected, (state) => {
      state.loading = StoreLoading.FAILED;
    });
  },
});

export const selectShipTypes = (state: TShipTypesStore) => state.data;
export const selectShipTypesNames = (state: TShipTypesStore) => state.types;

export default shipTypesSlice.reducer;
