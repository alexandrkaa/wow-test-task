import { FC } from "react";
import MenuItem from "./menu-item";
import { Langs } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const MenuList: FC = () => {
  return (
    <ul className="menu-list">
      <MenuItem title="Перейти на официальный сайт" link="https://worldofwarships.eu" />
    </ul>
  );
};

export default MenuList;
