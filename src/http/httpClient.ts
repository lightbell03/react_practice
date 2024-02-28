import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

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
}