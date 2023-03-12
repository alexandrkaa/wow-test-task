import { FC, memo, useState } from "react";
import "./ship.scss";
import { TShip, TShipData, ShipsImgSizes, TNation, TNationData } from "../../types/types";
import Img from "../img/img";

type TProps = {
  ship: TShip;
  size: ShipsImgSizes;
  getShipData: (ship: TShip, size: ShipsImgSizes) => TShipData;
  imgClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

const Ship: FC<TProps> = ({ ship, size, getShipData, imgClick }) => {
  const [flagVisible, setFlagVisible] = useState<boolean>(false);
  const { img, shortMark, mark, nation, description, tags } = getShipData(ship, size);
  const name = shortMark || mark;
  const onMouseOver = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setFlagVisible(true);
  };

  const onMouseOut = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setFlagVisible(false);
  };

  const isFullNation = (nation: string | TNationData | undefined): nation is TNationData => {
    if (nation === undefined) {
      return false;
    }

    if (typeof nation === `string`) {
      return false;
    }

    return true;
  };

  const useFlag = size === `small` && flagVisible && isFullNation(nation);
  // const useFlag = true;

  return (
    <figure className={`ship ship--${size}`}>
      {img && (
        <>
          <Img
            imgClick={imgClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className="ship--img"
            src={img}
            alt={`${name} ship image`}
          />
          {useFlag && (
            <Img
              className="ship--img-nation"
              src={nation.flagLarge as string}
              width="214"
              alt={`Background image of ${nation?.nationTitle} flag at ${name} ship image`}
            />
          )}
        </>
      )}
      <figcaption>
        {name && <p>{name}</p>}
        {typeof nation === "string" && <p>{nation}</p>}
        {typeof nation !== "string" && (
          <p className="ship__nation">
            <span>{nation?.nationTitle}</span>
            {nation?.flagTiny && (
              <Img
                className="ship__nation-img"
                src={nation.flagTiny}
                alt={`Icon of ${nation?.nationTitle} flag`}
                width="35"
              />
            )}
          </p>
        )}
        {description && <p>{description}</p>}
      </figcaption>
    </figure>
  );
};

export default memo(Ship);
