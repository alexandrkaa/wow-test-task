import { FC, useState, useCallback } from "react";
import Menu from "./menu";
import "./menu.scss";
import Button from "../button/button";

const Navigation: FC = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const switchMenu = (): void => {
    setIsMenu((state) => !state);
  };
  const hideMenu = useCallback((cb: () => void): void => {
    setIsMenu(false);
  }, []);
  return (
    <nav className={`main-header__navigation menu ${!isMenu ? `menu--hidden` : `menu`}`}>
      <Menu hideMenu={hideMenu} />
      <Button onClick={switchMenu} className="menu__burger" title="" />
    </nav>
  );
};

export default Navigation;
