import { FC } from "react";
import "./ships-view.scss";
import ShipsList from "../ships-list/ships-list";

const ShipsContainer: FC = () => {
  return (
    <main className="ships">
      <ShipsList />
    </main>
  );
};

export default ShipsContainer;
