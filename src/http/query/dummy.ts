import { useQuery } from "react-query";
import { DummyPayload } from "../payload";
import { getDummy } from "../api";

export const useQueryGetDummy = (payload: DummyPayload) => {
  const queryKey: [string, DummyPayload] = ["GET_DUMMY", payload];

  return useQuery({
    queryKey,
    queryFn: ({ queryKey: [_, payload] }) => getDummy(payload),
  });
}