import { AxiosError, AxiosPromise, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getHttp } from "..";
import { HTTP_STATUS_UNAUTHORIZATION, TOKEN_EXPIRE_CODE, } from "../../constants";
import { ApiErrorResponse, ApiResponse } from "../type";
import { getLocalStorage } from "../../utils/storage/localStorage";
import { TokenResponse } from "../response/token";

const storage = getLocalStorage();

const request = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = "token";

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

const requestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

let requestCount = 0;

const response = (response: AxiosResponse<ApiResponse<TokenResponse>>) => {

  if (response.config.url === "/token/refresh") {
    storage.set(ACCESS_TOKEN_KEY, response.data.data.accessToken);
    storage.set(REFRESH_TOKEN_KEY, response.data.data.refreshToken);
    requestCount = 0;
  }
}

const responseError = async (error: AxiosError<ApiErrorResponse>): Promise<AxiosResponse<ApiResponse<unknown>> | AxiosError<ApiErrorResponse, unknown>> => {
  const status = error.response?.status;
  const code = error.response?.data.code;

  if (status === HTTP_STATUS_UNAUTHORIZATION && error.config) {
    const http = getHttp();
    if (code === TOKEN_EXPIRE_CODE) {
      requestCount++;
      await http.post("/token/refresh");
      if (requestCount > 4) {
        alert("refresh token request over 4 times");
        return Promise.reject(error);
      }

      try {
        const res = await http.request(error.config);

        Promise.resolve(res);
      } catch (e) {
        Promise.reject(error);
      }
    }
    else {
      Promise.reject(error);
    }
  }
  return Promise.reject(error);
}

export const jwtInterceptor = { request, requestError, response, responseError };