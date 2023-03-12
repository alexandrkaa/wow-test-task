import { TStore } from "../types/types";
// nation
import { selectNations } from "./nation-slice";
import { selectNation } from "./nation-slice";
// app
import { selectLang } from "./app-slice";
// ships
import { selectShips, selectShipLevels } from "./ships-slice";
import { selectShipTypes, selectShipTypesNames } from "./types-slice";
//common
const selectStatus = <T extends TStore>(state: T): string => {
  return state.loading;
};

export {
  selectStatus,
  selectNations,
  selectNation,
  selectLang,
  selectShips,
  selectShipTypes,
  selectShipTypesNames,
  selectShipLevels,
};
