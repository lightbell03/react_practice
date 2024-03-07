import { HttpClient } from "./httpClient";
import { jwtRequestInterceptor, jwtResponseInterceptor } from "./interceptor";

const httpClient = new HttpClient({
  baseURL: 'http://localhost:8080'
});

httpClient.addRequestInterceptor(jwtRequestInterceptor);
httpClient.addResponseInterceptor(jwtResponseInterceptor);

export const getHttp = () => httpClient.axiosInstance;