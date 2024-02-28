import { HttpClient } from "./httpClient";
import { jwtInterceptor } from "./interceptor";

const httpClient = new HttpClient({
  baseURL: 'http://localhost:8080'
});

httpClient.addRequestInterceptor(jwtInterceptor);

export const getHttp = () => httpClient.axiosInstance;