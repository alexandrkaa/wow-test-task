export const ApiConfig = {
  BASE_API_URL: `https://vortex.worldofwarships.eu/api`,
  ERROR_CODES_TEST_URL: `https://httpstat.us`, //+ error code, https://httpstat.us/500
  API_REQUEST_TIMEOUT: 10000,
  API_RETRIES_COUNT: 5,
  API_RETRY_DELAY: 2000,
};

export const NetworkErrors = {
  UNAUTHORIZED: 401,
  UNAUTHORIZED_CUSTOM: 490,
  BAD_REQUEST: 400,
};
