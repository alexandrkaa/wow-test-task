import { FC } from "react";
import Menu from "./menu";
import "./menu.scss";

const Navigation: FC = () => {
  return (
    <nav className="main-header__navigation menu">
      <Menu />
    </nav>
  );
};

export default Navigation;
