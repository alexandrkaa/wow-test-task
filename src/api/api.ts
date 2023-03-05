import axios, { AxiosResponse, AxiosError } from "axios";
// https://github.com/axios/axios/blob/7d6bddba2d8de29c263feaef4c40daa50cb4b176/index.d.ts#L146
import { ApiConfig, NetworkErrors } from "../consts/consts";

const createAPI = (dispatchUnAuthorized = () => {}) => {
  const api = axios.create({
    baseURL: ApiConfig.BASE_API_URL,
    timeout: ApiConfig.API_REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse) => {
    if (response.status === 490) {
      dispatchUnAuthorized();
    }
    return response;
  };

  const onFail = (err: AxiosError) => {
    if (
      err?.response &&
      (err?.response?.status === NetworkErrors.UNAUTHORIZED ||
        err?.response?.status === NetworkErrors.UNAUTHORIZED_CUSTOM)
    ) {
      dispatchUnAuthorized();
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
