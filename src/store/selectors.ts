import { TStore } from "../types/types";
// nation
import { selectNations } from "./nation-slice";
import { selectNation } from "./nation-slice";
// app
import { selectLang } from "./app-slice";
import { selectCurNation } from "./app-slice";
// ships
import { selectShips } from "./ships-slice";
const selectStatus = <T extends TStore>(state: T): string => {
  return state.loading;
};

export { selectStatus, selectNations, selectNation, selectLang, selectCurNation, selectShips };
