import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiErrorResponse } from "./type";

export class HttpClient {
  public axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  public addRequestInterceptor({
    request,
    requestError
  }: {
    request: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
    requestError: (error: AxiosError) => Promise<unknown>
  }) {
    this.axiosInstance.interceptors.request.use(request, requestError);
  }

  public removeRequestInterceptor(id: number) {
    this.axiosInstance.interceptors.request.eject(id);
  }

  public addResponseInterceptor({
    response,
    responseError
  }: {
    response: (response: AxiosResponse) => AxiosResponse<unknown, unknown>,
    responseError: (error: AxiosError<ApiErrorResponse>) => Promise<unknown>
  }) {
    this.axiosInstance.interceptors.response.use(response, responseError);
  }

  public removeResponseInterceptor(id: number) {
    this.axiosInstance.interceptors.response.eject(id);
  }
}