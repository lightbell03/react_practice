import { getHttp } from "..";
import { LoginPayload, SignUpPayload } from "../payload";
import { TokenResponse } from "../response/token";

const http = getHttp();

export const postSignUp = (data: SignUpPayload) => {
  return http.post<void>('/users/sign-up', data);
}

export const postLogin = (data: LoginPayload) => {
  return http.post<TokenResponse>('/auth/login', data);
}