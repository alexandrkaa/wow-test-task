import createAPI from "./create-api";
import { TShip, TShipTypes } from "../types/types";

const api = createAPI();

export type TShipsResponse = {
  status: string;
  data: {
    [key: number]: TShip;
  };
};

export type TShipTypesResponse = {
  status: string;
  data: TShipTypes;
};

export class shipsAPI {
  static async getShips(): Promise<unknown> {
    return api.get<TShipsResponse>(`/encyclopedia/en/vehicles/`).then((response) => {
      return response.data;
    });
  }

  static async getShipTypes(): Promise<unknown> {
    return api.get<TShipTypesResponse>(`/encyclopedia/en/vehicle_types_common/`).then((response) => {
      return response.data;
    });
  }
}
