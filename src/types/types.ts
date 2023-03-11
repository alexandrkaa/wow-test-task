export enum Langs {
  ru = "ru",
  fr = "fr",
  en = "en",
  nl = "nl",
  th = "th",
  pt_br = "pt_br",
  zh_cn = "zh_cn",
  ko = "ko",
  de = "de",
  tr = "tr",
  it = "it",
  zh_sg = "zh_sg",
  uk = "uk",
  es = "es",
  cs = "cs",
  es_mx = "es_mx",
  ja = "ja",
  pl = "pl",
  zh_tw = "zh_tw",
}
export type TLang = keyof typeof Langs;
export type TLangLocalization = {
  [key in Langs]: string;
};

export type TShip = {
  id?: string;
  level: number;
  name: string;
  icons: {
    local_contour?: string;
    contour_alive?: string;
    medium?: string;
    default?: string;
    local_small?: string;
    contour_dead?: string;
    large?: string;
    local_contour_dead?: string;
    local_contour_alive?: string;
    small?: string;
    contour?: string;
  };
  tags: string[];
  localization: {
    shortmark: TLangLocalization;
    description: TLangLocalization;
    mark: TLangLocalization;
  };
  nation?: string;
};

export type TShips = TShip[];
