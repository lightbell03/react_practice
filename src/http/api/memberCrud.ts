import { AxiosResponse } from 'axios';
import { getHttp } from '../index';
import { AddMemberPayload, GetMemberPayload } from '../payload';
import { GetMemberListResponse, GetMemberResponse } from '../response';

const http = getHttp();

export const getMember = (params: GetMemberPayload): Promise<AxiosResponse<GetMemberResponse>> => {
  return http.get<GetMemberResponse>(`/member/${params.id}`);
}

export const addMember = (data: AddMemberPayload): Promise<null> => {
  return http.post("/member", data);
}

export const getMemberList = () => {
  return http.get<GetMemberListResponse>("/member");
}