import createAPI from "./create-api";
const api = createAPI();
import { AxiosResponse } from "axios";

import { TShip } from "../types/types";

export type TResponse = {
  status: string;
  data: {
    [key: number]: TShip;
  };
};

export class shipsAPI {
  static async getShips(): Promise<unknown> {
    return api.get<TResponse>(`/encyclopedia/en/vehicles/`).then((response) => {
      return response.data;
    });
  }
}
