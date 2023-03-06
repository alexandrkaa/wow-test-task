import axios, { AxiosInstance } from "axios";
// https://github.com/axios/axios/blob/7d6bddba2d8de29c263feaef4c40daa50cb4b176/index.d.ts#L146
import { ApiConfig } from "../consts/consts";

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConfig.BASE_API_URL,
    timeout: ApiConfig.API_REQUEST_TIMEOUT,
  });

  return api;
};

export default createAPI;
