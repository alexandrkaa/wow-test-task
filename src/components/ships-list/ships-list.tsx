import { FC, useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import { Bars } from "react-loader-spinner";
import "./ships-list.scss";
import Ship from "../ship/ship";
import { selectShips, selectLang, selectNations, selectStatus } from "../../store/selectors";
import { TShipsStore } from "../../store/ships-slice";
import { TNationsStore } from "../../store/nation-slice";
import { useAppSelector } from "../../store/hooks";
import { StoreLoading } from "../../store/consts";
import { APP_ELEMENT_ID, ModalCustomStyles } from "../../consts/consts";
import { TShip, ShipsImgSizes } from "../../types/types";
import { getShipData } from "../../utils/utils";

const ShipsList: FC = () => {
  const [modalIsOpen, changeModal] = useState<boolean>(false);
  const [ship, setShip] = useState<TShip | null>(null);
  const ships = useAppSelector((state) => selectShips(state.ships));
  const shipsLoadingStatus = useAppSelector((state) => selectStatus<TShipsStore>(state.ships));
  const nationLoadingStatus = useAppSelector((state) => selectStatus<TNationsStore>(state.nations));
  const status = shipsLoadingStatus === StoreLoading.SUCCEED && nationLoadingStatus === StoreLoading.SUCCEED;
  const lang = useAppSelector((state) => selectLang(state.app));
  const nations = useAppSelector((state) => selectNations(state.nations));
  const _getShipData = useCallback(
    (ship: TShip, size: ShipsImgSizes) => {
      return getShipData(ship, lang, size, nations);
    },
    [lang, nations]
  );

  const closeModal = () => changeModal(false);
  const showShip = useCallback((ship: TShip) => {
    setShip(ship);
    changeModal(true);
  }, []);

  if (status && ships && nations) {
    return (
      <>
        <Modal
          appElement={document.getElementById(APP_ELEMENT_ID) as HTMLElement}
          isOpen={modalIsOpen}
          style={ModalCustomStyles}
          onRequestClose={closeModal}
        >
          <button className="cross-btn" onClick={closeModal}></button>
          {ship && <Ship ship={ship} size={ShipsImgSizes.large} getShipData={_getShipData} />}
        </Modal>
        <ul className="ships-list">
          {ships.map((ship) => {
            const _showShip = (evt: React.MouseEvent<HTMLElement>) => {
              evt.preventDefault();
              // console.log(ship.id);
              showShip(ship);
            };
            return (
              <li key={ship.id} className="ship-card">
                <Ship ship={ship} size={ShipsImgSizes.small} imgClick={_showShip} getShipData={_getShipData} />
              </li>
            );
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
      visible={!status}
    />
  );
};

export default ShipsList;
