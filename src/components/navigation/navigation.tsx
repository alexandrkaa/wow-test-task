import { FC } from "react";
import Menu from "./menu";
import "./menu.scss";
import Button from "../button/button";

const Navigation: FC = () => {
  return (
    <nav className="main-header__navigation menu">
      <Menu />
      <Button className="menu__burger" title="menu" />
    </nav>
  );
};

export default Navigation;
