import { FC, ReactNode, memo } from "react";
import "./main-header.scss";

type Props = {
  children: ReactNode;
};

const Header: FC<Props> = (props) => {
  return (
    <header className="main-header">
      <div className="main-header__childs-wrapper">{props.children}</div>
    </header>
  );
};

export default memo(Header);
