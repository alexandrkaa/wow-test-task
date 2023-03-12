import { FC, memo, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./ship.scss";
import { TShip, TShipData, ShipsImgSizes, isFullNation, isFullShipType } from "../../types/types";
import Img from "../img/img";

type TProps = {
  ship: TShip;
  size: ShipsImgSizes;
  getShipData: (ship: TShip, size: ShipsImgSizes) => TShipData;
  imgClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

const Ship: FC<TProps> = ({ ship, size, getShipData, imgClick }) => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [flagVisible, setFlagVisible] = useState<boolean>(false);
  const { img, shortMark, mark, nation, description, tags, level, type } = getShipData(ship, size);
  const name = shortMark || mark;
  const onMouseOver = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setFlagVisible(true);
  };

  const onMouseOut = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setFlagVisible(false);
  };

  const useFlag = size === `small` && flagVisible && isFullNation(nation);
  let shipType: string | undefined, shipTypeIcon: string | undefined;
  if (isFullShipType(type)) {
    shipType = type.title;
    shipTypeIcon = type.icon;
  } else {
    if (Array.isArray(tags)) {
      shipType = tags[0];
    }
  }

  return (
    <figure ref={ref} className={`ship ship--${size}`}>
      {inView && img && (
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
        {name && (
          <p className="ship__name">
            {shipTypeIcon && <Img src={shipTypeIcon} alt={`Icon of ${name} ship type`} />}
            {name} / {shipType} / {level}
          </p>
        )}
        {typeof nation === "string" && <p>{nation}</p>}
        {typeof nation !== "string" && (
          <p className="ship__nation ship-nation">
            <span>{nation?.nationTitle}</span>
            {inView && nation?.flagTiny && (
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
