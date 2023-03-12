import createAPI from "./create-api";
import { TNation } from "../types/types";

const api = createAPI();

export type TResponse = {
  status: string;
  data: TNation[];
};

export class nationsAPI {
  static async getNations(): Promise<unknown> {
    return api.get<TResponse>(`/encyclopedia/en/nations/`).then((response) => {
      return response.data;
    });
  }
}
