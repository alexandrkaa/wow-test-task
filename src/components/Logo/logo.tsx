import { FC } from "react";
import "./logo.scss";

const MenuItem: FC = (props) => {
  return (
    <div className="logo">
      <a className="logo__link" href="/">
        <span className="visually-hidden">Главная страница</span>
      </a>
    </div>
  );
};

export default MenuItem;
