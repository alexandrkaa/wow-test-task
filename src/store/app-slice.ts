import { createSlice } from "@reduxjs/toolkit";
import { TLang, Langs, TLangKeyCode } from "../types/types";

export type TAppStore = {
  lang: TLang;
  curNation: string;
  curLevel: number;
  curType: string;
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

export const initialState: TAppStore = {
  lang: startLang,
  curNation: ``,
  curLevel: 0,
  curType: ``,
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

    setLevel: (state, action) => {
      state.curLevel = action.payload;
    },

    resetLevel: (state) => {
      state.curLevel = 0;
    },

    setType: (state, action) => {
      state.curType = action.payload;
    },

    resetType: (state) => {
      state.curType = ``;
    },

    resetAll: (state) => {
      state.curLevel = 0;
      state.curNation = ``;
      state.curType = ``;
    },
  },
});

export const selectLang = (state: TAppStore) => state.lang;
export const { setLang, setNation, resetNation, setLevel, resetLevel, setType, resetType, resetAll } = appSlice.actions;

export default appSlice.reducer;
