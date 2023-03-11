import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLang, Langs } from "../types/types";

type TAppStore = {
  lang: TLang;
};

let startLang = Langs.en,
  regex = "";
// поиск языка по умолчанию браузера
for (const ln in Langs) {
  regex = `^${Langs[ln as keyof typeof Langs]}\\b`;
  if (new RegExp(regex).test(navigator.language)) {
    startLang = Langs[ln as keyof typeof Langs];
    break;
  }
}

const initialState: TAppStore = {
  lang: startLang,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const selectLang = (state: TAppStore) => state.lang;

export default appSlice.reducer;
