import { FC, Dispatch, SetStateAction } from "react";
import { TShip } from "../../types/types";
import "./ship-card.scss";
import Ship from "../ship/ship";

type TProps = {
  ship: TShip;
  showShip: () => void;
};

const ShipCard: FC<TProps> = ({ ship: { name, icons, localization, tags, nation }, showShip }) => {
  const decodedName = decodeURI(localization?.shortmark?.ru);
  if (!decodedName || !icons.small) {
    return null;
  }
  return (
    <li className="ship-card" onClick={showShip}>
      <Ship name={decodedName} img={icons.small} nation={nation} />
    </li>
  );
};

export default ShipCard;
