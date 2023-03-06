import { FC } from "react";

type Props = {
  link: string;
  title: string;
};

const MenuItem: FC<Props> = (props) => {
  return (
    <li className="menu-list__item">
      <a className="menu-list__item-link" href={props.link}>
        {props.title}
      </a>
    </li>
  );
};

export default MenuItem;
