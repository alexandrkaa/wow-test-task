import { FC, useState } from "react";
import MenuItem from "./menu-item";
import { Langs } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectLang, setLang } from "../../store/app-slice";
import Button from "../button/button";

const MenuList: FC = () => {
  const curLang = useAppSelector((state) => selectLang(state.app));
  const [secondMenuVisible, setSecondMenuVisible] = useState(false);
  const dispatch = useAppDispatch();
  const setLanguage = (lang: keyof typeof Langs) => {
    dispatch(setLang(lang));
    setSecondMenuVisible(false);
  };
  return (
    <>
      <ul key="menu" className="menu-list">
        <MenuItem>
          <a className="menu-list__item-link" href="https://worldofwarships.eu">
            Перейти на официальный сайт
          </a>
        </MenuItem>
        <MenuItem>
          <button onClick={() => setSecondMenuVisible(true)} className="link menu-list__item-link">
            {Langs[curLang]}
          </button>
        </MenuItem>
      </ul>
      <ul key="langs" className={`menu-list ${!secondMenuVisible ? `visually-hidden` : ``}`}>
        {secondMenuVisible &&
          Object.keys(Langs).map((lKey) => {
            const lang = Langs[lKey as keyof typeof Langs];
            return (
              <MenuItem key={lKey}>
                <Button
                  onClick={() => setLanguage(lKey as keyof typeof Langs)}
                  className="link menu-list__item-link menu-list__item-link--lang"
                  title={lang}
                />
              </MenuItem>
            );
          })}
      </ul>
    </>
  );
};

export default MenuList;
