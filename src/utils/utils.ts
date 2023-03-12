import {
  TLangKeyCode,
  TShip,
  ShipsImgSizes,
  TShipData,
  TNations,
  TNationData,
  TShipTypes,
  TShipTypeData,
} from "../types/types";
import { TAppStore } from "../store/app-slice";
import { BASE_IMG_URL } from "../consts/consts";
export const getShipData = (
  ship: TShip,
  lang: TLangKeyCode,
  size: ShipsImgSizes,
  nations: TNations | null,
  types: TShipTypes | null
): TShipData => {
  let _nation: string | TNationData | undefined;
  _nation = ship.nation;
  if (nations) {
    if (ship.nation) {
      _nation = getNationData(ship.nation, nations, lang);
    }
  }
  let _shipType: string | TShipTypeData | undefined;
  if (Array.isArray(ship.tags)) {
    _shipType = ship.tags[0];
    if (types !== null) {
      _shipType = getShipTypesData(ship.tags[0], types, lang);
    }
  }

  return {
    img: `${BASE_IMG_URL}/${ship.icons[size]}`,
    shortMark: ship?.localization?.shortmark?.[lang],
    mark: ship.localization.mark[lang],
    nation: _nation,
    description: ship.localization.description[lang],
    tags: ship.tags,
    level: ship.level,
    type: _shipType,
  };
};

export const getNationData = (nationId: string, nations: TNations, lang: TLangKeyCode): TNationData => {
  const nation = nations[nationId];
  return {
    nationId,
    flagTiny: `${BASE_IMG_URL}/${nation?.icons?.tiny}`,
    flagSmall: `${BASE_IMG_URL}/${nation?.icons?.small}`,
    flagLarge: `${BASE_IMG_URL}/${nation?.icons?.large}`,
    nationTitle: nation?.localization?.mark?.[lang],
  };
};

export const getShipTypesData = (typeId: string, types: TShipTypes, lang: TLangKeyCode): TShipTypeData => {
  const type = types[typeId];
  return {
    title: type?.localization?.mark?.[lang],
    name: type?.name,
    sortOrder: type?.sort_order,
    icon: `${BASE_IMG_URL}/${type?.icons.normal}`,
  };
};

export const filterShips = (ships: TShip[], appData: TAppStore): TShip[] => {
  let result = structuredClone(ships);
  if (appData.curLevel > 0) {
    result = result.filter((it) => it.level === appData.curLevel);
  }
  if (appData.curNation !== ``) {
    result = result.filter((it) => it.nation?.toLowerCase() === appData.curNation.toLowerCase());
  }
  if (appData.curType !== ``) {
    result = result.filter((it) => it.tags[0].toLowerCase() === appData.curType.toLowerCase());
  }
  return result;
};
