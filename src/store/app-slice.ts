import { createSlice } from "@reduxjs/toolkit";
import { TLang, Langs, TLangKeyCode } from "../types/types";

type TAppStore = {
  lang: TLang;
  nation: string;
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
  nation: ``,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },

    setNation: (state, action) => {
      state.nation = action.payload;
    },

    resetNation: (state) => {
      state.nation = ``;
    },
  },
});

export const selectLang = (state: TAppStore) => state.lang;
export const selectNation = (state: TAppStore) => state.nation;
export const { setLang, setNation, resetNation } = appSlice.actions;

export default appSlice.reducer;
