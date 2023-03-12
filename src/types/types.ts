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
  icons: NationImgSizes;
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
  img: string;
  shortMark: string | undefined;
  mark: string | undefined;
  nation: string | undefined | TNation;
  description: string | undefined;
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
