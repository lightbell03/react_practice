import { getHttp } from "..";
import { DummyPayload } from "../payload";
import { DummyResponse } from "../response";

const http = getHttp();

export const getDummy = (payload: DummyPayload) => {
    return http.get<DummyResponse>(`/dummy/${payload.dummyId}`);
}