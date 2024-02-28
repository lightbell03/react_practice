import { useMutation, useQuery } from "react-query";
import { AddMemberPayload, GetMemberPayload } from "../payload";
import { addMember, getMember, getMemberList } from "../api";
import { queryClient } from "../../utils";

export const useMemberQuery = (params: GetMemberPayload, enabled: boolean) => {
  const queryKey: [string, GetMemberPayload] = ["GET_MEMBER_QUERY_KEY", params];

  return useQuery({
    queryKey,
    queryFn: ({ queryKey: [_, payload] }) => getMember(payload),
    enabled,
    select: (res) => {
      return res.data;
    }
  });
}

export const useMemberListQuery = (enabled: boolean) => {
  const queryKey = ["GET_MEMBER_LIST_QUERY_KEY"];

  return useQuery({
    queryKey,
    queryFn: () => getMemberList(),
    enabled,
    select: (res) => {
      const result = res.data;
      console.log(result);
      return result;
    }
  });
}

export const useAddMemberQuery = () => {
  return useMutation({
    mutationFn: (queryPayload: AddMemberPayload) => addMember(queryPayload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["GET_MEMBER_LIST_QUERY_KEY"] });
    }
  })
}