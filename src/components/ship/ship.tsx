import { FC } from "react";
import "./ship.scss";
import { TShip, TShipData, ShipsImgSizes } from "../../types/types";

type TProps = {
  ship: TShip;
  size: ShipsImgSizes;
  getShipData: (ship: TShip, size: ShipsImgSizes) => TShipData;
};

const Ship: FC<TProps> = ({ ship, size, getShipData }) => {
  const { img, shortMark, mark, nation, description } = getShipData(ship, size);
  const name = shortMark || mark;
  return (
    <figure className={`ship ship--${size}`}>
      {img && <img src={img} alt={`Миниатюрное изображение корабля ${name}`} loading="lazy" />}
      <figcaption>
        {name && <p>{name}</p>}
        {typeof nation === "string" && <p>{nation}</p>}
        {description && <p>{description}</p>}
      </figcaption>
    </figure>
  );
};

export default Ship;
