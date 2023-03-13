export type TStore = {
  loading: string;
};

export enum Langs {
  ru = "ru",
  fr = "fr",
  en = "en",
  nl = "nl",
  th = "th",
  pt_br = "pt br",
  zh_cn = "zh cn",
  ko = "ko",
  de = "de",
  tr = "tr",
  it = "it",
  zh_sg = "zh sg",
  uk = "uk",
  es = "es",
  cs = "cs",
  es_mx = "es mx",
  ja = "ja",
  pl = "pl",
  zh_tw = "zh tw",
}

export enum NationImgSizes {
  large = "large",
  default = "default",
  local_large = "local_large",
  local_tiny = "local_tiny",
  small = "small",
  local_small = "local_small",
  tiny = "tiny",
}

export type TNationImgSizes = {
  [key in keyof typeof NationImgSizes]?: string;
};

export type TNation = {
  name: string;
  icons: TNationImgSizes;
  color: number;
  tags: string[];
  localization: {
    mark: TLangLocalization;
  };
  id: number;
};

export type TNations = {
  [key: string]: TNation;
};

export type TNationData = {
  nationId: string;
  flagTiny?: string;
  flagSmall?: string;
  flagLarge?: string;
  nationTitle?: string;
};

export enum ShipsImgSizes {
  local_contour = "local_contour",
  contour_alive = "contour_alive",
  medium = "medium",
  default = "default",
  local_small = "local_small",
  contour_dead = "contour_dead",
  large = "large",
  local_contour_dead = "local_contour_dead",
  local_contour_alive = "local_contour_alive",
  small = "small",
  contour = "contour",
}

export type TLangKeyCode = keyof typeof Langs;
export type TLangValue = (typeof Langs)[TLangKeyCode];

export type TLang = keyof typeof Langs;
export type TLangLocalization = {
  [key in TLangKeyCode]?: string;
};

export type TShipImgSizes = {
  [key in keyof typeof ShipsImgSizes]?: string;
};

export type TShipData = {
  img?: string;
  shortMark?: string;
  mark?: string;
  nation?: string | TNationData;
  description?: string;
  tags?: string[];
  level?: number;
  type?: string | TShipTypeData;
};

export type TShip = {
  id?: string;
  level: number;
  name: string;
  icons: TShipImgSizes;
  tags: string[];
  localization: {
    shortmark: TLangLocalization;
    description: TLangLocalization;
    mark: TLangLocalization;
  };
  nation?: string;
};

export type TShips = TShip[];

export enum ShipTypesImg {
  default = "default",
  elite = "elite",
  premium = "premium",
  special = "special",
  normal = "normal",
}

export type TShipTypeImgSizes = {
  [key in keyof typeof ShipTypesImg]?: string;
};

export type TShipType = {
  icons: TShipTypeImgSizes;
  sort_order: number;
  localization: {
    shortmark?: TLangLocalization;
    mark?: TLangLocalization;
  };
  name: string;
};

export type TShipTypes = {
  [key: string]: TShipType;
};

export type TShipTypeData = {
  icon?: string;
  sortOrder?: number;
  title?: string;
  name?: string;
};

export const isFullNation = (nation: string | TNationData | undefined): nation is TNationData => {
  if (nation === undefined) return false;
  if (typeof nation === `string`) return false;
  return true;
};

export const isFullShipType = (type: string | TShipTypeData | undefined): type is TShipTypeData => {
  if (type === undefined) return false;
  if (typeof type === `string`) return false;
  return true;
};

export type TWindowSize = {
  width: number | undefined;
  height: number | undefined;
};
