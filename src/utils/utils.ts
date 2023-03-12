import { TLangKeyCode, TShip, ShipsImgSizes, TShipData, TNations, TNationData } from "../types/types";
import { BASE_IMG_URL } from "../consts/consts";
export const getShipData = (
  ship: TShip,
  lang: TLangKeyCode,
  size: ShipsImgSizes,
  nations: TNations | null
): TShipData => {
  let _nation: string | TNationData | undefined;
  _nation = ship.nation;
  if (nations) {
    if (ship.nation) {
      _nation = getNationData(ship.nation, nations, lang);
    }
  }
  return {
    img: `${BASE_IMG_URL}/${ship.icons[size]}`,
    shortMark: ship?.localization?.shortmark?.[lang],
    mark: ship.localization.mark[lang],
    nation: _nation,
    description: ship.localization.description[lang],
    tags: ship.tags,
  };
};

export const getNationData = (nationId: string, nations: TNations, lang: TLangKeyCode): TNationData => {
  const nation = nations[nationId];
  return {
    flagTiny: `${BASE_IMG_URL}/${nation?.icons?.tiny}`,
    flagSmall: `${BASE_IMG_URL}/${nation?.icons?.small}`,
    flagLarge: `${BASE_IMG_URL}/${nation?.icons?.large}`,
    nationTitle: nation?.localization?.mark?.[lang],
  };
};
