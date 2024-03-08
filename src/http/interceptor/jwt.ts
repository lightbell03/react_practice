import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getHttp } from "..";
import { HTTP_STATUS_UNAUTHORIZATION, TOKEN_EXPIRE_CODE, } from "../../constants";
import { ApiErrorResponse, ApiResponse } from "../type";
import { getLocalStorage } from "../../utils/storage/localStorage";

const storage = getLocalStorage(); // localStorage
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

const request = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = storage.get(ACCESS_TOKEN_KEY);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

const requestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const retryRequestCount = {
  count: 0,

  increaseCount() {
    this.count++;
  },

  isOverMaxRetryCount() {
    return this.count > 2;
  }
}

console.log(retryRequestCount.count);

const response = (response: AxiosResponse): AxiosResponse<unknown, unknown> => {
  if (response.config.url === '/auth/token/refresh') {
    storage.set(ACCESS_TOKEN_KEY, response.data.accessToken);
    storage.set(REFRESH_TOKEN_KEY, response.data.refreshToken);
    retryRequestCount.count = 0;
  }

  return response;
}

const responseError = async (error: AxiosError<ApiErrorResponse>): Promise<AxiosResponse<ApiResponse<unknown>> | AxiosError<ApiErrorResponse, unknown>> => {
  const status = error.response?.status;
  const code = error.response?.data.code;

  if (status === HTTP_STATUS_UNAUTHORIZATION && error.config) {
    const http = getHttp();
    if (code === TOKEN_EXPIRE_CODE) {

      if (retryRequestCount.isOverMaxRetryCount()) {
        storage.remove(ACCESS_TOKEN_KEY);
        storage.remove(REFRESH_TOKEN_KEY);

        window.location.href = '/login';
      }

      retryRequestCount.increaseCount();

      await http.post("/auth/token/refresh", {
        refreshToken: storage.get(REFRESH_TOKEN_KEY),
      });

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

export const jwtRequestInterceptor = { request, requestError };
export const jwtResponseInterceptor = { response, responseError };