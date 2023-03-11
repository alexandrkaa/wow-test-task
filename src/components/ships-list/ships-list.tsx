import { FC, useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import { Bars } from "react-loader-spinner";
import "./ships-list.scss";
import ShipCard from "../ship-card/ship-card";
import Ship from "../ship/ship";
import { fetchShips, selectShips, selectStatus } from "../../store/ships-slice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { StoreLoading } from "../../store/consts";
import { APP_ELEMENT_ID } from "../../consts/consts";
import { TShip } from "../../types/types";

const ShipsList: FC = () => {
  const [modalIsOpen, changeModal] = useState<boolean>(false);
  const [ship, setShip] = useState<TShip | null>(null);
  const dispatch = useAppDispatch();
  const ships = useAppSelector((state) => selectShips(state.ships));
  const status = useAppSelector((state) => selectStatus(state.ships));

  useEffect(() => {
    const promise = dispatch(fetchShips());
    return () => {
      promise.abort();
    };
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeModal = () => changeModal(false);
  const showShip = useCallback((ship: TShip) => {
    setShip(ship);
    changeModal(true);
  }, []);

  if (ships) {
    return (
      <>
        <Modal
          appElement={document.getElementById(APP_ELEMENT_ID) as HTMLElement}
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
        >
          <button className="cross-btn" onClick={closeModal}></button>
          {ship && (
            <Ship
              name={decodeURI(ship.localization?.shortmark?.ru)}
              img={ship.icons.large}
              nation={ship.nation}
              description={decodeURI(ship.localization.description.ru)}
            />
          )}
        </Modal>
        <ul className="ships-list">
          {ships.map((ship) => {
            const _showShip = () => showShip(ship);
            return <ShipCard key={ship.id} ship={ship} showShip={_showShip} />;
          })}
        </ul>
      </>
    );
  }
  return (
    <Bars
      height="80"
      width="80"
      color="#ffffff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={status !== StoreLoading.SUCCEED || !ships}
    />
  );
};

export default ShipsList;
