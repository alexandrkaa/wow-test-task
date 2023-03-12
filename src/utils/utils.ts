import { TLangKeyCode, TShip, ShipsImgSizes, TShipData } from "../types/types";
import { BASE_IMG_URL } from "../consts/consts";
export const getShipData = (ship: TShip, lang: TLangKeyCode, size: ShipsImgSizes): TShipData => {
  return {
    img: `${BASE_IMG_URL}/${ship.icons[size]}`,
    shortMark: ship?.localization?.shortmark?.[lang],
    mark: ship.localization.mark[lang],
    nation: ship.nation,
    description: ship.localization.description[lang],
  };
};
