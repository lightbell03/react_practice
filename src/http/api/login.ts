import { getHttp } from "..";
import { LoginPayload, SignUpPayload } from "../payload";

const http = getHttp();

export const postSignUp = (data: SignUpPayload) => {
  return http.post<void>('/auth/sign-up', data);
}

export const postLogin = (data: LoginPayload) => {
  return http.post<void>('/auth/login', data);
}