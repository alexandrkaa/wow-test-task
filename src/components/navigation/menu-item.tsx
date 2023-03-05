import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  link: Location;
  title: String;
};

const MenuItem: FC<Props> = (props) => {
  return (
    <li>
      <Link to={props.link}>{props.title}</Link>
    </li>
  );
};

export default MenuItem;
