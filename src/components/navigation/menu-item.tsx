import { FC, ReactNode, memo } from "react";

type Props = {
  children: ReactNode;
};

const MenuItem: FC<Props> = (props) => {
  return <li className="menu-list__item">{props.children}</li>;
};

export default memo(MenuItem);
