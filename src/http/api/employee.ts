import { getHttp } from "..";

const http = getHttp();

export const getEmployees = () => {
  return http.get("/employees?page=0&size=10");
}