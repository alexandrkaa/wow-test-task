import createAPI from "./create-api";
import { TShip } from "../types/types";

const api = createAPI();

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
