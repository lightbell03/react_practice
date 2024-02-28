import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getHttp } from "..";

const http = getHttp();

const request = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = "token";

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

const requestError = (error: AxiosError): Promise<AxiosError> => {

  // TODO 토큰 재발행
  http.post("");
  return Promise.reject();
}

export const jwtInterceptor = { request, requestError };