import { createSlice } from "@reduxjs/toolkit";
import { TLang, Langs, TLangKeyCode } from "../types/types";

type TAppStore = {
  lang: TLang;
  curNation: string;
};

let startLang = "en" as TLangKeyCode,
  regex = "";
// поиск языка по умолчанию браузера
for (const ln in Langs) {
  regex = `^${ln}\\b`;
  if (new RegExp(regex).test(navigator.language)) {
    startLang = ln as TLangKeyCode;
    break;
  }
}

const initialState: TAppStore = {
  lang: startLang,
  curNation: ``,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },

    setNation: (state, action) => {
      state.curNation = action.payload;
    },

    resetNation: (state) => {
      state.curNation = ``;
    },
  },
});

export const selectLang = (state: TAppStore) => state.lang;
export const selectCurNation = (state: TAppStore) => state.curNation;
export const { setLang, setNation, resetNation } = appSlice.actions;

export default appSlice.reducer;
