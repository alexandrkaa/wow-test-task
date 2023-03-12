import { FC, memo } from "react";
import { Langs } from "../../types/types";

type Props = {
  className: string;
  title: Langs | string;
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

const Button: FC<Props> = (props) => {
  const { className, title, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default memo(Button);
