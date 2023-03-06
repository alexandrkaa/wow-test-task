import { FC } from "react";
import MenuItem from "./menu-item";

const MenuList: FC = () => {
  return (
    <ul className="menu-list">
      <MenuItem title="Перейти на официальный сайт" link="https://worldofwarships.eu/ru" />
    </ul>
  );
};

export default MenuList;
