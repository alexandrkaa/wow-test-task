import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nationsAPI, TResponse } from "../api/nation-api";
import { TNation, TNations, TStore } from "../types/types";
import { StoreLoading } from "./consts";

export type TNationsStore = {
  data: TNations | null;
} & TStore;

const initialState: TNationsStore = {
  data: null,
  loading: "idle",
};

export const fetchNations = createAsyncThunk("nations/fetch", async (_, thunkAPI) => {
  const response = await nationsAPI.getNations();
  return response;
});

export const nationsSlice = createSlice({
  name: "nations",
  initialState,
  reducers: {
    clearNations: (state) => {
      state.data = null;
      state.loading = StoreLoading.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNations.fulfilled, (state, action) => {
      const data = (action.payload as TResponse)?.data;
      let mapped;
      if (Array.isArray(data)) {
        mapped = data.reduce((acc, curr) => {
          acc[curr.name] = curr;
          return acc;
        }, {} as TNations);
      }
      state.data = mapped as TNations;
      state.loading = StoreLoading.SUCCEED;
    });
    builder.addCase(fetchNations.pending, (state) => {
      state.loading = StoreLoading.PENDING;
    });
    builder.addCase(fetchNations.rejected, (state) => {
      state.loading = StoreLoading.FAILED;
    });
  },
});

export const selectNations = (state: TNationsStore): TNations | null => state.data;
export const selectNation = (state: TNationsStore, nation: string): TNation | undefined =>
  selectNations(state)?.[nation];
// export const selectStatus = (state: TNationsStore) => state.loading;

export default nationsSlice.reducer;
