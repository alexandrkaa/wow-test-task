import { FC, useState, memo } from "react";
import MenuItem from "./menu-item";
import { Langs, TNationData, TShipTypeData, TShipTypes } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Button from "../button/button";
import { SecondMenuTypes } from "../../consts/consts";
import { setLang, setLevel, setNation, setType, resetAll } from "../../store/app-slice";
import { selectShipTypes, selectShipLevels, selectNations } from "../../store/selectors";
import { getShipTypesData, getNationData } from "../../utils/utils";
import Img from "../img/img";

const getLangsMenu = (setLanguage: (lang: keyof typeof Langs) => void) => {
  return Object.keys(Langs).map((lKey) => {
    const lang = Langs[lKey as keyof typeof Langs] as string;
    return (
      <MenuItem key={lKey}>
        <Button
          onClick={() => setLanguage(lKey as keyof typeof Langs)}
          className="link menu-list__item-link menu-list__item-link--lang"
          title={lang}
        />
      </MenuItem>
    );
  });
};

const getTypesMenu = (types: TShipTypeData[], setType: (type: string) => void) => {
  return types.map((it) => (
    <MenuItem key={it.name}>
      <Img src={it.icon as string} alt={`Select ship type menu item icon - ${it.title}`} />
      <Button
        onClick={() => setType(it.name as string)}
        className="link menu-list__item-link"
        title={it.title as string}
      />
    </MenuItem>
  ));
};

const getLvlsMenu = (lvls: number[], setLevel: (lvl: number) => void) => {
  return lvls.map((it) => (
    <MenuItem key={`lvl-${it}`}>
      <Button onClick={() => setLevel(it)} className="link menu-list__item-link" title={it.toString()} />
    </MenuItem>
  ));
};

const getNations = (nations: TNationData[], setNation: (nation: string) => void) => {
  return nations.map((it) => (
    <MenuItem key={`nation-${it.nationId}`}>
      <p className="ship-nation">
        <Button
          onClick={() => setNation(it.nationId)}
          className="link menu-list__item-link"
          title={it.nationTitle as string}
        />
        {it?.flagTiny && (
          <Img className="nation-img-small" src={it.flagTiny} alt={`Icon of ${it?.nationTitle} flag`} width="35" />
        )}
      </p>
    </MenuItem>
  ));
};

type TProps = {
  hideMenu: (cb: () => void) => void;
};

const MenuList: FC<TProps> = (props) => {
  console.count(`render`);
  const appData = useAppSelector((state) => state.app);
  const curLang = appData.lang;

  const types = useAppSelector((state) => selectShipTypes(state.shipTypes));
  let mappedTypes: TShipTypeData[] = [];
  if (types !== null) {
    mappedTypes = Object.keys(types).map((it) => getShipTypesData(it, types, curLang));
  }
  const lvls = useAppSelector((state) => selectShipLevels(state.ships));
  const nations = useAppSelector((state) => selectNations(state.nations));
  let mappedNations: TNationData[] = [];
  if (nations !== null) {
    mappedNations = Object.keys(nations).map((it) => getNationData(it, nations, curLang));
  }
  const [secondMenuVisible, setSecondMenuVisible] = useState<boolean>(false);
  const [secondMenuType, setSecondMenuType] = useState<string>(SecondMenuTypes.lang);
  const dispatch = useAppDispatch();

  const _hideMenu = (): void => {
    props.hideMenu(() => setSecondMenuVisible(false));
  };

  const _setLang = (lang: keyof typeof Langs): void => {
    dispatch(setLang(lang));
    _hideMenu();
  };
  const _setLevel = (lvl: number): void => {
    dispatch(setLevel(lvl));
    _hideMenu();
  };
  const _setNation = (nation: string): void => {
    dispatch(setNation(nation));
    _hideMenu();
  };
  const _setType = (type: string): void => {
    dispatch(setType(type));
    _hideMenu();
  };
  const _resetFilters = (): void => {
    dispatch(resetAll());
    _hideMenu();
  };
  const switchMenu = (type: string) => {
    setSecondMenuVisible((state) => {
      if (type === secondMenuType) {
        // props.hideMenu();
        return !state;
      }
      return true;
    });
    setSecondMenuType(type);
  };

  return (
    <>
      <ul key="menu" className="menu__menu-list menu-list">
        {/* <MenuItem>
          <a className="menu-list__item-link" href="https://worldofwarships.eu">
            Official website
          </a>
        </MenuItem> */}
        <MenuItem>
          <Button
            onClick={() => switchMenu(SecondMenuTypes.lang)}
            className="link menu-list__item-link"
            title={Langs[curLang]}
          />
        </MenuItem>
        <MenuItem>
          <Button onClick={() => switchMenu(SecondMenuTypes.lvl)} className="link menu-list__item-link" title="LVL" />
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => switchMenu(SecondMenuTypes.types)}
            className="link menu-list__item-link"
            title="Ship type"
          />
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => switchMenu(SecondMenuTypes.nation)}
            className="link menu-list__item-link"
            title="Nation"
          />
        </MenuItem>
        <MenuItem>
          <Button onClick={_resetFilters} className="link menu-list__item-link" title="Reset filters" />
        </MenuItem>
      </ul>
      <ul key="langs" className={`menu__menu-list menu-list ${!secondMenuVisible ? `visually-hidden` : ``}`}>
        {secondMenuVisible && secondMenuType === SecondMenuTypes.lang && getLangsMenu(_setLang)}
        {secondMenuVisible && secondMenuType === SecondMenuTypes.lvl && getLvlsMenu(lvls, _setLevel)}
        {secondMenuVisible && secondMenuType === SecondMenuTypes.types && getTypesMenu(mappedTypes, _setType)}
        {secondMenuVisible && secondMenuType === SecondMenuTypes.nation && getNations(mappedNations, _setNation)}
      </ul>
    </>
  );
};

export default memo(MenuList);
