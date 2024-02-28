import { GetMemberListResponse } from "../../http/response";
type Member = {
  id: number;
  name: string;
  age: number;
  email: string;
}
export const memberData: Member[] = [];