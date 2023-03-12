import { FC, useState, useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import { Bars } from "react-loader-spinner";
import "./ships-list.scss";
import Ship from "../ship/ship";
import { selectShips, selectLang, selectNations, selectStatus, selectShipTypes } from "../../store/selectors";
import { TShipsStore } from "../../store/ships-slice";
import { TNationsStore } from "../../store/nation-slice";
import { useAppSelector } from "../../store/hooks";
import { StoreLoading } from "../../store/consts";
import { APP_ELEMENT_ID, ModalCustomStyles } from "../../consts/consts";
import { TShip, ShipsImgSizes } from "../../types/types";
import { getShipData, filterShips } from "../../utils/utils";
import { TShipTypesStore } from "../../store/types-slice";
import { PAGINATOR_ITEMS_PER_PAGE } from "../../consts/consts";

const ShipsList: FC = () => {
  //////
  const [itemOffset, setItemOffset] = useState(0);
  //////
  // get data
  const ships = useAppSelector((state) => selectShips(state.ships));
  const nations = useAppSelector((state) => selectNations(state.nations));
  const lang = useAppSelector((state) => selectLang(state.app));
  const shipTypes = useAppSelector((state) => selectShipTypes(state.shipTypes));
  const appData = useAppSelector((state) => state.app);

  // get states
  const shipsLoadingStatus = useAppSelector((state) => selectStatus<TShipsStore>(state.ships));
  const nationLoadingStatus = useAppSelector((state) => selectStatus<TNationsStore>(state.nations));
  const typesLoadingStatus = useAppSelector((state) => selectStatus<TShipTypesStore>(state.shipTypes));
  const status =
    shipsLoadingStatus === StoreLoading.SUCCEED &&
    nationLoadingStatus === StoreLoading.SUCCEED &&
    typesLoadingStatus === StoreLoading.SUCCEED;

  const [modalIsOpen, changeModal] = useState<boolean>(false);
  const [ship, setShip] = useState<TShip | null>(null);

  useEffect(() => {
    setItemOffset(0);
  }, [appData.curLevel, appData.curNation, appData.curType]);

  let _renderShips: TShip[] = [];

  const _getShipData = useCallback(
    (ship: TShip, size: ShipsImgSizes) => {
      return getShipData(ship, lang, size, nations, shipTypes);
    },
    [lang, nations]
  );

  const closeModal = () => changeModal(false);
  const showShip = useCallback((ship: TShip) => {
    setShip(ship);
    changeModal(true);
  }, []);

  if (status && ships && nations && shipTypes) {
    _renderShips = filterShips(ships, appData);

    const endOffset = itemOffset + PAGINATOR_ITEMS_PER_PAGE;
    const currentItems = _renderShips.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(_renderShips.length / PAGINATOR_ITEMS_PER_PAGE);

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * PAGINATOR_ITEMS_PER_PAGE) % _renderShips.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

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
          {currentItems.map((ship) => {
            const _showShip = (evt: React.MouseEvent<HTMLElement>) => {
              evt.preventDefault();
              showShip(ship);
            };
            return (
              <li key={ship.id} className="ship-card">
                <Ship ship={ship} size={ShipsImgSizes.small} imgClick={_showShip} getShipData={_getShipData} />
              </li>
            );
          })}
        </ul>
        <section className="paginator">
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >> "
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel=" <<"
          />
        </section>
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
